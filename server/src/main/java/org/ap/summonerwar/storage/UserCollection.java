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
public class UserCollection {

	public static MongoCollection<Document> getCollection() throws APWebException {
		return Mongo.get().collection("user");
	}

	public static UserData getByAuthId(String authId) throws APWebException {
		Document document = getCollection().find(eq("authId", authId)).first();
		return fromDocument(document);
	}

	public static boolean deleteByAuthId(String authId) throws APWebException {
		Document document = getCollection().findOneAndDelete(eq("authId", authId));
		return document != null;
	}

	public static UserData getById(String id) throws APWebException {
		Document document = getCollection().find(eq("id", id)).first();
		return fromDocument(document);
	}

	public static boolean deleteById(String id) throws APWebException {
		Document document = getCollection().findOneAndDelete(eq("id", id));
		return document != null;
	}

	public static List<UserData> getAll() throws APWebException {
		FindIterable<Document> documents = getCollection().find();
		List<UserData> result = new ArrayList<UserData>();
		for (Document document: documents){
			result.add(fromDocument(document));
		}
		return result;
	}

	public static List<UserData> get(Bson condition) throws APWebException {
		FindIterable<Document> documents = getCollection().find(condition);
		List<UserData> result = new ArrayList<UserData>();
		for (Document document: documents){
			result.add(fromDocument(document));
		}
		return result;
	}

	public static void create(UserData data) throws APWebException {
		Document document = toDocument(data);
		getCollection().insertOne(document);
	}

	public static boolean update(UserData data) throws APWebException {
		Document document = toDocument(data);
		Document result = getCollection().findOneAndUpdate(eq("id", data.getId()), new Document("$set", document));
		return result != null;
	}

	public static boolean updateNull(UserData data) throws APWebException {
		Document document = toNullDocument(data);
		Document result = getCollection().findOneAndUpdate(eq("id", data.getId()), new Document("$set", document));
		return result != null;
	}

	public static boolean delete(UserData data) throws APWebException {
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

	@SuppressWarnings("unchecked")
	public static UserData fromDocument(Document document) {
		if(document == null) {
			return null;
		}
		UserData data = new UserData();
		data.authId = document.getString("authId");
		data.lastImport = (List<Integer>)document.get("lastImport");
		data.profileImage = document.getString("profileImage");
		data.id = document.getString("id");
		return data;
	}

	public static Document toDocument(UserData user) {
		Document document = new Document();
		if (user.authId != null)
			document.append("authId", user.authId);
		if (user.lastImport != null)
			document.append("lastImport", user.lastImport);
		if (user.profileImage != null)
			document.append("profileImage", user.profileImage);
		if (user.id != null)
			document.append("id", user.id);
		return document;
	}

	public static Document toNullDocument(UserData user) {
		Document document = new Document();
		document.append("authId", user.authId);
		document.append("lastImport", user.lastImport);
		document.append("profileImage", user.profileImage);
		document.append("id", user.id);
		return document;
	}

}
