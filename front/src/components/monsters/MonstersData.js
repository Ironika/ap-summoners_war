import AppHelper from 'helpers/AppHelper'
import MonsterHelper from 'helpers/MonsterHelper'
import AuthHelper from 'helpers/AuthHelper'
import { BaseData, Utils }  from 'ap-react-bootstrap'


class MonstersData extends BaseData {

	register(obj) {
		if(!AuthHelper.getEntityId()) {
            AppHelper.navigate("/")
        }
        super.register(obj)
	}

	unregister() {
	}

    
}
let MonstersObj = new MonstersData()
export default MonstersObj
