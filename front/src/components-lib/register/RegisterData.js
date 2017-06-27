import AppHelper from 'helpers/AppHelper'
import UserHelper from 'helpers/UserHelper'
import AuthHelper from 'helpers/AuthHelper'
import { BaseData } from 'ap-react-bootstrap'

let STATUS = {
    REGISTER_INITIAL: 0,
    REGISTER_CHECK: 1
}

class RegisterData extends BaseData {

	register(obj) {
		super.register(obj)

        this.obj.onSubmit = this.onSubmit.bind(this)
        this.obj.onSubmitCheck = this.onSubmitCheck.bind(this)

        this.obj.state = {
            status: STATUS.REGISTER_INITIAL,
            username: '',
            password: '',
            email: '',
            token: ''
        }
	}

	onSubmit() {
        this.setState({ error: 'Please wait..' })
		UserHelper.postUser({
            username: this.getState('username'),
            password: this.getState('password'),
            email: this.getState('email')
        }).
        then(this.setState.bind(this, { status: STATUS.REGISTER_CHECK, error: '' })).
        catch(this.setState.bind(this, { error: 'Something went wrong' }))
	}

    onSubmitCheck() {
        this.setState({ error: 'Please wait..' })
        AuthHelper.postAuthRegister({
            username: this.getState('username'),
            token: this.getState('token')
        }).
        then(AuthHelper.getAuth.bind(AuthHelper, {
            username: this.getState('username'),
            password: this.getState('password')        
        })).
        then(AppHelper.navigate.bind(AppHelper, 'profile')).
        catch(this.setState.bind(this, { error: 'Email confirmation failed' }))
    }
}
let RegisterObj = new RegisterData()
RegisterObj.STATUS = STATUS
export default RegisterObj
    