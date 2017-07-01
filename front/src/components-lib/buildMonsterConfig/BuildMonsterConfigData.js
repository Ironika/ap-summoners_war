import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'

import StatType from 'utils/constants/StatType'
import SetType from 'utils/constants/SetType'
import {Utils, BaseData}  from 'ap-react-bootstrap'

/* This class was auto-generated by the JavaScriptWriter */
class BuildMonsterConfigData extends BaseData {

	register(obj) {
		super.register(obj)

		this.statTypeValues = []
        for(var i = 0; i < StatType.VALUES.length; i++) {
            this.statTypeValues.push(StatType.VALUES[i].key)
        }

        this.setTypeValues = []
        for(var i = 0; i < SetType.VALUES.length; i++) {
            this.setTypeValues.push(SetType.VALUES[i].key)
        }

        this.obj.onClickShow = this.onClickShow.bind(this)
        this.obj.onClickSubmit = this.onClickSubmit.bind(this)
        this.obj.onChangeInput = this.onChangeInput.bind(this)
        this.obj.onChangeSelect = this.onChangeSelect.bind(this)

		this.obj.state = {
            statTypeValues: this.statTypeValues,
            setTypeValues: this.setTypeValues,
            requiredStatIsOpen: false,
            notationStatIsOpen: false,
            setsIsOpen: false,

            monsterName: "",

            requiredStatSelect: "",
            requiredStatInput: "",
            requiredStats: [],

            notationStatSelect: "",
            notationStatInput: "",
            notationStats: [],

            setsSelect: "",
            sets: []
        }
	}

	onChangeInput(id, event) {
		if(id == 'requiredStat')
			this.setState({requiredStatInput: event.target.value})
		else if(id == 'notationStat')
			this.setState({notationStatInput: event.target.value})
		else
			this.setState({monsterName: event.target.value})
	}

	onChangeSelect(id, event) {
		if(id == 'requiredStat') {
			this.setState({requiredStatSelect: event.target.value})
		} else if(id == 'notationStat') {
			this.setState({notationStatSelect: event.target.value})
		} else {
			this.setState({setsSelect: event.target.value})
		}
	}

	onClickShow(id) {
		if(id == 'requiredStat')
			this.setState({requiredStatIsOpen: !this.getState('requiredStatIsOpen')})
		else if( id == 'notationStat')
			this.setState({notationStatIsOpen: !this.getState('notationStatIsOpen')})
		else
			this.setState({setsIsOpen: !this.getState('setsIsOpen')})
	}

	onClickSubmit(id) {
		if(id == 'requiredStat') {
			this.getState('requiredStats')[this.getState('requiredStatSelect')] = this.getState('requiredStatInput')
			this.setState({requiredStats: this.getState('requiredStats')})
		} else if(id == 'notationStat') {
			this.getState('notationStats')[this.getState('notationStatSelect')] = this.getState('notationStatInput')
			this.setState({notationStats: this.getState('notationStats')})
		} else {
			this.getState('sets')[this.getState('setsSelect')] = this.getState('setsSelect')
			this.setState({sets: this.getState('sets')})
		}

	}

	unregister() {
	}

}

var BuildMonsterConfigDataObj = new BuildMonsterConfigData();
export default BuildMonsterConfigDataObj;
