import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import UserHelper from 'helpers/UserHelper'
import MonsterHelper from 'helpers/MonsterHelper'
import RuneHelper from 'helpers/RuneHelper'
import BuildHelper from 'helpers/BuildHelper'
import { BaseData } from 'ap-react-bootstrap'

class LoginData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.onSubmit = this.onSubmit.bind(this)

		this.obj.state = {
			username: '', 
			password: '',
			error: ''
		}
	}

	onSubmit() {
		AppHelper.setBusy(true).
		then(AuthHelper.getAuth.bind(AuthHelper, { username: this.getState('username'), password: this.getState('password') })).
		then(function () {
			let promises = []
			promises.push(UserHelper.getUser(AuthHelper.getEntityId()))
			promises.push(MonsterHelper.getUserMonsters(AuthHelper.getEntityId()))
			promises.push(RuneHelper.getUserRunes(AuthHelper.getEntityId()))
			promises.push(BuildHelper.getUserBuilds(AuthHelper.getEntityId()))
			return Promise.all(promises)
		}).
		then(AppHelper.navigate.bind(AppHelper, 'profile')).
		then(AppHelper.setBusy.bind(AppHelper, false)).
		catch(function() {
			this.setState({error: "An error has occured !"})
			AppHelper.setBusy(false)
		}.bind(this))
	}

}
var LoginObj = new LoginData()
export default LoginObj
