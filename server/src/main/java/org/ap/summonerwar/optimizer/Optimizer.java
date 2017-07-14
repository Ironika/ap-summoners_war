package org.ap.summonerwar.optimizer;

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


public class Optimizer {

	public static void build(String userId, DoBuildBean doBuildBean) throws APWebException {
		BuildData buildData = BuildCollection.getById(doBuildBean.buildId);
		Team team = ObjectBuilder.buildTeam(buildData);
		List<List<Rune>> selectedRunes = ObjectBuilder.buildSelectedRunes(userId, buildData);
		
		StuffBuilder.buildTeamStuffs(team, selectedRunes);
		List<StuffNode> stuffsNode = StuffBuilder.selectStuffsForTeam(team);
		stuffsNode = stuffsNode;
	}
}
