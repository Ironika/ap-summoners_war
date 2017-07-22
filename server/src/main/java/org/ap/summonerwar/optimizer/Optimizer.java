package org.ap.summonerwar.optimizer;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

import org.ap.common.TimeHelper;
import org.ap.summonerwar.bean.DoBuildBean;
import org.ap.summonerwar.optimizer.builder.ObjectBuilder;
import org.ap.summonerwar.optimizer.builder.StuffBuilder;
import org.ap.summonerwar.optimizer.monster.StuffedMonster;
import org.ap.summonerwar.optimizer.rune.Rune;
import org.ap.summonerwar.optimizer.stuff.StuffNode;
import org.ap.summonerwar.optimizer.team.Team;
import org.ap.summonerwar.storage.BuildCollection;
import org.ap.summonerwar.storage.BuildData;
import org.ap.summonerwar.storage.BuildResultCollection;
import org.ap.summonerwar.storage.BuildResultData;
import org.ap.summonerwar.storage.MonsterResultCollection;
import org.ap.summonerwar.storage.MonsterResultData;
import org.ap.summonerwar.storage.TeamResultCollection;
import org.ap.summonerwar.storage.TeamResultData;
import org.ap.web.internal.APWebException;
import org.ap.web.internal.UUIDGenerator;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;


public class Optimizer {

	public static void build(String userId, DoBuildBean doBuildBean) throws APWebException, JSONException, IOException {
		BuildData buildData = BuildCollection.getById(doBuildBean.buildId);
		Team team = ObjectBuilder.buildTeam(buildData);
		List<List<Rune>> selectedRunes = ObjectBuilder.buildSelectedRunes(userId, buildData);
		
		StuffBuilder.buildTeamStuffs(team, selectedRunes);
		List<StuffNode> stuffNodes = StuffBuilder.selectStuffsForTeam(team);
		
		BuildResultData buildResultData = new BuildResultData();
		String buildResultId = UUIDGenerator.nextId();
		buildResultData.setId(buildResultId);
		buildResultData.setBuildId(doBuildBean.buildId);
		buildResultData.setUserId(userId);
		buildResultData.setCreationDate(TimeHelper.nowDateTimeIntegers());
		BuildResultCollection.create(buildResultData);
		
		int nbStuff = 3;
		nbStuff = nbStuff > stuffNodes.size() ? stuffNodes.size() : nbStuff;
		for (int i = 0; i < nbStuff; i++) {
			StuffNode current = stuffNodes.get(i);
			
			Optimizer.buildResultOnDatabase(userId, buildResultId, current);
			
			JSONObject currentObj = new JSONObject();
			currentObj.put("id", i);
			
			JSONArray teamJson = new JSONArray();
			while(current != null) {
				teamJson.put(current.getStuffedMonster().toJSON());			
				current = current.getParent();
			}
			currentObj.put("team", teamJson);
			
			File file = new File("./" + team.getName() + i + ".stuff");
			FileWriter fw = new FileWriter(file);
			fw.write(currentObj.toString());
			fw.close();
		}
		System.out.println("BUILD FINISHED");
	}
	
	public static void buildResultOnDatabase(String userId, String buildResultId, StuffNode stuffNode) throws APWebException {
		TeamResultData teamResultData = new TeamResultData();
		String teamResultId = UUIDGenerator.nextId();
		teamResultData.setId(teamResultId);
		teamResultData.setBuildResultId(buildResultId);;
		teamResultData.setUserId(userId);
		teamResultData.setEval(stuffNode.getEval());
		TeamResultCollection.create(teamResultData);
		
		StuffNode current = stuffNode;
		while(current != null) {
			StuffedMonster stuffedMonster = current.getStuffedMonster();
			MonsterResultData monsterResultData = new MonsterResultData();
			monsterResultData.setId(UUIDGenerator.nextId());
			monsterResultData.setUserId(userId);
			monsterResultData.setTeamResultId(teamResultId);
			monsterResultData.setMonsterConfigId(stuffedMonster.getTeamMate().getId());
			monsterResultData.setHp(stuffedMonster.getFinalStats().getHp());
			monsterResultData.setAtk((int)stuffedMonster.getFinalStats().getAtk());
			monsterResultData.setDef((int)stuffedMonster.getFinalStats().getDef());
			monsterResultData.setSpd((int)stuffedMonster.getFinalStats().getSpd());
			monsterResultData.setCrate((int)stuffedMonster.getFinalStats().getCrate());
			monsterResultData.setCdmg((int)stuffedMonster.getFinalStats().getCdmg());
			monsterResultData.setRes((int)stuffedMonster.getFinalStats().getRes());
			monsterResultData.setAcc((int)stuffedMonster.getFinalStats().getAcc());
			Rune[] runes = stuffedMonster.getStuff().getRunes();
			monsterResultData.setRune1(runes[0].getId());
			monsterResultData.setRune2(runes[1].getId());
			monsterResultData.setRune3(runes[2].getId());
			monsterResultData.setRune4(runes[3].getId());
			monsterResultData.setRune5(runes[4].getId());
			monsterResultData.setRune6(runes[5].getId());
			MonsterResultCollection.create(monsterResultData);
			current = current.getParent();
		}
	}
}
