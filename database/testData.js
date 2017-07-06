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
	"userId": "a",
	"monsterId": "b6fb477a-3bbb-4f98-b56b-8d5d9899ae5b",
	"notationAcc": NumberInt(20),
	"notationAtk": null,
	"notationCdmg": NumberInt(40),
	"notationCrate": null,
	"notationDef": null,
	"notationHp": NumberInt(100),
	"notationRes": NumberInt(80),
	"notationSpd": null,
	"requiredAcc": null,
	"requiredAtk": null,
	"requiredAtkFlat": null,
	"requiredCdmg": NumberInt(50),
	"requiredCrate": NumberInt(80),
	"requiredDef": null,
	"requiredDefFlat": null,
	"requiredHp": NumberInt(100),
	"requiredHpFlat": NumberInt(300),
	"requiredRes": null,
	"requiredSpd": NumberInt(300),
	"set1": "Focus",
	"set2": null,
	"set3": null
})

db.monsterConfig.insert({
	"id": "monsterConfig-bb",
	"buildId": "build-aa",
	"userId": "a",
	"monsterId": "2a9c5e1a-fca4-42a2-a1c4-5edae8473561",
	"notationAcc": null,
	"notationAtk": NumberInt(80),
	"notationAtkFlat": NumberInt(50),
	"notationCdmg": null,
	"notationCrate": NumberInt(30),
	"notationDef": null,
	"notationDefFlat": null,
	"notationHp": NumberInt(70),
	"notationHpFlat": null,
	"notationRes": NumberInt(80),
	"notationSpd": null,
	"requiredAcc": NumberInt(50),
	"requiredAtk": null,
	"requiredAtkFlat": null,
	"requiredCdmg": NumberInt(60),
	"requiredCrate": null,
	"requiredDef": null,
	"requiredDefFlat": null,
	"requiredHp": NumberInt(70),
	"requiredHpFlat": null,
	"requiredRes": null,
	"requiredSpd": NumberInt(90),
	"set1": "Energy",
	"set2": "Blade",
	"set3": null
})

db.monsterConfig.insert({
	"id": "monsterConfig-cc",
	"buildId": "build-aa",
	"userId": "a",
	"monsterId": "e39aeea9-ef0a-4b75-bf5a-2536fba865d6",
	"notationAcc": NumberInt(100),
	"notationAtk": null,
	"notationAtkFlat": null,
	"notationCdmg": NumberInt(10),
	"notationCrate": null,
	"notationDef": NumberInt(70),
	"notationDefFlat": NumberInt(40),
	"notationHp": null,
	"notationHpFlat": null,
	"notationRes": null,
	"notationSpd": NumberInt(30),
	"requiredAcc": NumberInt(50),
	"requiredAtk": null,
	"requiredAtkFlat": null,
	"requiredCdmg": NumberInt(50),
	"requiredCrate": null,
	"requiredDef": NumberInt(80),
	"requiredDefFlat": null,
	"requiredHp": NumberInt(100),
	"requiredHpFlat": null,
	"requiredRes": null,
	"requiredSpd": NumberInt(300),
	"set1": "Guard",
	"set2": "Vampire",
	"set3": null
})