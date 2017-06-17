package org.ap.summonerwar.helpers;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;

import org.ap.summonerwar.bean.ImportBean;
import org.ap.summonerwar.storage.MonsterCollection;
import org.ap.summonerwar.storage.MonsterData;
import org.ap.summonerwar.storage.RuneCollection;
import org.ap.summonerwar.storage.RuneData;
import org.ap.web.internal.APWebException;
import org.ap.web.internal.UUIDGenerator;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

public class ImportHelper {

	public static Object postImport(SecurityContext sc, ImportBean importBean) throws APWebException {
//		throw new APWebException("500", Status.INTERNAL_SERVER_ERROR);
		
		try {
			JSONObject json = new JSONObject(importBean.data);
			JSONArray monsterJson = json.getJSONArray("mons"); 
			
			Map<Integer, String> monsterIds = new HashMap<Integer, String>();
			for (int i = 0; i < monsterJson.length(); i++) {
				JSONObject obj = monsterJson.getJSONObject(i);
				
				MonsterData monster = new MonsterData();
				monster.user = importBean.user;
				monster.id = UUIDGenerator.nextId();
				monster.name = obj.getString("name");
				monster.elemType = obj.getString("attribute");
				monster.star = obj.getInt("stars");
				monster.lvl = obj.getInt("level");
				monster.hp = obj.getInt("b_hp");
				monster.atk = obj.getInt("b_atk");
				monster.def = obj.getInt("b_def");
				monster.spd = obj.getInt("b_spd");
				monster.crate = obj.getInt("b_crate");
				monster.cdmg = obj.getInt("b_cdmg");
				monster.res = obj.getInt("b_res");
				monster.acc = obj.getInt("b_acc");
				
				monsterIds.put(obj.getInt("id"), monster.id);
				
				MonsterCollection.create(monster);
			}
			
			JSONArray runesJson = json.getJSONArray("runes");
			for (int i = 0; i < runesJson.length(); i++) {
				JSONObject obj = runesJson.getJSONObject(i);
				
				RuneData rune = new RuneData();
				rune.user = importBean.user;
				rune.id = UUIDGenerator.nextId();
				rune.set = obj.getString("set");
				rune.star = obj.getInt("grade");
				rune.lvl = obj.getInt("level");
				rune.pos = String.valueOf(obj.getInt("slot"));
				int monster = obj.getInt("monster");
				if (monster != 0)
					rune.monster = monsterIds.get(monster);
				
				ImportHelper.buildStat(obj, "m", rune);
				ImportHelper.buildStat(obj, "i", rune);
				ImportHelper.buildStat(obj, "s1", rune);
				ImportHelper.buildStat(obj, "s2", rune);
				ImportHelper.buildStat(obj, "s3", rune);
				ImportHelper.buildStat(obj, "s4", rune);
				
				RuneCollection.create(rune);
			};
			
			
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
