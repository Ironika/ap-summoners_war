package org.ap.summonerwar.helpers;

import javax.ws.rs.core.SecurityContext;

import java.util.ArrayList;
import java.util.List;

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

	public static Thread thread = null;
	public static List<DoBuildBean> buildQueue = new ArrayList<DoBuildBean>();
	public static final Object lock = new Object();
	
	public static Object postDoBuild(SecurityContext sc, DoBuildBean doBuildBean) throws APWebException {
		
		synchronized (DoBuildHelper.lock) {
			DoBuildHelper.buildQueue.add(doBuildBean);
		}
		System.out.println("Add Build: " + doBuildBean.buildId);
		
		if (DoBuildHelper.thread == null) {
			DoBuildHelper.thread = new Thread() {
				public void run() {
					try {
						while(true) {
							DoBuildBean currentDoBuildBean = null;
							synchronized (DoBuildHelper.lock) {
								if (DoBuildHelper.buildQueue.size() == 0) {
									DoBuildHelper.thread = null;
									break;
								}
								currentDoBuildBean = DoBuildHelper.buildQueue.remove(0);
							}
							BuildData buildData = BuildCollection.getById(currentDoBuildBean.buildId);
							buildData.state = "InBuilding";
							BuildCollection.update(buildData);
							ApauthData dataAuth = ApauthCollection.getByUsername(sc.getUserPrincipal().getName());
							UserData userData = UserCollection.getById(dataAuth.getEntityId());
							Optimizer.build(userData.getId(), currentDoBuildBean);
							buildData.state = "Build";
							BuildCollection.update(buildData);
						}
					} catch (Exception e) {
						System.err.println(e.getMessage());
					}
				}
			};
			DoBuildHelper.thread.start();
		}
		return null;
	}

}
