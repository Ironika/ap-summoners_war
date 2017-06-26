import AppHelper from 'helpers/AppHelper'
import RuneHelper from 'helpers/RuneHelper'
import AuthHelper from 'helpers/AuthHelper'

import PosType from 'utils/constants/PosType'
import SetType from 'utils/constants/SetType'

import {Utils, BaseData}  from 'ap-react-bootstrap'

let SORT_ATTRIBUTE = {
    star: 'star',
    lvl: 'lvl'
}

/* This class was auto-generated by the JavaScriptWriter */
class RunesData extends BaseData {

	register(obj) {

        if(!AuthHelper.getEntityId()) {
            AppHelper.navigate("/")
        }
        
		super.register(obj)

        this.obj.onClickFilterSet = this.onClickFilterSet.bind(this)
        this.obj.onClickFilterPos = this.onClickFilterPos.bind(this)
        this.obj.onClickSort = this.onClickSort.bind(this)
        this.obj.sortRunes = this.sortRunes.bind(this)

        this.obj.state = {
            runes: {},
            filterSet: {},           
            filterPos: {},
            sorts: {}
        }

		RuneHelper.register(this, this.buildDataRunes.bind(this))

        AppHelper.setBusy(true).then(
            RuneHelper.getUserRunes(AuthHelper.getEntityId()).then(
                AppHelper.setBusy.bind(AppHelper, false)
            )
        ).catch(AppHelper.setBusy.bind(AppHelper, false))
		
	}
	unregister() {
		RuneHelper.unregister(this)
	}

	onClickFilterSet(filterId) {
		this.getState('filterSet')[filterId] = !this.getState('filterSet')[filterId] 
        this.buildDataRunes()
	}

    onClickFilterPos(filterId) {
        this.getState('filterPos')[filterId] = !this.getState('filterPos')[filterId] 
        this.buildDataRunes()
    }

    buildDataRunes() {
        this.allSet = true
        SetType.VALUES.forEach(function(type) {
            if (this.getState('filterSet')[type.key]) {
                this.allSet = false
            }
        }.bind(this))

        this.allPos = true
        PosType.VALUES.forEach(function(type) {
            if (this.getState('filterPos')[type.key]) {
                this.allPos = false
            }
        }.bind(this))

        let runes = Utils.filter(RuneHelper.getData(), this._filterRune.bind(this))

        this.setState({ runes: runes })
    }

    onClickSort(key) {
        let sorts = this.getState('sorts')
        sorts[key] = !sorts[key]
        this.setState({ sorts: sorts })
    }

    sortRunes(r1, r2) {
        let sortAtts = Object.keys(SORT_ATTRIBUTE)
        let sorts = this.getState('sorts')
        for (let i = 0; i < sortAtts.length; i++) {
            let sortAtt = sortAtts[i]
            if (sorts[sortAtt]) {
                let s = r2[sortAtt] - r1[sortAtt]
                if (s) return s
            }
        }
    }

    _filterRune(rune, index) {
        if (!this.allSet) {
            if (!this.getState('filterSet')[rune.set]) {
                return false
            }
        }
        if (!this.allPos) {
            if (!this.getState('filterPos')[rune.pos]) {
                return false
            }   
        }
        return true
    }

}
var RunesObj = new RunesData()
RunesObj.SORT_ATTRIBUTE = SORT_ATTRIBUTE
export default RunesObj

