package org.ap.summonerwar.storage;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.ap.web.storage.Mongo;
import static com.mongodb.client.model.Filters.*;
import org.ap.web.internal.APWebException;
import java.util.List;
import java.util.ArrayList;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.result.DeleteResult;

/* This class was auto-generated by the JavaWriter */
public class MonsterResultCollection {

	public static MongoCollection<Document> getCollection() throws APWebException {
		return Mongo.get().collection("monsterResult");
	}

	public static MonsterResultData getById(String id) throws APWebException {
		Document document = getCollection().find(eq("id", id)).first();
		return fromDocument(document);
	}

	public static boolean deleteById(String id) throws APWebException {
		Document document = getCollection().findOneAndDelete(eq("id", id));
		return document != null;
	}

	public static List<MonsterResultData> getAll() throws APWebException {
		FindIterable<Document> documents = getCollection().find();
		List<MonsterResultData> result = new ArrayList<MonsterResultData>();
		for (Document document: documents){
			result.add(fromDocument(document));
		}
		return result;
	}

	public static List<MonsterResultData> get(Bson condition) throws APWebException {
		FindIterable<Document> documents = getCollection().find(condition);
		List<MonsterResultData> result = new ArrayList<MonsterResultData>();
		for (Document document: documents){
			result.add(fromDocument(document));
		}
		return result;
	}

	public static void create(MonsterResultData data) throws APWebException {
		Document document = toDocument(data);
		getCollection().insertOne(document);
	}

	public static boolean update(MonsterResultData data) throws APWebException {
		Document document = toDocument(data);
		Document result = getCollection().findOneAndUpdate(eq("id", data.getId()), new Document("$set", document));
		return result != null;
	}

	public static boolean updateNull(MonsterResultData data) throws APWebException {
		Document document = toNullDocument(data);
		Document result = getCollection().findOneAndUpdate(eq("id", data.getId()), new Document("$set", document));
		return result != null;
	}

	public static boolean delete(MonsterResultData data) throws APWebException {
		Document result = getCollection().findOneAndDelete(eq("id", data.getId()));
		return result != null;
	}

	public static long deleteMany(Bson condition) throws APWebException {
		DeleteResult result = getCollection().deleteMany(condition);
		return result.getDeletedCount();
	}

	public static long drop() throws APWebException {
		long result = getCollection().count();
		getCollection().drop();
		return result;
	}

	public static MonsterResultData fromDocument(Document document) {
		if(document == null) {
			return null;
		}
		MonsterResultData data = new MonsterResultData();
		data.acc = document.getInteger("acc");
		data.rune6 = document.getString("rune6");
		data.res = document.getInteger("res");
		data.rune3 = document.getString("rune3");
		data.def = document.getInteger("def");
		data.rune2 = document.getString("rune2");
		data.rune5 = document.getString("rune5");
		data.spd = document.getInteger("spd");
		data.rune4 = document.getString("rune4");
		data.hp = document.getInteger("hp");
		data.rune1 = document.getString("rune1");
		data.crate = document.getInteger("crate");
		data.userId = document.getString("userId");
		data.teamResultId = document.getString("teamResultId");
		data.cdmg = document.getInteger("cdmg");
		data.atk = document.getInteger("atk");
		data.id = document.getString("id");
		data.monsterConfigId = document.getString("monsterConfigId");
		return data;
	}

	public static Document toDocument(MonsterResultData monsterResult) {
		Document document = new Document();
		if (monsterResult.acc != null)
			document.append("acc", monsterResult.acc);
		if (monsterResult.rune6 != null)
			document.append("rune6", monsterResult.rune6);
		if (monsterResult.res != null)
			document.append("res", monsterResult.res);
		if (monsterResult.rune3 != null)
			document.append("rune3", monsterResult.rune3);
		if (monsterResult.def != null)
			document.append("def", monsterResult.def);
		if (monsterResult.rune2 != null)
			document.append("rune2", monsterResult.rune2);
		if (monsterResult.rune5 != null)
			document.append("rune5", monsterResult.rune5);
		if (monsterResult.spd != null)
			document.append("spd", monsterResult.spd);
		if (monsterResult.rune4 != null)
			document.append("rune4", monsterResult.rune4);
		if (monsterResult.hp != null)
			document.append("hp", monsterResult.hp);
		if (monsterResult.rune1 != null)
			document.append("rune1", monsterResult.rune1);
		if (monsterResult.crate != null)
			document.append("crate", monsterResult.crate);
		if (monsterResult.userId != null)
			document.append("userId", monsterResult.userId);
		if (monsterResult.teamResultId != null)
			document.append("teamResultId", monsterResult.teamResultId);
		if (monsterResult.cdmg != null)
			document.append("cdmg", monsterResult.cdmg);
		if (monsterResult.atk != null)
			document.append("atk", monsterResult.atk);
		if (monsterResult.id != null)
			document.append("id", monsterResult.id);
		if (monsterResult.monsterConfigId != null)
			document.append("monsterConfigId", monsterResult.monsterConfigId);
		return document;
	}

	public static Document toNullDocument(MonsterResultData monsterResult) {
		Document document = new Document();
		document.append("acc", monsterResult.acc);
		document.append("rune6", monsterResult.rune6);
		document.append("res", monsterResult.res);
		document.append("rune3", monsterResult.rune3);
		document.append("def", monsterResult.def);
		document.append("rune2", monsterResult.rune2);
		document.append("rune5", monsterResult.rune5);
		document.append("spd", monsterResult.spd);
		document.append("rune4", monsterResult.rune4);
		document.append("hp", monsterResult.hp);
		document.append("rune1", monsterResult.rune1);
		document.append("crate", monsterResult.crate);
		document.append("userId", monsterResult.userId);
		document.append("teamResultId", monsterResult.teamResultId);
		document.append("cdmg", monsterResult.cdmg);
		document.append("atk", monsterResult.atk);
		document.append("id", monsterResult.id);
		document.append("monsterConfigId", monsterResult.monsterConfigId);
		return document;
	}

}
