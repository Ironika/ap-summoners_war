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

db.apauth.insert({
	"id":"bauth",
	"username":"b",
	"email":"b",
	"password":"b",
	"roles":["user"],
	"type":"user",
	"active":true,
	"registrationDate":[2016, 1, 1, 0, 0],
	"registered":true,
	"entityId": "b"
})

db.user.insert({
	"id":"b",
	"authId":"bauth"
})

db.apauth.insert({
	"id":"cauth",
	"username":"c",
	"email":"c",
	"password":"c",
	"roles":["user"],
	"type":"user",
	"active":true,
	"registrationDate":[2016, 1, 1, 0, 0],
	"registered":true,
	"entityId": "c"
})

db.user.insert({
	"id":"c",
	"authId":"cauth"
})

db.apauth.insert({
    "id":"sauth",
    "username":"samael",
    "email":"s",
    "password":"s",
    "roles":["user"],
    "type":"user",
    "active":true,
    "registrationDate":[2016, 1, 1, 0, 0],
    "registered":true,
    "entityId": "s"
})

db.user.insert({
    "id":"s",
    "authId":"sauth"
})
