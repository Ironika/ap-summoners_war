import AppHelper from 'helpers/AppHelper'
import UserHelper from 'helpers/UserHelper'
import AuthHelper from 'helpers/AuthHelper'
import { Dispatcher } from 'ap-flux'

let STATUS = {
    REGISTER_INITIAL: 0,
    REGISTER_CHECK: 1
}

class RegisterData {

	register(obj) {
		this.obj = obj

		this.obj.onChange = this.onChange.bind(this)
        this.obj.onSubmit = this.onSubmit.bind(this)
        this.obj.onSubmitCheck = this.onSubmitCheck.bind(this)

        this.setState({
            status: STATUS.REGISTER_INITIAL,
            username: '',
            password: '',
            email: '',
            token: ''
        })
	}
	unregister() {

    }
    setState(arg) {
        this.obj.setState(arg || this)
    }
    getState(arg) {
        return arg ? this.obj.state[arg] : this.obj.state
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

	onChange(id, event) {
        let data = {}
        data[id] = event.target.value
        this.setState(data)
	}
}
let RegisterObj = new RegisterData()
RegisterObj.STATUS = STATUS
export default RegisterObj
    