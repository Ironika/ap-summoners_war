import AppHelper from 'helpers/AppHelper'
import RuneHelper from 'helpers/RuneHelper'
import AuthHelper from 'helpers/AuthHelper'

import PosType from 'utils/constants/PosType'
import SetType from 'utils/constants/SetType'
import StatType from 'utils/constants/StatType'


import {Utils, BaseData}  from 'ap-react-bootstrap'

let SORT_ATTRIBUTE = {
    star: 'star',
    lvl: 'lvl'
}

let GROW_THRESHOLD = 50

/* This class was auto-generated by the JavaScriptWriter */
class RunesData extends BaseData {

	register(obj) {

        if(!AuthHelper.getEntityId()) {
            AppHelper.navigate("/")
        }
        
		super.register(obj)

        this.obj.onClickSetFilter = this.onClickSetFilter.bind(this)
        this.obj.onClickRuneStar = this.onClickRuneStar.bind(this)
        this.obj.onClickSort = this.onClickSort.bind(this)
        this.obj.onChangeMainStatFilter = this.onChangeMainStatFilter.bind(this)
        this.obj.onClickSubStatFilter = this.onClickSubStatFilter.bind(this)

        this.obj.onScroll = this.onScroll.bind(this)

        this.sorts = {}
        this.setFilter = {}
        this.hasSetFilter = false
        this.posFilter = {}
        this.hasPosFilter = false
        this.mainStatFilter = null
        this.subStatFilter = {}
        this.hasSubStatFilter = false

        this.statTypeValues = []
        this.statTypeValues.push('All')
        for(var i = 0; i < StatType.VALUES.length; i++) {
            this.statTypeValues.push(StatType.VALUES[i].key)
        }

        this.obj.state = {
            runes: [],
            threshold: GROW_THRESHOLD,
            statTypeValues: this.statTypeValues,
            setFilter: this.setFilter,
            subStatFilter : this.subStatFilter
        }

        this.buildDataRunes()		
	}
	unregister() {
	}

    buildDataRunes() {
        let runes = Utils.map(RuneHelper.getData())
        this.setState({runes: runes})
    }

	onClickSetFilter(key) {
        if(this.setFilter.hasOwnProperty(key))
            delete this.setFilter[key]
        else
            this.setFilter[key] = key

        this.hasSetFilter = false
        for (let item in this.setFilter) {
            if (this.setFilter.hasOwnProperty(item)) {
                if (this.setFilter[item]) {
                    this.hasSetFilter = true
                    break;
                }
            }
        }   

        let runes = Utils.map(RuneHelper.getData()).filter(this._filterRunes.bind(this)).sort(this._sortRunes.bind(this))
        this.setState({
            threshold: GROW_THRESHOLD,
            runes: runes, 
            setFilter: this.setFilter
        }) 
	}

    onClickRuneStar(key, value) {
        this.posFilter[key] = value

        this.hasPosFilter = false
        for (let key in this.posFilter) {
            if (this.posFilter.hasOwnProperty(key)) {
                if (this.posFilter[key]) {
                    this.hasPosFilter = true
                    break;
                }
            }
        }

        let runes = Utils.map(RuneHelper.getData()).filter(this._filterRunes.bind(this)).sort(this._sortRunes.bind(this))
        this.setState({
            threshold: GROW_THRESHOLD,
            runes: runes, 
            posFilter: this.posFilter
        })
    }

    onChangeMainStatFilter(event) {
        this.mainStatFilter = (this.mainStatFilter === event.target.value) ? null : event.target.value

        let runes = Utils.map(RuneHelper.getData())
        if(event.target.value != "All")
            runes = Utils.map(RuneHelper.getData()).filter(this._filterRunes.bind(this)).sort(this._sortRunes.bind(this))

        this.setState({
            threshold: GROW_THRESHOLD,
            runes: runes, 
            mainStatFilter: this.mainStatFilter
        })
    }

    onClickSubStatFilter(key) {
        if(this.subStatFilter.hasOwnProperty(key))
            delete this.subStatFilter[key]
        else
            this.subStatFilter[key] = key

        this.hasSubStatFilter = false
        for (let item in this.subStatFilter) {
            if (this.subStatFilter.hasOwnProperty(item)) {
                if (this.subStatFilter[item]) {
                    this.hasSubStatFilter = true
                    break;
                }
            }
        }

        let runes = Utils.map(RuneHelper.getData()).filter(this._filterRunes.bind(this)).sort(this._sortRunes.bind(this))
        this.setState({
            threshold: GROW_THRESHOLD,
            runes: runes, 
            subStatFilter: this.subStatFilter
        })
    }

    onClickSort(key) {
        let sorts = this.sorts
        sorts[key] = !sorts[key]
        let runes = Utils.map(RuneHelper.getData()).filter(this._filterRunes.bind(this)).sort(this._sortRunes.bind(this));
        this.setState({
            threshold: GROW_THRESHOLD,
            runes: runes
        })
    }

    onScroll() {
        let oH = this.obj.refs.list.offsetHeight
        let sH = this.obj.refs.list.scrollHeight
        let sT = this.obj.refs.list.scrollTop
        if (sT + oH >= sH - 1) {
            clearTimeout(this.growTimeout)
            this.growTimeout = setTimeout(this.setState.bind(this, {
                threshold: this.getState('threshold') + GROW_THRESHOLD
            }), 250)
        }
    }

    _sortRunes(r1, r2) {
        let sortAtts = Object.keys(SORT_ATTRIBUTE)
        for (let i = 0; i < sortAtts.length; i++) {
            let sortAtt = sortAtts[i]
            if (this.sorts[sortAtt]) {
                let s = r2[sortAtt] - r1[sortAtt]
                if (s) return s    
            }
        }
    }

    _runeHaveStatType(rune, statTypes) {
        let haveStatTypes = false
        let haveStatType = false

        for (let key in statTypes) {
            if(statTypes[key] == rune.subStatType)
                haveStatType = true
            if(statTypes[key] == rune.stat1Type)
                haveStatType = true
            if(statTypes[key] == rune.stat2Type)
                haveStatType = true
            if(statTypes[key] == rune.stat3Type)
                haveStatType = true
            if(statTypes[key] == rune.stat4Type)
                haveStatType = true 
        }

        if(haveStatType)
            haveStatTypes = true

        return haveStatTypes
    }

    _filterRunes(rune) {
        if (this.hasSetFilter && !this.setFilter[rune.set]) {
            return false
        }
        if (this.hasPosFilter && !this.posFilter[rune.pos]) {
            return false
        }
        if (this.mainStatFilter && rune.statMainType !== this.mainStatFilter) {
            return false
        }
        if (this.hasSubStatFilter && !this._runeHaveStatType(rune, this.subStatFilter)) {
            return false
        }
        return true
    }

}
var RunesObj = new RunesData()
RunesObj.SORT_ATTRIBUTE = SORT_ATTRIBUTE
export default RunesObj

