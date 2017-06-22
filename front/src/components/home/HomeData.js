import AppHelper from 'helpers/AppHelper'
import { BaseData } from 'ap-react-bootstrap'

let STATUS = {
    HOME_LOGIN: 0,
    HOME_REGISTER: 1
}

class HomeData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.onSwitchMode = this.onSwitchMode.bind(this)

		this.obj.state = {
			status: STATUS.HOME_LOGIN
		}
	}

	onSwitchMode() {
		this.setState({
			status: (this.getState('status') + 1) % Object.keys(STATUS).length
		})
	}

}
let HomeObj = new HomeData()
HomeObj.STATUS = STATUS
export default HomeObj
