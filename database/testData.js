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
	"id":"aaaa",
	"name":"Nuckers",
	"userId": "a"
})

db.build.insert({
	"id":"bbbb",
	"name":"Speeds",
	"userId": "a"
})

db.build.insert({
	"id":"cccc",
	"name":"Build3",
	"userId": "a"
})

db.build.insert({
	"id":"dddd",
	"name":"Build4",
	"userId": "a"
})

db.build.insert({
	"id":"eeee",
	"name":"Build5",
	"userId": "a"
})

db.build.insert({
	"id":"ffff",
	"name":"Build6",
	"userId": "a"
})