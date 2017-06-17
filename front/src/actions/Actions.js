import { ActionBase } from 'ap-flux';
import { Utils, RestService } from 'ap-react-bootstrap';

let get_auth = new ActionBase({ name: 'GET_AUTH' });
let put_auth_password = new ActionBase({ name: 'PUT_AUTH_PASSWORD' });
let get_runes = new ActionBase({ name: 'GET_RUNES' });
let post_rune = new ActionBase({ name: 'POST_RUNE' });
let get_rune = new ActionBase({ name: 'GET_RUNE' });
let put_rune = new ActionBase({ name: 'PUT_RUNE' });
let delete_rune = new ActionBase({ name: 'DELETE_RUNE' });
let get_monsters = new ActionBase({ name: 'GET_MONSTERS' });
let post_monster = new ActionBase({ name: 'POST_MONSTER' });
let get_monster = new ActionBase({ name: 'GET_MONSTER' });
let put_monster = new ActionBase({ name: 'PUT_MONSTER' });
let delete_monster = new ActionBase({ name: 'DELETE_MONSTER' });
let get_monster_runes = new ActionBase({ name: 'GET_MONSTER_RUNES' });
let get_user = new ActionBase({ name: 'GET_USER' });
let post_user = new ActionBase({ name: 'POST_USER' });
let put_user = new ActionBase({ name: 'PUT_USER' });
let delete_user = new ActionBase({ name: 'DELETE_USER' });
let get_user_runes = new ActionBase({ name: 'GET_USER_RUNES' });
let get_user_monsters = new ActionBase({ name: 'GET_USER_MONSTERS' });
let post_user_import = new ActionBase({ name: 'POST_USER_IMPORT' });

get_auth.do = function(args) {
	Utils.checkMembers(args, ['username', 'password']);
	var reqParam = {
		method: 'GET',
		url: '/auth',
		token : Utils.encode(args.username, args.password)
	};
	return RestService._request(reqParam);
}

put_auth_password.do = function(args) {
	Utils.checkMembers(args, ['data', 'token']);
	var reqParam = {
		method: 'PUT',
		url: '/auth/password',
		token : args.token,
		data: args.data
	};
	return RestService._request(reqParam);
}

get_runes.do = function(args) {
	Utils.checkMembers(args, ['token']);
	var reqParam = {
		method: 'GET',
		url: '/runes',
		token : args.token,
	};
	return RestService._request(reqParam);
}

post_rune.do = function(args) {
	Utils.checkMembers(args, ['token', 'data']);
	var reqParam = {
		method: 'POST',
		url: '/runes',
		data : args.data,
		token : args.token,
	};
	return RestService._request(reqParam);
}

get_rune.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'GET',
		url: '/runes/' + args.id + '',
		token : args.token,
	};
	return RestService._request(reqParam);
}

put_rune.do = function(args) {
	Utils.checkMembers(args, ['token', 'id', 'data']);
	var reqParam = {
		method: 'PUT',
		url: '/runes/' + args.id + '',
		data : args.data,
		token : args.token,
	};
	return RestService._request(reqParam);
}

delete_rune.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'DELETE',
		url: '/runes/' + args.id + '',
		token : args.token,
	};
	return RestService._request(reqParam);
}

get_monsters.do = function(args) {
	Utils.checkMembers(args, ['token']);
	var reqParam = {
		method: 'GET',
		url: '/monsters',
		token : args.token,
	};
	return RestService._request(reqParam);
}

post_monster.do = function(args) {
	Utils.checkMembers(args, ['token', 'data']);
	var reqParam = {
		method: 'POST',
		url: '/monsters',
		data : args.data,
		token : args.token,
	};
	return RestService._request(reqParam);
}

get_monster.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'GET',
		url: '/monsters/' + args.id + '',
		token : args.token,
	};
	return RestService._request(reqParam);
}

put_monster.do = function(args) {
	Utils.checkMembers(args, ['token', 'id', 'data']);
	var reqParam = {
		method: 'PUT',
		url: '/monsters/' + args.id + '',
		data : args.data,
		token : args.token,
	};
	return RestService._request(reqParam);
}

delete_monster.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'DELETE',
		url: '/monsters/' + args.id + '',
		token : args.token,
	};
	return RestService._request(reqParam);
}

get_monster_runes.do = function(args) {
	Utils.checkMembers(args, ['token', 'monster']);
	var reqParam = {
		method: 'GET',
		url: '/monsters/' + args.monster + '/runes',
		token : args.token,
	};
	return RestService._request(reqParam);
}

get_user.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'GET',
		url: '/user/' + args.id + '',
		token : args.token,
	};
	return RestService._request(reqParam);
}

post_user.do = function(args) {
	Utils.checkMembers(args, ['token', 'data']);
	var reqParam = {
		method: 'POST',
		url: '/user',
		data : args.data,
		token : args.token,
	};
	return RestService._request(reqParam);
}

put_user.do = function(args) {
	Utils.checkMembers(args, ['token', 'id', 'data']);
	var reqParam = {
		method: 'PUT',
		url: '/user/' + args.id + '',
		data : args.data,
		token : args.token,
	};
	return RestService._request(reqParam);
}

delete_user.do = function(args) {
	Utils.checkMembers(args, ['token', 'id']);
	var reqParam = {
		method: 'DELETE',
		url: '/user/' + args.id + '',
		token : args.token,
	};
	return RestService._request(reqParam);
}

get_user_runes.do = function(args) {
	Utils.checkMembers(args, ['token', 'user']);
	var reqParam = {
		method: 'GET',
		url: '/user/' + args.user + '/runes',
		token : args.token,
	};
	return RestService._request(reqParam);
}

get_user_monsters.do = function(args) {
	Utils.checkMembers(args, ['token', 'user']);
	var reqParam = {
		method: 'GET',
		url: '/user/' + args.user + '/monsters',
		token : args.token,
	};
	return RestService._request(reqParam);
}

post_user_import.do = function(args) {
	Utils.checkMembers(args, ['token', 'data']);
	var reqParam = {
		method: 'POST',
		url: '/user/import',
		data : args.data,
		token : args.token,
	};
	return RestService._request(reqParam);
}

