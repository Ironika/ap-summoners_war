db.apauth.insert({
	"id":"aauth",
	"username":"a",
	"email":"a",
	"password":"a",
	"roles":["user"],
	"type":"user",
	"active":true,
	"registrationDate":[2016, 1, 1, 0, 0],
	"registered":true,
	"entityId": "a"
})

db.user.insert({
	"id":"a",
	"authId":"aauth"
})

db.build.insert({
	"id":"build-aa",
	"name":"Nuckers",
	"userId": "a",
	"state": "Save"
})

db.build.insert({
	"id":"build-bb",
	"name":"Speeds",
	"userId": "a",
	"state": "Save"
})

db.build.insert({
	"id":"build-cc",
	"name":"Build3",
	"userId": "a",
	"state": "Save"
})

db.build.insert({
	"id":"build-dd",
	"name":"Build4",
	"userId": "a",
	"state": "Save"
})

db.monsterConfig.insert({
	"id": "monsterConfig-aa",
	"buildId": "build-aa",
})

db.monsterConfig.insert({
	"id": "monsterConfig-bb",
	"buildId": "build-aa"
})

db.monsterConfig.insert({
	"id": "monsterConfig-cc",
	"buildId": "build-aa"
})