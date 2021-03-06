import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import BuildHelper from 'helpers/BuildHelper'
import BuildResultHelper from 'helpers/BuildResultHelper'
import TeamResultHelper from 'helpers/TeamResultHelper'
import MonsterResultHelper from 'helpers/MonsterResultHelper'

import StatType from 'utils/constants/StatType'
import BuildState from 'utils/constants/BuildState'
import {BaseData}  from 'ap-react-bootstrap'


/* This class was auto-generated by the JavaScriptWriter */
class BuildsData extends BaseData {

	register(obj) {
		if(!AuthHelper.getEntityId()) {
            AppHelper.navigate("/")
        }
		super.register(obj)

		let isExpanded = AppHelper.getData("/isExpanded")

		this.obj.state = {
			isExpanded: isExpanded
		}

		AppHelper.register('/isExpanded', this, this.isExpanded.bind(this))
	}

	isExpanded() {
		let isExpanded = AppHelper.getData("/isExpanded")
		this.setState({isExpanded: isExpanded})
	}

	unregister() {
		AppHelper.unregister(this)
	}


}
var BuildsObj = new BuildsData();
export default BuildsObj;
