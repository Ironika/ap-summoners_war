import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
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
