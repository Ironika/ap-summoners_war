import { Dispatcher, StoreRegistry } from 'ap-flux'
import AuthHelper from 'helpers/AuthHelper'

/* This class was auto-generated by the JavaScriptWriter */
class BuildHelper {

	register(obj, callback) {
		StoreRegistry.register('REST_STORE/build', obj, callback);
	}

	unregister(obj) {
		StoreRegistry.unregister('REST_STORE', obj);
	}

	getBuilds() {
		return Dispatcher.issue('GET_BUILDS', {token: AuthHelper.getToken()});
	}

	postBuild(data) {
		return Dispatcher.issue('POST_BUILD', {token: AuthHelper.getToken(), data: data});
	}

	getBuild(buildId) {
		return Dispatcher.issue('GET_BUILD', {token: AuthHelper.getToken(), buildId: buildId});
	}

	putBuild(data) {
		return Dispatcher.issue('PUT_BUILD', {token: AuthHelper.getToken(), buildId: data.id, data: data});
	}

	deleteBuild(buildId) {
		return Dispatcher.issue('DELETE_BUILD', {token: AuthHelper.getToken(), buildId: buildId});
	}

	getUserBuilds(userId) {
		return Dispatcher.issue('GET_USER_BUILDS', {token: AuthHelper.getToken(), userId: userId});
	}

	deleteUserBuilds(userId) {
		return Dispatcher.issue('DELETE_USER_BUILDS', {token: AuthHelper.getToken(), userId: userId});
	}

	getData(id) {
		return StoreRegistry.getStore('REST_STORE').getData('/build' + (id ? '/' + id : ''));
	}

}
var BuildObj = new BuildHelper()
export default BuildObj
