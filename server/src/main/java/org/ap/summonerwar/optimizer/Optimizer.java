package org.ap.summonerwar.optimizer;

import org.ap.summonerwar.bean.DoBuildBean;
import org.ap.summonerwar.optimizer.builder.Builder;
import org.ap.summonerwar.optimizer.team.Team;
import org.ap.web.internal.APWebException;

public class Optimizer {

	public static void build(DoBuildBean doBuildBean) throws APWebException {
		Team team = Builder.buildTeam(doBuildBean.buildId);
	}
}
