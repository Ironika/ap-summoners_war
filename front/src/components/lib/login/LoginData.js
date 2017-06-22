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
		AuthHelper.getAuth({ username: this.getState('username'), password: this.getState('password') }).
		then(AppHelper.navigate.bind(AppHelper, 'profile'))
	}

}
var LoginObj = new LoginData()
export default LoginObj
