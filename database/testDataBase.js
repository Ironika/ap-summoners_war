db.dropDatabase()

db.apauth.drop()
db.apauth.createIndex({"entityId": 1}, {"unique": true, "partialFilterExpression": { "entityId": { $exists: true } }})
db.apauth.createIndex({"id": 1}, {"unique": true})
db.apauth.createIndex({"username": 1}, {"unique": true})

db.user.drop()
db.user.createIndex({"id": 1}, {"unique": true})

db.monster.drop()
db.monster.createIndex({"id": 1}, {"unique": true})

db.rune.drop()
db.rune.createIndex({"id": 1}, {"unique": true})

db.apauth.insert({
	"id":"useradmin",
	"username":"admin",
	"email":"admin",
	"password":"admin",
	"roles":["admin"],
	"type":"admin",
	"active":true,
	"registrationDate":[2016, 1, 1, 0, 0],
	"registered":true
})

db.apauth.insert({
	"id":"userguest",
	"username":"guest",
	"email":"guest",
	"password":"guest",
	"roles":[],
	"type":"guest",
	"active":true,
	"registrationDate":[2016, 1, 1, 0, 0],
	"registered":true
})

