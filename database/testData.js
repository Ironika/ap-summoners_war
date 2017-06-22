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