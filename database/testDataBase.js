db.dropDatabase()

db.apmail.drop()
db.apmail.createIndex({"id": 1}, {"unique": true})

db.apauth.drop()
db.apauth.createIndex({"entityId": 1}, {"unique": true, "partialFilterExpression": { "entityId": { $exists: true } }})
db.apauth.createIndex({"id": 1}, {"unique": true})
db.apauth.createIndex({"email": 1}, {"unique": true})
db.apauth.createIndex({"username": 1}, {"unique": true})

db.user.drop()
db.user.createIndex({"id": 1}, {"unique": true})

db.monster.drop()
db.monster.createIndex({"id": 1}, {"unique": true})

db.build.drop()
db.build.createIndex({"id": 1}, {"unique": true})

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

db.apmail.insert({
	"id":"mail_auth_register",
	"subject":"{type} account registration",
	"content":"Hello {user},\n\nTo complete your registration enter the following code when prompted:\n\n {code}"
})

db.apmail.insert({
	"id":"mail_auth_changemail",
	"subject":"{type} email modification",
	"content":"Hello {user},\n\nTo confirm your email change enter the following code when prompted:\n\n {code}"
})

db.apmail.insert({
	"id":"mail_auth_confirmmail",
	"subject":"{type} email confirmation",
	"content":"Hello {user},\n\nTo confirm your email change enter the following code when prompted:\n\n {code}"
})

db.apmail.insert({
	"id":"mail_auth_recover",
	"subject":"{type} recover password",
	"content":"Hello {user},\n\nTo recover your password enter the following code when prompted:\n\n {code}"
})

