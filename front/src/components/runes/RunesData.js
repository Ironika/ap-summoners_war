import AppHelper from 'helpers/AppHelper';
import RuneHelper from 'helpers/RuneHelper';
import AuthHelper from 'helpers/AuthHelper';
import {Utils, BaseData}  from 'ap-react-bootstrap';

let RUNE_SET = {
    Energy: 'Energy',
    Swift: 'Swift',
    Fatal: 'Fatal',
    Rage: 'Rage',
    Vampire: 'Vampire',
    Focus: 'Focus',
    Guard: 'Guard',
    Shield: 'Shield',
    Revenge: 'Revenge',
    Will: 'Will',
    Nemesis: 'Nemesis',
    Destroy: 'Destroy',
    Despair: 'Despair',
    Violent: 'Violent',
    Fight: 'Fight',
    Endure: 'Endure',
    Determination: 'Determination',
    Enhance: 'Enhance',
    Accuracy: 'Accuracy',
    Tolerance: 'Tolerance'
}
let RUNE_POS = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6
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

        this.obj.state = {
            runes: {},
            filterSet: {},           
            filterPos: {}
        }

		RuneHelper.register(this, this.buildDataRunes.bind(this))
		RuneHelper.getUserRunes(AuthHelper.getEntityId())
		
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
        Utils.forEach(RUNE_SET, function(type) {
            if (this.getState('filterSet')[type]) {
                this.allSet = false
            }
        }.bind(this))

        this.allPos = true
        Utils.forEach(RUNE_POS, function(type) {
            if (this.getState('filterPos')[type]) {
                this.allPos = false
            }
        }.bind(this))

        let runes = Utils.filter(RuneHelper.getData(), this._filterRune.bind(this))

        this.setState({ runes: runes })
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
RunesObj.RUNE_SET = RUNE_SET
export default RunesObj

