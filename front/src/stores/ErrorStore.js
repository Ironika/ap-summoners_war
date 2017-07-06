import { Dispatcher, StoreBase } from 'ap-flux'

var ErrorStore = new StoreBase ({ name: 'ERROR_STORE', content: {} })

ErrorStore.handleLogout = function(results, params) {
	ErrorStore.setContent({});
}

ErrorStore.handleGetMonstersconfigSuccess = function(results, params) {
	delete ErrorStore._content.GET_MONSTERSCONFIG;
	ErrorStore.notifyPath('/GET_MONSTERSCONFIG');
}

ErrorStore.handleGetMonstersconfigError = function(error, params) {
	ErrorStore._content.GET_MONSTERSCONFIG = error;
	ErrorStore.notifyPath('/GET_MONSTERSCONFIG');
}

ErrorStore.handlePostMonstersconfigSuccess = function(results, params) {
	delete ErrorStore._content.POST_MONSTERSCONFIG;
	ErrorStore.notifyPath('/POST_MONSTERSCONFIG');
}

ErrorStore.handlePostMonstersconfigError = function(error, params) {
	ErrorStore._content.POST_MONSTERSCONFIG = error;
	ErrorStore.notifyPath('/POST_MONSTERSCONFIG');
}

ErrorStore.handlePutMonstersconfigSuccess = function(results, params) {
	delete ErrorStore._content.PUT_MONSTERSCONFIG;
	ErrorStore.notifyPath('/PUT_MONSTERSCONFIG');
}

ErrorStore.handlePutMonstersconfigError = function(error, params) {
	ErrorStore._content.PUT_MONSTERSCONFIG = error;
	ErrorStore.notifyPath('/PUT_MONSTERSCONFIG');
}

ErrorStore.handleDeleteMonstersconfigSuccess = function(results, params) {
	delete ErrorStore._content.DELETE_MONSTERSCONFIG;
	ErrorStore.notifyPath('/DELETE_MONSTERSCONFIG');
}

ErrorStore.handleDeleteMonstersconfigError = function(error, params) {
	ErrorStore._content.DELETE_MONSTERSCONFIG = error;
	ErrorStore.notifyPath('/DELETE_MONSTERSCONFIG');
}

ErrorStore.handleGetBuildsSuccess = function(results, params) {
	delete ErrorStore._content.GET_BUILDS;
	ErrorStore.notifyPath('/GET_BUILDS');
}

ErrorStore.handleGetBuildsError = function(error, params) {
	ErrorStore._content.GET_BUILDS = error;
	ErrorStore.notifyPath('/GET_BUILDS');
}

ErrorStore.handlePostBuildSuccess = function(results, params) {
	delete ErrorStore._content.POST_BUILD;
	ErrorStore.notifyPath('/POST_BUILD');
}

ErrorStore.handlePostBuildError = function(error, params) {
	ErrorStore._content.POST_BUILD = error;
	ErrorStore.notifyPath('/POST_BUILD');
}

ErrorStore.handleGetBuildSuccess = function(results, params) {
	delete ErrorStore._content.GET_BUILD;
	ErrorStore.notifyPath('/GET_BUILD');
}

ErrorStore.handleGetBuildError = function(error, params) {
	ErrorStore._content.GET_BUILD = error;
	ErrorStore.notifyPath('/GET_BUILD');
}

ErrorStore.handlePutBuildSuccess = function(results, params) {
	delete ErrorStore._content.PUT_BUILD;
	ErrorStore.notifyPath('/PUT_BUILD');
}

ErrorStore.handlePutBuildError = function(error, params) {
	ErrorStore._content.PUT_BUILD = error;
	ErrorStore.notifyPath('/PUT_BUILD');
}

ErrorStore.handleDeleteBuildSuccess = function(results, params) {
	delete ErrorStore._content.DELETE_BUILD;
	ErrorStore.notifyPath('/DELETE_BUILD');
}

ErrorStore.handleDeleteBuildError = function(error, params) {
	ErrorStore._content.DELETE_BUILD = error;
	ErrorStore.notifyPath('/DELETE_BUILD');
}

ErrorStore.handleGetBuildMonstersconfigSuccess = function(results, params) {
	delete ErrorStore._content.GET_BUILD_MONSTERSCONFIG;
	ErrorStore.notifyPath('/GET_BUILD_MONSTERSCONFIG');
}

