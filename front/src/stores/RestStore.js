import { Dispatcher, StoreBase } from 'ap-flux'
import { Utils } from 'ap-react-bootstrap'

var AuthStore = new StoreBase ({ name: 'AUTH_STORE', content: {} })
var ImageStore = new StoreBase ({ name: 'IMAGE_STORE', content: {} })
var RestStore = new StoreBase ({ name: 'REST_STORE', content: {} })

AuthStore.handleGetAuth = function(result, params) {
	let content = AuthStore.getContent()
	content.entityId = result.entityId
	content.username = result.username
	content.email = result.email
	content.type = result.type
	content.token = Utils.encode(params.username, params.password)
	AuthStore.storeToLocalStorage()
	AuthStore.notify()
}

AuthStore.handleLogout = function(result, params) {
	AuthStore.setContent({})
	AuthStore.removeFromLocalStorage()
	AuthStore.notify()
}

AuthStore.handlePutPassword = function(result, params) {
	let content = AuthStore.getContent()
	content.token = Utils.encode(content.username, params.data.password)
	AuthStore.storeToLocalStorage()
	AuthStore.notify()
}

ImageStore.handleGetImage = function(result, params) {
	var uarr = new Uint8Array(result.content);
	var strings = [], chunksize = 0xffff;
	var len = uarr.length;
	for (var i = 0; i * chunksize < len; i++){
		strings.push(String.fromCharCode.apply(null, uarr.subarray(i * chunksize, (i + 1) * chunksize)));
	}
	var btoaResult = btoa(strings.join(''))
	var source = 'data:' + result.type + ';base64,' + btoaResult
	let img = new Image();
	img.onload = function () {
		let content = ImageStore.getContent()
		content[params.id] = img
		ImageStore.notify();
	}
	img.src = source;
}

RestStore.handleLogout = function(results, params) {
	RestStore.setContent({});
}

RestStore.handleGetMonstersconfig = function(result, params) {
	let content = RestStore.getContent()
	if (!content.monsterConfig)
		content.monsterConfig = {};
	content.monsterConfig[result.id] = result;
	RestStore.notifyPath('/monsterConfig')
}

RestStore.handleGetBuilds = function(result, params) {
	let content = RestStore.getContent()
	content.build = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.build[result[i].id] = result[i];
	RestStore.notifyPath('/build')
}

RestStore.handleGetBuild = function(result, params) {
	let content = RestStore.getContent()
	if (!content.build)
		content.build = {};
	content.build[result.id] = result;
	RestStore.notifyPath('/build')
}

RestStore.handleGetBuildMonstersconfig = function(result, params) {
	let content = RestStore.getContent()
	content.monsterConfig = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.monsterConfig[result[i].id] = result[i];
	RestStore.notifyPath('/monsterConfig')
}

RestStore.handleGetRunes = function(result, params) {
	let content = RestStore.getContent()
	content.rune = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.rune[result[i].id] = result[i];
	RestStore.notifyPath('/rune')
}

RestStore.handleGetRune = function(result, params) {
	let content = RestStore.getContent()
	if (!content.rune)
		content.rune = {};
	content.rune[result.id] = result;
	RestStore.notifyPath('/rune')
}

RestStore.handleGetMonsters = function(result, params) {
	let content = RestStore.getContent()
	content.monster = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.monster[result[i].id] = result[i];
	RestStore.notifyPath('/monster')
}

RestStore.handleGetMonster = function(result, params) {
	let content = RestStore.getContent()
	if (!content.monster)
		content.monster = {};
	content.monster[result.id] = result;
	RestStore.notifyPath('/monster')
}

RestStore.handleGetMonsterRunes = function(result, params) {
	let content = RestStore.getContent()
	content.rune = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.rune[result[i].id] = result[i];
	RestStore.notifyPath('/rune')
}

RestStore.handleGetUser = function(result, params) {
	let content = RestStore.getContent()
	if (!content.user)
		content.user = {};
	content.user[result.id] = result;
	RestStore.notifyPath('/user')
}

RestStore.handleGetUserBuilds = function(result, params) {
	let content = RestStore.getContent()
	content.build = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.build[result[i].id] = result[i];
	RestStore.notifyPath('/build')
}

RestStore.handleGetUserRunes = function(result, params) {
	let content = RestStore.getContent()
	content.rune = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.rune[result[i].id] = result[i];
	RestStore.notifyPath('/rune')
}

RestStore.handleGetUserMonsters = function(result, params) {
	let content = RestStore.getContent()
	content.monster = {};
	if (result && result.length)
		for (var i = 0; i < result.length; i++)
			content.monster[result[i].id] = result[i];
	RestStore.notifyPath('/monster')
}

Dispatcher.register('GET_AUTH', AuthStore.handleGetAuth)
Dispatcher.register('LOGOUT', AuthStore.handleLogout)
Dispatcher.register('PUT_AUTH_PASSWORD', AuthStore.handlePutPassword)
Dispatcher.register('GET_IMAGE', ImageStore.handleGetImage)
Dispatcher.register('LOGOUT', RestStore.handleLogout)
Dispatcher.register('GET_MONSTERSCONFIG', RestStore.handleGetMonstersconfig)
Dispatcher.register('GET_BUILDS', RestStore.handleGetBuilds)
Dispatcher.register('GET_BUILD', RestStore.handleGetBuild)
Dispatcher.register('GET_BUILD_MONSTERSCONFIG', RestStore.handleGetBuildMonstersconfig)
Dispatcher.register('GET_RUNES', RestStore.handleGetRunes)
Dispatcher.register('GET_RUNE', RestStore.handleGetRune)
Dispatcher.register('GET_MONSTERS', RestStore.handleGetMonsters)
Dispatcher.register('GET_MONSTER', RestStore.handleGetMonster)
Dispatcher.register('GET_MONSTER_RUNES', RestStore.handleGetMonsterRunes)
Dispatcher.register('GET_USER', RestStore.handleGetUser)
Dispatcher.register('GET_USER_BUILDS', RestStore.handleGetUserBuilds)
Dispatcher.register('GET_USER_RUNES', RestStore.handleGetUserRunes)
Dispatcher.register('GET_USER_MONSTERS', RestStore.handleGetUserMonsters)
