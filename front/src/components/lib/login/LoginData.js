import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import { BaseData } from 'ap-react-bootstrap'

class LoginData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.onSubmit = this.onSubmit.bind(this)

		this.obj.state = {
			username: '', 
			password: ''
		}
	}

	onSubmit() {
		AppHelper.setBusy(true).
		then(AuthHelper.getAuth.bind(AuthHelper, { username: this.getState('username'), password: this.getState('password') })).
		then(AppHelper.navigate.bind(AppHelper, 'profile')).
		then(AppHelper.setBusy.bind(AppHelper, false)).
		catch(AppHelper.setBusy.bind(AppHelper, false))
	}

}
var LoginObj = new LoginData()
export default LoginObj
