import AppHelper from 'helpers/AppHelper'
import MonsterHelper from 'helpers/MonsterHelper'
import AuthHelper from 'helpers/AuthHelper'
import { BaseData, Utils }  from 'ap-react-bootstrap'

let SORT_ATTRIBUTE = {
    star: 'star',
    lvl: 'lvl'
}

let GROWING_INITIAL = 50;
let GROWING_THRESHOLD = 50;

class MonstersListData extends BaseData {

	register(obj) {
        super.register(obj)

        this.obj.onSearch = this.onSearch.bind(this)
        this.obj.onClickMonster = this.onClickMonster.bind(this)
		this.obj.onScroll = this.onScroll.bind(this)

        this.obj.onClickElementFilters = this.onClickElementFilters.bind(this)
        this.obj.onClickSort = this.onClickSort.bind(this)

        this.search = ''
        this.elementFilter = {}
        this.hasElementFilter = false
        this.sorts = {}

        this.obj.state = { 
            monsters: [],
            threshold: GROWING_INITIAL
        }

        this.buildMonstersData()
	}

	unregister() {
	}

    buildMonstersData() {
        let monsters = Utils.map(MonsterHelper.getData())
        this.monster = monsters.length ? monsters[0] : null
        if (this.monster) {
            AppHelper.put('/monster/' + this.monster.id, true)
            AppHelper.put('/currentMonster', this.monster)
        }
        this.setState({ 
            monsters: monsters,
            elementFilter: this.elementFilter 
        })
    }

    filterMonsters(monster) {
        if (this.hasElementFilter && !this.elementFilter[monster.elemType]) {
            return false
        }
        if (this.search && monster.name.toUpperCase().indexOf(this.search.toUpperCase()) === -1) {
            return false
        }
        return true        
    }

    sortMonsters(m1, m2) {
        let sortAtts = Object.keys(SORT_ATTRIBUTE)
        for (let i = 0; i < sortAtts.length; i++) {
            let sortAtt = sortAtts[i]
            if (this.sorts[sortAtt]) {
                let s = m2[sortAtt] - m1[sortAtt]
                if (s) return s    
            }
        }
    }

    onSearch(event) {
        this.search = event.target.value ? event.target.value.trimLeft() : ''
        let monsters = Utils.map(MonsterHelper.getData()).filter(this.filterMonsters.bind(this)).sort(this.sortMonsters.bind(this));
        this.setState({monsters: monsters})
    }

	onClickMonster(monster) {
        AppHelper.put('/monster/' + this.monster.id, false)
        this.monster = monster
        AppHelper.put('/monster/' + monster.id, true)
        AppHelper.put('/currentMonster', monster)
    }

	onClickElementFilters(key) {
        if(this.elementFilter.hasOwnProperty(key))
            delete this.elementFilter[key]
        else
            this.elementFilter[key] = key

        this.hasElementFilter = false
        for (let item in this.elementFilter) {
            if (this.elementFilter.hasOwnProperty(item)) {
                if (this.elementFilter[item]) {
                    this.hasElementFilter = true
                    break;
                }
            }
        }

        let monsters = Utils.map(MonsterHelper.getData()).filter(this.filterMonsters.bind(this)).sort(this.sortMonsters.bind(this));
        this.setState({
            threshold: GROWING_INITIAL,
            monsters: monsters, 
            elementFilter: this.elementFilter
        })
	}

	onClickSort(key) {
        let sorts = this.sorts
        sorts[key] = !sorts[key]
        let monsters = Utils.map(MonsterHelper.getData()).filter(this.filterMonsters.bind(this)).sort(this.sortMonsters.bind(this));
        this.setState({
            threshold: GROWING_INITIAL,
            monsters: monsters
        })
	}

    onScroll() {
        let oH = this.obj.refs.list.offsetHeight
        let sH = this.obj.refs.list.scrollHeight
        let sT = this.obj.refs.list.scrollTop
        if (sT + oH >= sH - 1) {
            clearTimeout(this.growTimeout)
            this.growTimeout = setTimeout(this.setState.bind(this, {
                threshold: this.getState('threshold') + GROWING_THRESHOLD
            }), 250)
        }
    }
}
let MonstersListObj = new MonstersListData()
MonstersListObj.SORT_ATTRIBUTE = SORT_ATTRIBUTE
MonstersListObj.GROWING_INITIAL = GROWING_INITIAL
export default MonstersListObj
