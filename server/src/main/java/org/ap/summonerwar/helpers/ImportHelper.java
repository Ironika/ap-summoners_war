package org.ap.summonerwar.helpers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;

import org.ap.common.TimeHelper;
import org.ap.summonerwar.bean.ImportBean;
import org.ap.summonerwar.storage.ApauthCollection;
import org.ap.summonerwar.storage.ApauthData;
import org.ap.summonerwar.storage.MonsterCollection;
import org.ap.summonerwar.storage.MonsterData;
import org.ap.summonerwar.storage.RuneCollection;
import org.ap.summonerwar.storage.RuneData;
import org.ap.summonerwar.storage.UserCollection;
import org.ap.summonerwar.storage.UserData;
import org.ap.web.internal.APWebException;
import org.ap.web.internal.UUIDGenerator;
import org.bson.Document;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

public class ImportHelper {

	public static Object postImport(SecurityContext sc, ImportBean importBean) throws APWebException {
//		throw new APWebException("500", Status.INTERNAL_SERVER_ERROR);
		
		try {
			ApauthData dataAuth = ApauthCollection.getByUsername(sc.getUserPrincipal().getName());
			UserData user = UserCollection.getById(dataAuth.getEntityId());
			
			if (!user.getId().equals(importBean.userId)) {
				throw new APWebException("SM_IMPORT_FORBIDDEN", Status.FORBIDDEN);
			}
			
			JSONObject json = new JSONObject(importBean.data);
			JSONArray monsterJsson = json.getJSONArray("mons"); 
			
			Document doc = new Document().append("userId", user.getId());
			List<MonsterData> oldMonsters = MonsterCollection.get(doc);
			List<RuneData> oldRunes = RuneCollection.get(doc);
			
			Map<Integer, MonsterData> monsterIds = new HashMap<Integer, MonsterData>();
			for (int i = 0; i < monsterJsson.length(); i++) {
				JSONObject obj = monsterJsson.getJSONObject(i);
				
				doc = new Document().append("unitId", obj.getLong("unit_id"));
				List<MonsterData> currentMonsters = MonsterCollection.get(doc);
				MonsterData monster = null;
				if (currentMonsters.size() > 0) {
					monster = currentMonsters.get(0);
				} else {
					monster = new MonsterData();
					monster.setId(UUIDGenerator.nextId());
				}
				monster.setUserId(importBean.userId);
				monster.setName(obj.getString("name"));
				monster.setElemType(obj.getString("attribute"));
				monster.setStar(obj.getInt("stars"));
				monster.setLvl(obj.getInt("level"));
				monster.setHp(obj.getInt("b_hp"));
				monster.setAtk(obj.getInt("b_atk"));
				monster.setDef(obj.getInt("b_def"));
				monster.setSpd(obj.getInt("b_spd"));
				monster.setCrate(obj.getInt("b_crate"));
				monster.setCdmg(obj.getInt("b_cdmg"));
				monster.setRes(obj.getInt("b_res"));
				monster.setAcc(obj.getInt("b_acc"));
				monster.setUnitId(obj.getLong("unit_id"));
				
				monsterIds.put(obj.getInt("id"), monster);
				
				if (currentMonsters.size() > 0)
					MonsterCollection.update(monster);
				else
					MonsterCollection.create(monster);
				
				for (MonsterData oldMonster : oldMonsters) {
					if (monster.getUnitId().equals(oldMonster.getUnitId())) {
						oldMonsters.remove(oldMonster);
						break;
					}
				}
			}
			for (MonsterData oldMonster : oldMonsters)
				MonsterCollection.delete(oldMonster);
			
			
			JSONArray runesJson = json.getJSONArray("runes");
			for (int i = 0; i < runesJson.length(); i++) {
				JSONObject obj = runesJson.getJSONObject(i);
				
				doc = new Document().append("uniqueId", obj.getLong("unique_id"));
				List<RuneData> currentRunes = RuneCollection.get(doc);
				RuneData rune = null;
				if (currentRunes.size() > 0) {
					rune = currentRunes.get(0);
				} else {
					rune = new RuneData();
					rune.setId(UUIDGenerator.nextId());
				}
				rune.setUniqueId(obj.getLong("unique_id"));
				rune.setUserId(importBean.userId);
				rune.setSet(obj.getString("set"));
				rune.setStar(obj.getInt("grade"));
				rune.setLvl(obj.getInt("level"));
				rune.setPos(String.valueOf(obj.getInt("slot")));
				int monster = obj.getInt("monster");
				if (monster != 0) {
					rune.monsterId = monsterIds.get(monster).id;
				}				
				ImportHelper.buildStat(obj, "m", rune);
				ImportHelper.buildStat(obj, "i", rune);
				ImportHelper.buildStat(obj, "s1", rune);
				ImportHelper.buildStat(obj, "s2", rune);
				ImportHelper.buildStat(obj, "s3", rune);
				ImportHelper.buildStat(obj, "s4", rune);
				
				if (currentRunes.size() > 0)
					RuneCollection.update(rune);
				else
					RuneCollection.create(rune);
				
				for (RuneData oldRune : oldRunes) {
					if (rune.getUniqueId().equals(oldRune.getUniqueId())) {
						oldRunes.remove(oldRune);
						break;
					}
				}
			}
			for (RuneData oldRune : oldRunes)
				RuneCollection.delete(oldRune);
			
			user.setLastImport(TimeHelper.nowDateTimeIntegers());
			UserCollection.update(user);
			
		} catch (JSONException e) {
			throw new APWebException(e.getMessage(), "500", Status.INTERNAL_SERVER_ERROR);
		}
		
		return null;
	}
	