ErrorStore.handleGetBuildMonstersconfigError = function(error, params) {
	ErrorStore._content.GET_BUILD_MONSTERSCONFIG = error;
	ErrorStore.notifyPath('/GET_BUILD_MONSTERSCONFIG');
}

ErrorStore.handleGetRunesSuccess = function(results, params) {
	delete ErrorStore._content.GET_RUNES;
	ErrorStore.notifyPath('/GET_RUNES');
}

ErrorStore.handleGetRunesError = function(error, params) {
	ErrorStore._content.GET_RUNES = error;
	ErrorStore.notifyPath('/GET_RUNES');
}

ErrorStore.handlePostRuneSuccess = function(results, params) {
	delete ErrorStore._content.POST_RUNE;
	ErrorStore.notifyPath('/POST_RUNE');
}

ErrorStore.handlePostRuneError = function(error, params) {
	ErrorStore._content.POST_RUNE = error;
	ErrorStore.notifyPath('/POST_RUNE');
}

ErrorStore.handleGetRuneSuccess = function(results, params) {
	delete ErrorStore._content.GET_RUNE;
	ErrorStore.notifyPath('/GET_RUNE');
}

ErrorStore.handleGetRuneError = function(error, params) {
	ErrorStore._content.GET_RUNE = error;
	ErrorStore.notifyPath('/GET_RUNE');
}

ErrorStore.handlePutRuneSuccess = function(results, params) {
	delete ErrorStore._content.PUT_RUNE;
	ErrorStore.notifyPath('/PUT_RUNE');
}

ErrorStore.handlePutRuneError = function(error, params) {
	ErrorStore._content.PUT_RUNE = error;
	ErrorStore.notifyPath('/PUT_RUNE');
}

ErrorStore.handleDeleteRuneSuccess = function(results, params) {
	delete ErrorStore._content.DELETE_RUNE;
	ErrorStore.notifyPath('/DELETE_RUNE');
}

ErrorStore.handleDeleteRuneError = function(error, params) {
	ErrorStore._content.DELETE_RUNE = error;
	ErrorStore.notifyPath('/DELETE_RUNE');
}

ErrorStore.handleGetMonstersSuccess = function(results, params) {
	delete ErrorStore._content.GET_MONSTERS;
	ErrorStore.notifyPath('/GET_MONSTERS');
}

ErrorStore.handleGetMonstersError = function(error, params) {
	ErrorStore._content.GET_MONSTERS = error;
	ErrorStore.notifyPath('/GET_MONSTERS');
}

ErrorStore.handlePostMonsterSuccess = function(results, params) {
	delete ErrorStore._content.POST_MONSTER;
	ErrorStore.notifyPath('/POST_MONSTER');
}

ErrorStore.handlePostMonsterError = function(error, params) {
	ErrorStore._content.POST_MONSTER = error;
	ErrorStore.notifyPath('/POST_MONSTER');
}

ErrorStore.handleGetMonsterSuccess = function(results, params) {
	delete ErrorStore._content.GET_MONSTER;
	ErrorStore.notifyPath('/GET_MONSTER');
}

ErrorStore.handleGetMonsterError = function(error, params) {
	ErrorStore._content.GET_MONSTER = error;
	ErrorStore.notifyPath('/GET_MONSTER');
}

ErrorStore.handlePutMonsterSuccess = function(results, params) {
	delete ErrorStore._content.PUT_MONSTER;
	ErrorStore.notifyPath('/PUT_MONSTER');
}

ErrorStore.handlePutMonsterError = function(error, params) {
	ErrorStore._content.PUT_MONSTER = error;
	ErrorStore.notifyPath('/PUT_MONSTER');
}

ErrorStore.handleDeleteMonsterSuccess = function(results, params) {
	delete ErrorStore._content.DELETE_MONSTER;
	ErrorStore.notifyPath('/DELETE_MONSTER');
}

ErrorStore.handleDeleteMonsterError = function(error, params) {
	ErrorStore._content.DELETE_MONSTER = error;
	ErrorStore.notifyPath('/DELETE_MONSTER');
}

ErrorStore.handleGetMonsterRunesSuccess = function(results, params) {
	delete ErrorStore._content.GET_MONSTER_RUNES;
	ErrorStore.notifyPath('/GET_MONSTER_RUNES');
}

