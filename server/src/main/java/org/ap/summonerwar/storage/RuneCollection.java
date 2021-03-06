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
public class RuneCollection {

	public static MongoCollection<Document> getCollection() throws APWebException {
		return Mongo.get().collection("rune");
	}

	public static RuneData getById(String id) throws APWebException {
		Document document = getCollection().find(eq("id", id)).first();
		return fromDocument(document);
	}

	public static boolean deleteById(String id) throws APWebException {
		Document document = getCollection().findOneAndDelete(eq("id", id));
		return document != null;
	}

	public static List<RuneData> getAll() throws APWebException {
		FindIterable<Document> documents = getCollection().find();
		List<RuneData> result = new ArrayList<RuneData>();
		for (Document document: documents){
			result.add(fromDocument(document));
		}
		return result;
	}

	public static List<RuneData> get(Bson condition) throws APWebException {
		FindIterable<Document> documents = getCollection().find(condition);
		List<RuneData> result = new ArrayList<RuneData>();
		for (Document document: documents){
			result.add(fromDocument(document));
		}
		return result;
	}

	public static void create(RuneData data) throws APWebException {
		Document document = toDocument(data);
		getCollection().insertOne(document);
	}

	public static boolean update(RuneData data) throws APWebException {
		Document document = toDocument(data);
		Document result = getCollection().findOneAndUpdate(eq("id", data.getId()), new Document("$set", document));
		return result != null;
	}

	public static boolean updateNull(RuneData data) throws APWebException {
		Document document = toNullDocument(data);
		Document result = getCollection().findOneAndUpdate(eq("id", data.getId()), new Document("$set", document));
		return result != null;
	}

	public static boolean delete(RuneData data) throws APWebException {
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

	public static RuneData fromDocument(Document document) {
		if(document == null) {
			return null;
		}
		RuneData data = new RuneData();
		data.lvl = document.getInteger("lvl");
		data.set = document.getString("set");
		data.stat4Type = document.getString("stat4Type");
		data.star = document.getInteger("star");
		data.stat2Type = document.getString("stat2Type");
		data.statSub = document.getInteger("statSub");
		data.statMain = document.getInteger("statMain");
		data.stat4 = document.getInteger("stat4");
		data.userId = document.getString("userId");
		data.stat3Type = document.getString("stat3Type");
		data.stat2 = document.getInteger("stat2");
		data.pos = document.getString("pos");
		data.stat3 = document.getInteger("stat3");
		data.statSubType = document.getString("statSubType");
		data.monsterId = document.getString("monsterId");
		data.stat1 = document.getInteger("stat1");
		data.stat1Type = document.getString("stat1Type");
		data.statMainType = document.getString("statMainType");
		data.id = document.getString("id");
		data.uniqueId = document.getLong("uniqueId");
		return data;
	}

	public static Document toDocument(RuneData rune) {
		Document document = new Document();
		if (rune.lvl != null)
			document.append("lvl", rune.lvl);
		if (rune.set != null)
			document.append("set", rune.set);
		if (rune.stat4Type != null)
			document.append("stat4Type", rune.stat4Type);
		if (rune.star != null)
			document.append("star", rune.star);
		if (rune.stat2Type != null)
			document.append("stat2Type", rune.stat2Type);
		if (rune.statSub != null)
			document.append("statSub", rune.statSub);
		if (rune.statMain != null)
			document.append("statMain", rune.statMain);
		if (rune.stat4 != null)
			document.append("stat4", rune.stat4);
		if (rune.userId != null)
			document.append("userId", rune.userId);
		if (rune.stat3Type != null)
			document.append("stat3Type", rune.stat3Type);
		if (rune.stat2 != null)
			document.append("stat2", rune.stat2);
		if (rune.pos != null)
			document.append("pos", rune.pos);
		if (rune.stat3 != null)
			document.append("stat3", rune.stat3);
		if (rune.statSubType != null)
			document.append("statSubType", rune.statSubType);
		if (rune.monsterId != null)
			document.append("monsterId", rune.monsterId);
		if (rune.stat1 != null)
			document.append("stat1", rune.stat1);
		if (rune.stat1Type != null)
			document.append("stat1Type", rune.stat1Type);
		if (rune.statMainType != null)
			document.append("statMainType", rune.statMainType);
		if (rune.id != null)
			document.append("id", rune.id);
		if (rune.uniqueId != null)
			document.append("uniqueId", rune.uniqueId);
		return document;
	}

	public static Document toNullDocument(RuneData rune) {
		Document document = new Document();
		document.append("lvl", rune.lvl);
		document.append("set", rune.set);
		document.append("stat4Type", rune.stat4Type);
		document.append("star", rune.star);
		document.append("stat2Type", rune.stat2Type);
		document.append("statSub", rune.statSub);
		document.append("statMain", rune.statMain);
		document.append("stat4", rune.stat4);
		document.append("userId", rune.userId);
		document.append("stat3Type", rune.stat3Type);
		document.append("stat2", rune.stat2);
		document.append("pos", rune.pos);
		document.append("stat3", rune.stat3);
		document.append("statSubType", rune.statSubType);
		document.append("monsterId", rune.monsterId);
		document.append("stat1", rune.stat1);
		document.append("stat1Type", rune.stat1Type);
		document.append("statMainType", rune.statMainType);
		document.append("id", rune.id);
		document.append("uniqueId", rune.uniqueId);
		return document;
	}

}