	public static void buildStat(JSONObject obj, String prefix, RuneData rune) throws JSONException, APWebException {
		String typeString = obj.getString(prefix + "_t");
		if (typeString == null || typeString.equals(""))
			return;
		int statValue = obj.getInt(prefix + "_v");
		boolean enchanted = false;
		int enchantValue = 0;
		if (obj.has(prefix + "_data")) {
			JSONObject enchantJson = obj.getJSONObject(prefix + "_data");
			if (enchantJson.has("enchanted")) {
				enchanted = enchantJson.getBoolean("enchanted");
				enchantValue = enchantJson.getInt("gvalue");
			}
		}
		
		if (prefix.equals("m")) {
			rune.statMainType = ImportHelper.getType(typeString);
			rune.statMain = statValue;
		} else if (prefix.equals("i")) {
			rune.statSubType = ImportHelper.getType(typeString);
			rune.statSub = statValue;
		} else if (prefix.equals("s1")) {
			rune.stat1Type = ImportHelper.getType(typeString);
			rune.stat1 = statValue;
		} else if (prefix.equals("s2")) {
			rune.stat2Type = ImportHelper.getType(typeString);
			rune.stat2 = statValue;
		} else if (prefix.equals("s3")) {
			rune.stat3Type = ImportHelper.getType(typeString);
			rune.stat3 = statValue;
		} else if (prefix.equals("s4")) {
			rune.stat4Type = ImportHelper.getType(typeString);
			rune.stat4 = statValue;
		}
		
		//Stat stat =  new Stat(statType, statValue, type, enchanted, enchantValue);
	}
	
	public static String getType(String rawType) throws APWebException {
		switch (rawType) {
		case "SPD":
			return "Spd";
		case "ATK%":
			return "Atk";
		case "ATK flat":
			return "AtkFlat";
		case "HP%":
			return "Hp";
		case "HP flat":
			return "HpFlat";
		case "DEF%":
			return "Def";
		case "DEF flat":
			return "DefFlat";
		case "CDmg":
			return "Cdmg";
		case "CRate":
			return "Crate";
		case "ACC":
			return "Acc";
		case "RES":
			return "Res";
		default:
			throw new APWebException("Unknow rune type", "500", Status.INTERNAL_SERVER_ERROR); 
		}
	}
}
