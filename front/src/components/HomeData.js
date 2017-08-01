import AppHelper from 'helpers/AppHelper'
import { BaseData } from 'ap-react-bootstrap'
import AuthHelper from 'helpers/AuthHelper';


let STATUS = {
    HOME_LOGIN: 0,
    HOME_REGISTER: 1
}

class HomeData extends BaseData {

    register(obj) {
        if(AuthHelper.getEntityId()) {
            AppHelper.navigate("/profile")
        }
        
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
