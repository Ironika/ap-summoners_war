import AppHelper from 'helpers/AppHelper'
import UserHelper from 'helpers/UserHelper'
import MonsterHelper from 'helpers/MonsterHelper'
import RuneHelper from 'helpers/RuneHelper'
import AuthHelper from 'helpers/AuthHelper'

import { BaseData, MomentHelper } from 'ap-react-bootstrap'

class ProfileData extends BaseData {

	register(obj) {
        super.register(obj)

        if(!AuthHelper.getEntityId()) {
            AppHelper.navigate("/")
        }

        this.obj.onClick = this.onClick.bind(this)

        this.obj.state = {
            username: '', 
            email: '', 
            lastImport: '',
            monsters: 0,
            runes: 0, 
            builds: 0
        }

        this.buildDataUser()
        this.buildDataMonster()
        this.buildDataRune()
	}
	unregister() {
	}

	buildDataUser() {
        let username = UserHelper.getData(AuthHelper.getEntityId() + '/username')
        let email = UserHelper.getData(AuthHelper.getEntityId() + '/email')
        let lastImport = UserHelper.getData(AuthHelper.getEntityId() + '/lastImport')
		this.setState({
            username: username || '',
            email: email || '',
            lastImport: lastImport ? MomentHelper.localDateToHumanDate(lastImport) : ''
        })
	}
    buildDataMonster(id) {
        this.setState({
            monsters: (Object.keys(MonsterHelper.getData() || {})).length
        })
    }
    buildDataRune(id) {
        this.setState({
            runes: (Object.keys(RuneHelper.getData() || {})).length
        })
    }

	onClick() {
		UserHelper.putUser({
            username: this.getState('username'),
            email: this.getState('email')
        })
	}
}
let ProfileObj = new ProfileData()
export default ProfileObj
