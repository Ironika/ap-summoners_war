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
        this.hasSort = false
        this.hasSearch = false

        this.obj.state = { 
            threshold: GROWING_INITIAL,
            elementFilter: this.elementFilter,
            monsters: this.buildMonstersData() 
        }
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
        return monsters
    }

    filterMonsters(monster) {
        if ((!this.hasElementFilter || this.elementFilter[monster.elemType]) && monster.name.toUpperCase().indexOf(this.search.toUpperCase()) >= 0) {
            return true
        }
        return false        
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
        
        this.checkFilterSort()
        this.applyFiltersSorts()
    }

	onClickMonster(monster) {
        AppHelper.put('/monster/' + this.monster.id, false)
        this.monster = monster
        AppHelper.put('/monster/' + monster.id, true)
        AppHelper.put('/currentMonster', monster)
    }

    applyFiltersSorts() {
        let monsters = Utils.map(MonsterHelper.getData())
        if(this.hasElementFilter || this.hasSearch)
            monsters = monsters.filter(this.filterMonsters.bind(this));
        if(this.hasSort)
            monsters = monsters.sort(this.sortMonsters.bind(this))
        this.setState({
            threshold: GROWING_INITIAL,
            monsters: monsters, 
            elementFilter: this.elementFilter
        })
    }

    checkFilterSort() {

        if (this.search == '')
            this.hasSearch = false
        else
            this.hasSearch = true
        
        this.hasElementFilter = false
        for (let item in this.elementFilter) {
            if (this.elementFilter.hasOwnProperty(item)) {
                if (this.elementFilter[item]) {
                    this.hasElementFilter = true
                    break;
                }
            }
        }

        this.hasSort = false
        for (let item in this.sorts) {
            if (this.sorts.hasOwnProperty(item)) {
                if (this.sorts[item]) {
                    this.hasSort = true
                    break;
                }
            }
        }
    }

	onClickElementFilters(key) {
        if(this.elementFilter.hasOwnProperty(key))
            delete this.elementFilter[key]
        else
            this.elementFilter[key] = key

        this.checkFilterSort()
        this.applyFiltersSorts()
	}

	onClickSort(key) {
        this.sorts[key] = !this.sorts[key]
        this.checkFilterSort()
        this.applyFiltersSorts()
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
