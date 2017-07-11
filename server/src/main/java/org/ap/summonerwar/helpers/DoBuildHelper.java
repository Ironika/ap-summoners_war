package org.ap.summonerwar.helpers;

import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;


import org.ap.summonerwar.bean.DoBuildBean;
import org.ap.summonerwar.optimizer.Optimizer;
import org.ap.summonerwar.storage.BuildCollection;
import org.ap.summonerwar.storage.BuildData;
import org.ap.web.internal.APWebException;

public class DoBuildHelper {

	public static Object postDoBuild(SecurityContext sc, DoBuildBean doBuildBean) throws APWebException {
		
		try {
			BuildData buildData = BuildCollection.getById(doBuildBean.buildId);
			buildData.state = "InBuilding";
			BuildCollection.update(buildData);
			Optimizer.build(doBuildBean);			
		} catch (Exception e) {
			throw new APWebException(e.getMessage(), "500", Status.INTERNAL_SERVER_ERROR);
		}
		
		return null;
	}

}