ErrorStore.handleGetMonsterRunesError = function(error, params) {
	ErrorStore._content.GET_MONSTER_RUNES = error;
	ErrorStore.notifyPath('/GET_MONSTER_RUNES');
}

ErrorStore.handleGetUserSuccess = function(results, params) {
	delete ErrorStore._content.GET_USER;
	ErrorStore.notifyPath('/GET_USER');
}

ErrorStore.handleGetUserError = function(error, params) {
	ErrorStore._content.GET_USER = error;
	ErrorStore.notifyPath('/GET_USER');
}

ErrorStore.handlePostUserSuccess = function(results, params) {
	delete ErrorStore._content.POST_USER;
	ErrorStore.notifyPath('/POST_USER');
}

ErrorStore.handlePostUserError = function(error, params) {
	ErrorStore._content.POST_USER = error;
	ErrorStore.notifyPath('/POST_USER');
}

ErrorStore.handleDeleteUserSuccess = function(results, params) {
	delete ErrorStore._content.DELETE_USER;
	ErrorStore.notifyPath('/DELETE_USER');
}

ErrorStore.handleDeleteUserError = function(error, params) {
	ErrorStore._content.DELETE_USER = error;
	ErrorStore.notifyPath('/DELETE_USER');
}

ErrorStore.handlePutUserSuccess = function(results, params) {
	delete ErrorStore._content.PUT_USER;
	ErrorStore.notifyPath('/PUT_USER');
}

ErrorStore.handlePutUserError = function(error, params) {
	ErrorStore._content.PUT_USER = error;
	ErrorStore.notifyPath('/PUT_USER');
}

ErrorStore.handleGetUserBuildsSuccess = function(results, params) {
	delete ErrorStore._content.GET_USER_BUILDS;
	ErrorStore.notifyPath('/GET_USER_BUILDS');
}

ErrorStore.handleGetUserBuildsError = function(error, params) {
	ErrorStore._content.GET_USER_BUILDS = error;
	ErrorStore.notifyPath('/GET_USER_BUILDS');
}

ErrorStore.handleDeleteUserBuildsSuccess = function(results, params) {
	delete ErrorStore._content.DELETE_USER_BUILDS;
	ErrorStore.notifyPath('/DELETE_USER_BUILDS');
}

ErrorStore.handleDeleteUserBuildsError = function(error, params) {
	ErrorStore._content.DELETE_USER_BUILDS = error;
	ErrorStore.notifyPath('/DELETE_USER_BUILDS');
}

ErrorStore.handleGetUserRunesSuccess = function(results, params) {
	delete ErrorStore._content.GET_USER_RUNES;
	ErrorStore.notifyPath('/GET_USER_RUNES');
}

ErrorStore.handleGetUserRunesError = function(error, params) {
	ErrorStore._content.GET_USER_RUNES = error;
	ErrorStore.notifyPath('/GET_USER_RUNES');
}

ErrorStore.handleDeleteUserRunesSuccess = function(results, params) {
	delete ErrorStore._content.DELETE_USER_RUNES;
	ErrorStore.notifyPath('/DELETE_USER_RUNES');
}

ErrorStore.handleDeleteUserRunesError = function(error, params) {
	ErrorStore._content.DELETE_USER_RUNES = error;
	ErrorStore.notifyPath('/DELETE_USER_RUNES');
}

ErrorStore.handleGetUserMonstersSuccess = function(results, params) {
	delete ErrorStore._content.GET_USER_MONSTERS;
	ErrorStore.notifyPath('/GET_USER_MONSTERS');
}

ErrorStore.handleGetUserMonstersError = function(error, params) {
	ErrorStore._content.GET_USER_MONSTERS = error;
	ErrorStore.notifyPath('/GET_USER_MONSTERS');
}

ErrorStore.handleDeleteUserMonsterRunesSuccess = function(results, params) {
	delete ErrorStore._content.DELETE_USER_MONSTER_RUNES;
	ErrorStore.notifyPath('/DELETE_USER_MONSTER_RUNES');
}

ErrorStore.handleDeleteUserMonsterRunesError = function(error, params) {
	ErrorStore._content.DELETE_USER_MONSTER_RUNES = error;
	ErrorStore.notifyPath('/DELETE_USER_MONSTER_RUNES');
}

