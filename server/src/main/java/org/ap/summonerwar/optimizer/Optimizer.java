package org.ap.summonerwar.optimizer;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

import org.ap.summonerwar.bean.DoBuildBean;
import org.ap.summonerwar.optimizer.builder.ObjectBuilder;
import org.ap.summonerwar.optimizer.builder.StuffBuilder;
import org.ap.summonerwar.optimizer.rune.Rune;
import org.ap.summonerwar.optimizer.stuff.StuffNode;
import org.ap.summonerwar.optimizer.team.Team;
import org.ap.summonerwar.storage.BuildCollection;
import org.ap.summonerwar.storage.BuildData;
import org.ap.web.internal.APWebException;
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
		
		int nbStuff = 3;
		nbStuff = nbStuff > stuffNodes.size() ? stuffNodes.size() : nbStuff;
		for (int i = 0; i < nbStuff; i++) {
			StuffNode current = stuffNodes.get(i);
			
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
	}
}
