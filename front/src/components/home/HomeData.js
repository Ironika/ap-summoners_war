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

		this.setState({
			status: STATUS.HOME_LOGIN
		})
	}

	onSwitchMode() {
		this.setState({
			status: (this.getState('status') + 1) % 2
		})
	}

}
let HomeObj = new HomeData()
HomeObj.STATUS = STATUS
export default HomeObj
