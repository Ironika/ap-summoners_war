import { ActionBase } from 'ap-flux'
import { Utils } from 'ap-react-bootstrap'

var logout = new ActionBase({ name: 'LOGOUT' })
var navigate = new ActionBase({ name: 'NAVIGATE' })
var navigate_back = new ActionBase({ name: 'NAVIGATE_BACK' })
var set_app_display = new ActionBase({ name: 'SET_APP_DISPLAY' })
var put = new ActionBase({ name: 'PUT' })

logout.do = function() {
	return new Promise(function (resolve, reject) {
		resolve();
	});
}

navigate.do = function(args) {
	Utils.checkMembers(args, ['path']);
	return new Promise(function (resolve, reject) {
		resolve(args.path);
	});
}

navigate_back.do = function(args) {
	return new Promise(function (resolve, reject) {
		resolve();
	});
}

set_app_display.do = function(args) {
	Utils.checkMembers(args, ['path', 'value']);
	return new Promise(function (resolve, reject) {
		resolve({ path: args.path, value: args.value });
	});
}

put.do = function(args) {
	Utils.checkMembers(args, ['path', 'value']);
	return new Promise(function (resolve, reject) {
		resolve({ path: args.path, value: args.value });
	});
}

