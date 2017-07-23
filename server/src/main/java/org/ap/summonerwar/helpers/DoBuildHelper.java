package org.ap.summonerwar.helpers;

import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;


import org.ap.summonerwar.bean.DoBuildBean;
import org.ap.summonerwar.optimizer.Optimizer;
import org.ap.summonerwar.storage.ApauthCollection;
import org.ap.summonerwar.storage.ApauthData;
import org.ap.summonerwar.storage.BuildCollection;
import org.ap.summonerwar.storage.BuildData;
import org.ap.summonerwar.storage.UserCollection;
import org.ap.summonerwar.storage.UserData;
import org.ap.web.internal.APWebException;

public class DoBuildHelper {

	public static Object postDoBuild(SecurityContext sc, DoBuildBean doBuildBean) throws APWebException {
		
		try {
			BuildData buildData = BuildCollection.getById(doBuildBean.buildId);
			buildData.state = "InBuilding";
			BuildCollection.update(buildData);
			ApauthData dataAuth = ApauthCollection.getByUsername(sc.getUserPrincipal().getName());
			UserData userData = UserCollection.getById(dataAuth.getEntityId());
			Optimizer.build(userData.getId(), doBuildBean);
			buildData.state = "Build";
			BuildCollection.update(buildData);
		} catch (Exception e) {
			throw new APWebException(e.getMessage(), "500", Status.INTERNAL_SERVER_ERROR);
		}
		
		return null;
	}

}
