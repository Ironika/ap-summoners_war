package org.ap.summonerwar.rest.servlet;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.*;
import org.ap.web.rest.servlet.APServletBase;
import org.ap.summonerwar.bean.MonsterConfigBean;
import org.ap.summonerwar.storage.MonsterConfigData;
import org.ap.summonerwar.storage.MonsterConfigCollection;
import org.ap.web.internal.APWebException;
import java.util.List;
import java.util.ArrayList;
import javax.annotation.security.RolesAllowed;
import org.ap.web.internal.UUIDGenerator;
import com.mongodb.MongoWriteException;
import org.ap.summonerwar.bean.BuildBean;
import org.ap.summonerwar.storage.BuildData;
import org.ap.summonerwar.storage.BuildCollection;
import static com.mongodb.client.model.Filters.*;

/* This class was auto-generated by the JavaWriter */
@Path("/monstersconfig")
public class MonsterConfigServlet extends APServletBase {

	public static final String PATH = "/monstersconfig";

	@GET
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getMonstersconfigs(@Context SecurityContext sc) {
		try {
			List<MonsterConfigData> datas = MonsterConfigCollection.getAll();
			
			List<MonsterConfigBean> beanList = new ArrayList<MonsterConfigBean>();
			for (MonsterConfigData data : datas) {
				MonsterConfigBean bean = new MonsterConfigBean();
				bean.monsterId = data.getMonsterId();
				bean.buildId = data.getBuildId();
				bean.requiredDef = data.getRequiredDef();
				bean.notationDef = data.getNotationDef();
				bean.set3 = data.getSet3();
				bean.requiredRes = data.getRequiredRes();
				bean.notationSpd = data.getNotationSpd();
				bean.set2 = data.getSet2();
				bean.requiredAcc = data.getRequiredAcc();
				bean.notationHp = data.getNotationHp();
				bean.requiredSpd = data.getRequiredSpd();
				bean.requiredCrate = data.getRequiredCrate();
				bean.requiredHp = data.getRequiredHp();
				bean.notationCrate = data.getNotationCrate();
				bean.notationAtk = data.getNotationAtk();
				bean.set1 = data.getSet1();
				bean.id = data.getId();
				bean.requiredAtk = data.getRequiredAtk();
				bean.requiredCdmg = data.getRequiredCdmg();
				bean.notationRes = data.getNotationRes();
				bean.notationCdmg = data.getNotationCdmg();
				bean.notationAcc = data.getNotationAcc();
				
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new MonsterConfigBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response postMonstersconfig(@Context SecurityContext sc, MonsterConfigBean monsterConfigBean) {
		try {
			MonsterConfigData data = new MonsterConfigData();
			data.setId(UUIDGenerator.nextId());
			data.setMonsterId(monsterConfigBean.monsterId);
			data.setBuildId(monsterConfigBean.buildId);
			data.setRequiredDef(monsterConfigBean.requiredDef);
			data.setNotationDef(monsterConfigBean.notationDef);
			data.setSet3(monsterConfigBean.set3);
			data.setRequiredRes(monsterConfigBean.requiredRes);
			data.setNotationSpd(monsterConfigBean.notationSpd);
			data.setSet2(monsterConfigBean.set2);
			data.setRequiredAcc(monsterConfigBean.requiredAcc);
			data.setNotationHp(monsterConfigBean.notationHp);
			data.setRequiredSpd(monsterConfigBean.requiredSpd);
			data.setRequiredCrate(monsterConfigBean.requiredCrate);
			data.setRequiredHp(monsterConfigBean.requiredHp);
			data.setNotationCrate(monsterConfigBean.notationCrate);
			data.setNotationAtk(monsterConfigBean.notationAtk);
			data.setSet1(monsterConfigBean.set1);
			data.setRequiredAtk(monsterConfigBean.requiredAtk);
			data.setRequiredCdmg(monsterConfigBean.requiredCdmg);
			data.setNotationRes(monsterConfigBean.notationRes);
			data.setNotationCdmg(monsterConfigBean.notationCdmg);
			data.setNotationAcc(monsterConfigBean.notationAcc);
			MonsterConfigCollection.create(data);
			return Response.status(Status.CREATED).entity("{\"id\": \"" + data.id + "\"}").build();
			
		} catch (MongoWriteException e) {
			return Response.status(Status.FORBIDDEN).build();
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{monsterConfigId}")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getMonstersconfig(@Context SecurityContext sc, @PathParam("monsterConfigId") final String monsterConfigId) {
		try {
			MonsterConfigData data = MonsterConfigCollection.getById(monsterConfigId);
			if(data == null) {
				return Response.status(Status.NOT_FOUND).build();
			}
			MonsterConfigBean bean = new MonsterConfigBean();
			bean.monsterId = data.getMonsterId();
			bean.buildId = data.getBuildId();
			bean.requiredDef = data.getRequiredDef();
			bean.notationDef = data.getNotationDef();
			bean.set3 = data.getSet3();
			bean.requiredRes = data.getRequiredRes();
			bean.notationSpd = data.getNotationSpd();
			bean.set2 = data.getSet2();
			bean.requiredAcc = data.getRequiredAcc();
			bean.notationHp = data.getNotationHp();
			bean.requiredSpd = data.getRequiredSpd();
			bean.requiredCrate = data.getRequiredCrate();
			bean.requiredHp = data.getRequiredHp();
			bean.notationCrate = data.getNotationCrate();
			bean.notationAtk = data.getNotationAtk();
			bean.set1 = data.getSet1();
			bean.id = data.getId();
			bean.requiredAtk = data.getRequiredAtk();
			bean.requiredCdmg = data.getRequiredCdmg();
			bean.notationRes = data.getNotationRes();
			bean.notationCdmg = data.getNotationCdmg();
			bean.notationAcc = data.getNotationAcc();
			
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PUT
	@Path("/{monsterConfigId}")
	@Consumes({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response putMonstersconfig(@Context SecurityContext sc, @PathParam("monsterConfigId") final String monsterConfigId, MonsterConfigBean monsterConfigBean) {
		try {
			// Get actual data object
			MonsterConfigData data = MonsterConfigCollection.getById(monsterConfigId);
			// Check data exists
			if (data == null) {
				throw new APWebException("monsterConfig not found", "AP_MONSTERCONFIG_NOTFOUND", Status.BAD_REQUEST);
			}
			// Update the data object
			data.setMonsterId(monsterConfigBean.monsterId);
			data.setBuildId(monsterConfigBean.buildId);
			data.setRequiredDef(monsterConfigBean.requiredDef);
			data.setNotationDef(monsterConfigBean.notationDef);
			data.setSet3(monsterConfigBean.set3);
			data.setRequiredRes(monsterConfigBean.requiredRes);
			data.setNotationSpd(monsterConfigBean.notationSpd);
			data.setSet2(monsterConfigBean.set2);
			data.setRequiredAcc(monsterConfigBean.requiredAcc);
			data.setNotationHp(monsterConfigBean.notationHp);
			data.setRequiredSpd(monsterConfigBean.requiredSpd);
			data.setRequiredCrate(monsterConfigBean.requiredCrate);
			data.setRequiredHp(monsterConfigBean.requiredHp);
			data.setNotationCrate(monsterConfigBean.notationCrate);
			data.setNotationAtk(monsterConfigBean.notationAtk);
			data.setSet1(monsterConfigBean.set1);
			data.setRequiredAtk(monsterConfigBean.requiredAtk);
			data.setRequiredCdmg(monsterConfigBean.requiredCdmg);
			data.setNotationRes(monsterConfigBean.notationRes);
			data.setNotationCdmg(monsterConfigBean.notationCdmg);
			data.setNotationAcc(monsterConfigBean.notationAcc);
			// Store the updated data object
			MonsterConfigCollection.updateNull(data);
			// Send the response
			return Response.status(Status.OK).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DELETE
	@Path("/{monsterConfigId}")
	@RolesAllowed("user")
	public Response deleteMonstersconfig(@Context SecurityContext sc, @PathParam("monsterConfigId") final String monsterConfigId) {
		try {
			// Try to delete the entity
			if (!MonsterConfigCollection.deleteById(monsterConfigId)) {
				throw new APWebException("monsterConfig not found", "AP_MONSTERCONFIG_NOTFOUND", Status.BAD_REQUEST);
			}
			// Send the response
			return Response.status(Status.OK).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{monsterConfigId}/builds")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getMonstersconfigBuilds(@Context SecurityContext sc, @PathParam("monsterConfigId") final String monsterConfigId) {
		try {
			List<BuildData> datas = BuildCollection.get(and(eq("monsterConfigId", monsterConfigId)));
			
			List<BuildBean> beanList = new ArrayList<BuildBean>();
			for (BuildData data : datas) {
				BuildBean bean = new BuildBean();
				bean.userId = data.getUserId();
				bean.name = data.getName();
				bean.state = data.getState();
				bean.id = data.getId();
				
				beanList.add(bean);
			}
			
			return Response.status(Status.OK).entity(beanList.toArray(new BuildBean[beanList.size()])).build();
			
		} catch (APWebException e) {
			return sendException(e);
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

}