ErrorStore.handleGetUserMonstersconfigSuccess = function(results, params) {
	delete ErrorStore._content.GET_USER_MONSTERSCONFIG;
	ErrorStore.notifyPath('/GET_USER_MONSTERSCONFIG');
}

ErrorStore.handleGetUserMonstersconfigError = function(error, params) {
	ErrorStore._content.GET_USER_MONSTERSCONFIG = error;
	ErrorStore.notifyPath('/GET_USER_MONSTERSCONFIG');
}

ErrorStore.handlePostUserImportSuccess = function(results, params) {
	delete ErrorStore._content.POST_USER_IMPORT;
	ErrorStore.notifyPath('/POST_USER_IMPORT');
}

ErrorStore.handlePostUserImportError = function(error, params) {
	ErrorStore._content.POST_USER_IMPORT = error;
	ErrorStore.notifyPath('/POST_USER_IMPORT');
}

ErrorStore.handleGetAuthSuccess = function(results, params) {
	delete ErrorStore._content.GET_AUTH;
	ErrorStore.notifyPath('/GET_AUTH');
}

ErrorStore.handleGetAuthError = function(error, params) {
	ErrorStore._content.GET_AUTH = error;
	ErrorStore.notifyPath('/GET_AUTH');
}

ErrorStore.handlePutAuthPasswordSuccess = function(results, params) {
	delete ErrorStore._content.PUT_AUTH_PASSWORD;
	ErrorStore.notifyPath('/PUT_AUTH_PASSWORD');
}

ErrorStore.handlePutAuthPasswordError = function(error, params) {
	ErrorStore._content.PUT_AUTH_PASSWORD = error;
	ErrorStore.notifyPath('/PUT_AUTH_PASSWORD');
}

ErrorStore.handlePostAuthRegisterSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_REGISTER;
	ErrorStore.notifyPath('/POST_AUTH_REGISTER');
}

ErrorStore.handlePostAuthRegisterError = function(error, params) {
	ErrorStore._content.POST_AUTH_REGISTER = error;
	ErrorStore.notifyPath('/POST_AUTH_REGISTER');
}

ErrorStore.handlePostAuthRecoverSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_RECOVER;
	ErrorStore.notifyPath('/POST_AUTH_RECOVER');
}

ErrorStore.handlePostAuthRecoverError = function(error, params) {
	ErrorStore._content.POST_AUTH_RECOVER = error;
	ErrorStore.notifyPath('/POST_AUTH_RECOVER');
}

ErrorStore.handlePostAuthRecoverCheckSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_RECOVER_CHECK;
	ErrorStore.notifyPath('/POST_AUTH_RECOVER_CHECK');
}

ErrorStore.handlePostAuthRecoverCheckError = function(error, params) {
	ErrorStore._content.POST_AUTH_RECOVER_CHECK = error;
	ErrorStore.notifyPath('/POST_AUTH_RECOVER_CHECK');
}

ErrorStore.handlePutAuthRecoverSuccess = function(results, params) {
	delete ErrorStore._content.PUT_AUTH_RECOVER;
	ErrorStore.notifyPath('/PUT_AUTH_RECOVER');
}

ErrorStore.handlePutAuthRecoverError = function(error, params) {
	ErrorStore._content.PUT_AUTH_RECOVER = error;
	ErrorStore.notifyPath('/PUT_AUTH_RECOVER');
}

ErrorStore.handlePostAuthChangemailSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_CHANGEMAIL;
	ErrorStore.notifyPath('/POST_AUTH_CHANGEMAIL');
}

ErrorStore.handlePostAuthChangemailError = function(error, params) {
	ErrorStore._content.POST_AUTH_CHANGEMAIL = error;
	ErrorStore.notifyPath('/POST_AUTH_CHANGEMAIL');
}

ErrorStore.handlePostAuthChangemailCheckSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_CHANGEMAIL_CHECK;
	ErrorStore.notifyPath('/POST_AUTH_CHANGEMAIL_CHECK');
}

ErrorStore.handlePostAuthChangemailCheckError = function(error, params) {
	ErrorStore._content.POST_AUTH_CHANGEMAIL_CHECK = error;
	ErrorStore.notifyPath('/POST_AUTH_CHANGEMAIL_CHECK');
}

ErrorStore.handlePostAuthChangemailSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_CHANGEMAIL;
	ErrorStore.notifyPath('/POST_AUTH_CHANGEMAIL');
}

