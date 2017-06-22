package org.ap.summonerwar.rest.servlet;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import org.bson.Document;
import javax.ws.rs.core.Response.*;
import org.ap.web.storage.Mongo;
import org.ap.web.rest.servlet.APServletBase;
import org.ap.summonerwar.bean.MonsterBean;
import javax.annotation.security.RolesAllowed;
import java.util.ArrayList;
import java.util.List;
import com.mongodb.client.FindIterable;
import org.ap.web.internal.UUIDGenerator;
import com.mongodb.MongoWriteException;
import org.ap.summonerwar.storage.MonsterData;
import org.ap.summonerwar.storage.MonsterCollection;
import static com.mongodb.client.model.Filters.*;
import org.ap.summonerwar.bean.RuneBean;

/* This class was auto-generated by the JavaWriter */
@Path("/monsters")
public class MonsterServlet extends APServletBase {

	public static final String PATH = "/monsters";

	@GET
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getMonsters(@Context SecurityContext sc) {
		try {
			FindIterable<Document> documents = Mongo.get().collection("monster").find();
			List<MonsterBean> beanList = new ArrayList<MonsterBean>();
			for (Document document: documents){
				MonsterBean bean = new MonsterBean();
				bean.acc = document.getInteger("acc");
				bean.res = document.getInteger("res");
				bean.lvl = document.getInteger("lvl");
				bean.role = document.getString("role");
				bean.star = document.getInteger("star");
				bean.isAwaked = document.getBoolean("isAwaked");
				bean.def = document.getInteger("def");
				bean.spd = document.getInteger("spd");
				bean.hp = document.getInteger("hp");
				bean.crate = document.getInteger("crate");
				bean.elemType = document.getString("elemType");
				bean.cdmg = document.getInteger("cdmg");
				bean.name = document.getString("name");
				bean.xp = document.getInteger("xp");
				bean.atk = document.getInteger("atk");
				bean.id = document.getString("id");
				bean.user = document.getString("user");
				beanList.add(bean);
			}
			return Response.status(Status.OK).entity(beanList.toArray(new MonsterBean[beanList.size()])).build();
			
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response postMonster(@Context SecurityContext sc, MonsterBean monsterBean) {
		try {
			MonsterData data = new MonsterData();
			data.id = UUIDGenerator.nextId();
			data.acc = monsterBean.acc;
			data.res = monsterBean.res;
			data.lvl = monsterBean.lvl;
			data.role = monsterBean.role;
			data.star = monsterBean.star;
			data.isAwaked = monsterBean.isAwaked;
			data.def = monsterBean.def;
			data.spd = monsterBean.spd;
			data.hp = monsterBean.hp;
			data.crate = monsterBean.crate;
			data.elemType = monsterBean.elemType;
			data.cdmg = monsterBean.cdmg;
			data.name = monsterBean.name;
			data.xp = monsterBean.xp;
			data.atk = monsterBean.atk;
			data.user = monsterBean.user;
			MonsterCollection.create(data);
			return Response.status(Status.CREATED).entity("{\"id\": \"" + data.id + "\"}").build();
			
		} catch (MongoWriteException e) {
			return Response.status(Status.FORBIDDEN).build();
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{monsterId}")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getMonster(@Context SecurityContext sc, @PathParam("monsterId") final String monsterId) {
		try {
			MonsterData data = MonsterCollection.getById(monsterId);
			if(data == null) {
				return Response.status(Status.NOT_FOUND).build();
			}
			
			MonsterBean bean = new MonsterBean();
			bean.acc = data.getAcc();
			bean.res = data.getRes();
			bean.lvl = data.getLvl();
			bean.role = data.getRole();
			bean.star = data.getStar();
			bean.isAwaked = data.getIsAwaked();
			bean.def = data.getDef();
			bean.spd = data.getSpd();
			bean.hp = data.getHp();
			bean.crate = data.getCrate();
			bean.elemType = data.getElemType();
			bean.cdmg = data.getCdmg();
			bean.name = data.getName();
			bean.xp = data.getXp();
			bean.atk = data.getAtk();
			bean.id = data.getId();
			bean.user = data.getUser();
			return Response.status(Status.OK).entity(bean).build();
			
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PUT
	@Path("/{monsterId}")
	@Consumes({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response putMonster(@Context SecurityContext sc, @PathParam("monsterId") final String monsterId, MonsterBean monsterBean) {
		try {
			Document document = new Document();
			if(monsterBean.acc != null)
				document.append("acc", monsterBean.acc);
			if(monsterBean.res != null)
				document.append("res", monsterBean.res);
			if(monsterBean.lvl != null)
				document.append("lvl", monsterBean.lvl);
			if(monsterBean.role != null)
				document.append("role", monsterBean.role);
			if(monsterBean.star != null)
				document.append("star", monsterBean.star);
			if(monsterBean.isAwaked != null)
				document.append("isAwaked", monsterBean.isAwaked);
			if(monsterBean.def != null)
				document.append("def", monsterBean.def);
			if(monsterBean.spd != null)
				document.append("spd", monsterBean.spd);
			if(monsterBean.hp != null)
				document.append("hp", monsterBean.hp);
			if(monsterBean.crate != null)
				document.append("crate", monsterBean.crate);
			if(monsterBean.elemType != null)
				document.append("elemType", monsterBean.elemType);
			if(monsterBean.cdmg != null)
				document.append("cdmg", monsterBean.cdmg);
			if(monsterBean.name != null)
				document.append("name", monsterBean.name);
			if(monsterBean.xp != null)
				document.append("xp", monsterBean.xp);
			if(monsterBean.atk != null)
				document.append("atk", monsterBean.atk);
			if(monsterBean.id != null)
				document.append("id", monsterBean.id);
			if(monsterBean.user != null)
				document.append("user", monsterBean.user);
			Document result = Mongo.get().collection("monster").findOneAndUpdate(and(eq("monsterId", monsterId)), new Document("$set", document));
			if(result == null)
				return Response.status(Status.NOT_FOUND).build();
			return Response.status(Status.OK).build();
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DELETE
	@Path("/{monsterId}")
	@RolesAllowed("user")
	public Response deleteMonster(@Context SecurityContext sc, @PathParam("monsterId") final String monsterId) {
		try {
			if (MonsterCollection.deleteById(monsterId)) {
				return Response.status(Status.OK).build();
			}
			return Response.status(Status.NOT_FOUND).build();
			
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GET
	@Path("/{monsterId}/runes")
	@Produces({MediaType.APPLICATION_JSON})
	@RolesAllowed("user")
	public Response getMonsterRunes(@Context SecurityContext sc, @PathParam("monsterId") final String monsterId) {
		try {
			FindIterable<Document> documents = Mongo.get().collection("rune").find(and(eq("monsterId", monsterId)));
			List<RuneBean> beanList = new ArrayList<RuneBean>();
			for (Document document: documents){
				RuneBean bean = new RuneBean();
				bean.lvl = document.getInteger("lvl");
				bean.set = document.getString("set");
				bean.stat4Type = document.getString("stat4Type");
				bean.star = document.getInteger("star");
				bean.stat2Type = document.getString("stat2Type");
				bean.statSub = document.getInteger("statSub");
				bean.statMain = document.getInteger("statMain");
				bean.stat4 = document.getInteger("stat4");
				bean.monster = document.getString("monster");
				bean.stat3Type = document.getString("stat3Type");
				bean.stat2 = document.getInteger("stat2");
				bean.pos = document.getString("pos");
				bean.stat3 = document.getInteger("stat3");
				bean.statSubType = document.getString("statSubType");
				bean.stat1 = document.getInteger("stat1");
				bean.stat1Type = document.getString("stat1Type");
				bean.statMainType = document.getString("statMainType");
				bean.id = document.getString("id");
				bean.user = document.getString("user");
				beanList.add(bean);
			}
			return Response.status(Status.OK).entity(beanList.toArray(new RuneBean[beanList.size()])).build();
			
		} catch (Exception e) {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		}
	}

}
