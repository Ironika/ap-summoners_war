package org.ap.summonerwar.helpers;

import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;


import org.ap.summonerwar.bean.DoBuildBean;

import org.ap.web.internal.APWebException;

public class DoBuildHelper {

	public static Object postDoBuild(SecurityContext sc, DoBuildBean doBuildBean) throws APWebException {
		
		try {
		
			
		} catch (Exception e) {
			throw new APWebException(e.getMessage(), "500", Status.INTERNAL_SERVER_ERROR);
		}
		
		return null;
	}

}