ErrorStore.handlePostAuthChangemailError = function(error, params) {
	ErrorStore._content.POST_AUTH_CHANGEMAIL = error;
	ErrorStore.notifyPath('/POST_AUTH_CHANGEMAIL');
}

ErrorStore.handlePostAuthChangemailConfirmSuccess = function(results, params) {
	delete ErrorStore._content.POST_AUTH_CHANGEMAIL_CONFIRM;
	ErrorStore.notifyPath('/POST_AUTH_CHANGEMAIL_CONFIRM');
}

ErrorStore.handlePostAuthChangemailConfirmError = function(error, params) {
	ErrorStore._content.POST_AUTH_CHANGEMAIL_CONFIRM = error;
	ErrorStore.notifyPath('/POST_AUTH_CHANGEMAIL_CONFIRM');
}

ErrorStore.handleGetImageSuccess = function(results, params) {
	delete ErrorStore._content.GET_IMAGE;
	ErrorStore.notifyPath('/GET_IMAGE');
}

ErrorStore.handleGetImageError = function(error, params) {
	ErrorStore._content.GET_IMAGE = error;
	ErrorStore.notifyPath('/GET_IMAGE');
}

ErrorStore.handlePostImageSuccess = function(results, params) {
	delete ErrorStore._content.POST_IMAGE;
	ErrorStore.notifyPath('/POST_IMAGE');
}

ErrorStore.handlePostImageError = function(error, params) {
	ErrorStore._content.POST_IMAGE = error;
	ErrorStore.notifyPath('/POST_IMAGE');
}

