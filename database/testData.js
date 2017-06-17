db.apauth.insert({
	"id":"aauth",
	"username":"a",
	"email":"a",
	"password":"a",
	"roles":["admin"],
	"type":"admin",
	"active":true,
	"registrationDate":[2016, 1, 1, 0, 0],
	"registered":true,
	"entityId": "a"
})

db.user.insert({
	"id":"a",
	"lastImport": NumberLong("112233"),
	"authId":"aauth"
})