Dispatcher.register('LOGOUT', ErrorStore.handleLogout)
Dispatcher.register('GET_MONSTERSCONFIG', ErrorStore.handleGetMonstersconfigSuccess, ErrorStore.handleGetMonstersconfigError)
Dispatcher.register('POST_MONSTERSCONFIG', ErrorStore.handlePostMonstersconfigSuccess, ErrorStore.handlePostMonstersconfigError)
Dispatcher.register('PUT_MONSTERSCONFIG', ErrorStore.handlePutMonstersconfigSuccess, ErrorStore.handlePutMonstersconfigError)
Dispatcher.register('DELETE_MONSTERSCONFIG', ErrorStore.handleDeleteMonstersconfigSuccess, ErrorStore.handleDeleteMonstersconfigError)
Dispatcher.register('GET_BUILDS', ErrorStore.handleGetBuildsSuccess, ErrorStore.handleGetBuildsError)
Dispatcher.register('POST_BUILD', ErrorStore.handlePostBuildSuccess, ErrorStore.handlePostBuildError)
Dispatcher.register('GET_BUILD', ErrorStore.handleGetBuildSuccess, ErrorStore.handleGetBuildError)
Dispatcher.register('PUT_BUILD', ErrorStore.handlePutBuildSuccess, ErrorStore.handlePutBuildError)
Dispatcher.register('DELETE_BUILD', ErrorStore.handleDeleteBuildSuccess, ErrorStore.handleDeleteBuildError)
Dispatcher.register('GET_BUILD_MONSTERSCONFIG', ErrorStore.handleGetBuildMonstersconfigSuccess, ErrorStore.handleGetBuildMonstersconfigError)
Dispatcher.register('GET_RUNES', ErrorStore.handleGetRunesSuccess, ErrorStore.handleGetRunesError)
Dispatcher.register('POST_RUNE', ErrorStore.handlePostRuneSuccess, ErrorStore.handlePostRuneError)
Dispatcher.register('GET_RUNE', ErrorStore.handleGetRuneSuccess, ErrorStore.handleGetRuneError)
Dispatcher.register('PUT_RUNE', ErrorStore.handlePutRuneSuccess, ErrorStore.handlePutRuneError)
Dispatcher.register('DELETE_RUNE', ErrorStore.handleDeleteRuneSuccess, ErrorStore.handleDeleteRuneError)
Dispatcher.register('GET_MONSTERS', ErrorStore.handleGetMonstersSuccess, ErrorStore.handleGetMonstersError)
Dispatcher.register('POST_MONSTER', ErrorStore.handlePostMonsterSuccess, ErrorStore.handlePostMonsterError)
Dispatcher.register('GET_MONSTER', ErrorStore.handleGetMonsterSuccess, ErrorStore.handleGetMonsterError)
Dispatcher.register('PUT_MONSTER', ErrorStore.handlePutMonsterSuccess, ErrorStore.handlePutMonsterError)
Dispatcher.register('DELETE_MONSTER', ErrorStore.handleDeleteMonsterSuccess, ErrorStore.handleDeleteMonsterError)
Dispatcher.register('GET_MONSTER_RUNES', ErrorStore.handleGetMonsterRunesSuccess, ErrorStore.handleGetMonsterRunesError)
Dispatcher.register('GET_USER', ErrorStore.handleGetUserSuccess, ErrorStore.handleGetUserError)
Dispatcher.register('POST_USER', ErrorStore.handlePostUserSuccess, ErrorStore.handlePostUserError)
Dispatcher.register('DELETE_USER', ErrorStore.handleDeleteUserSuccess, ErrorStore.handleDeleteUserError)
Dispatcher.register('PUT_USER', ErrorStore.handlePutUserSuccess, ErrorStore.handlePutUserError)
Dispatcher.register('GET_USER_BUILDS', ErrorStore.handleGetUserBuildsSuccess, ErrorStore.handleGetUserBuildsError)
Dispatcher.register('DELETE_USER_BUILDS', ErrorStore.handleDeleteUserBuildsSuccess, ErrorStore.handleDeleteUserBuildsError)
Dispatcher.register('GET_USER_RUNES', ErrorStore.handleGetUserRunesSuccess, ErrorStore.handleGetUserRunesError)
Dispatcher.register('DELETE_USER_RUNES', ErrorStore.handleDeleteUserRunesSuccess, ErrorStore.handleDeleteUserRunesError)
Dispatcher.register('GET_USER_MONSTERS', ErrorStore.handleGetUserMonstersSuccess, ErrorStore.handleGetUserMonstersError)
Dispatcher.register('DELETE_USER_MONSTER_RUNES', ErrorStore.handleDeleteUserMonsterRunesSuccess, ErrorStore.handleDeleteUserMonsterRunesError)
Dispatcher.register('GET_USER_MONSTERSCONFIG', ErrorStore.handleGetUserMonstersconfigSuccess, ErrorStore.handleGetUserMonstersconfigError)
Dispatcher.register('POST_USER_IMPORT', ErrorStore.handlePostUserImportSuccess, ErrorStore.handlePostUserImportError)
Dispatcher.register('GET_AUTH', ErrorStore.handleGetAuthSuccess, ErrorStore.handleGetAuthError)
Dispatcher.register('PUT_AUTH_PASSWORD', ErrorStore.handlePutAuthPasswordSuccess, ErrorStore.handlePutAuthPasswordError)
Dispatcher.register('POST_AUTH_REGISTER', ErrorStore.handlePostAuthRegisterSuccess, ErrorStore.handlePostAuthRegisterError)
Dispatcher.register('POST_AUTH_RECOVER', ErrorStore.handlePostAuthRecoverSuccess, ErrorStore.handlePostAuthRecoverError)
Dispatcher.register('POST_AUTH_RECOVER_CHECK', ErrorStore.handlePostAuthRecoverCheckSuccess, ErrorStore.handlePostAuthRecoverCheckError)
Dispatcher.register('PUT_AUTH_RECOVER', ErrorStore.handlePutAuthRecoverSuccess, ErrorStore.handlePutAuthRecoverError)
Dispatcher.register('POST_AUTH_CHANGEMAIL', ErrorStore.handlePostAuthChangemailSuccess, ErrorStore.handlePostAuthChangemailError)
Dispatcher.register('POST_AUTH_CHANGEMAIL_CHECK', ErrorStore.handlePostAuthChangemailCheckSuccess, ErrorStore.handlePostAuthChangemailCheckError)
Dispatcher.register('POST_AUTH_CHANGEMAIL', ErrorStore.handlePostAuthChangemailSuccess, ErrorStore.handlePostAuthChangemailError)
Dispatcher.register('POST_AUTH_CHANGEMAIL_CONFIRM', ErrorStore.handlePostAuthChangemailConfirmSuccess, ErrorStore.handlePostAuthChangemailConfirmError)
Dispatcher.register('GET_IMAGE', ErrorStore.handleGetImageSuccess, ErrorStore.handleGetImageError)
Dispatcher.register('POST_IMAGE', ErrorStore.handlePostImageSuccess, ErrorStore.handlePostImageError)
