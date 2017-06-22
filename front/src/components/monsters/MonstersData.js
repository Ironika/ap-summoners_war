import AppHelper from 'helpers/AppHelper'
import MonsterHelper from 'helpers/MonsterHelper'
import AuthHelper from 'helpers/AuthHelper'
import { BaseData, Utils }  from 'ap-react-bootstrap'

let FILTER_ELEMENT = {
    Water: 'Water',
    Fire: 'Fire',
    Wind: 'Wind',
    Light: 'Light',
    Dark: 'Dark'
}

let SORT_ATTRIBUTE = {
    star: 'star',
    lvl: 'lvl'
}

class MonstersData extends BaseData {

	register(obj) {
		if(!AuthHelper.getEntityId()) {
            AppHelper.navigate("/")
        }

        super.register(obj)

        this.obj.filterMonsters = this.filterMonsters.bind(this)
        this.obj.sortMonsters = this.sortMonsters.bind(this)

        this.obj.onSearch = this.onSearch.bind(this)
        this.obj.onClickMonster = this.onClickMonster.bind(this)
        this.obj.onClickInfos = this.onClickInfos.bind(this)
        this.obj.onClickRunes = this.onClickRunes.bind(this)
		
        this.obj.onClickElementFilters = this.onClickElementFilters.bind(this)
        this.obj.onClickSort = this.onClickSort.bind(this)

        this.obj.state = {
            search: '',
            currentPage: 'infos',
            monsters: [],
            monster: {},
            elementFilter: null,
            sorts: {}
        }

        MonsterHelper.register(this, this.buildMonstersData.bind(this))
		MonsterHelper.getUserMonsters(AuthHelper.getEntityId())
	}

	unregister() {
		MonsterHelper.unregister(this)
	}

    buildMonstersData() {
        let monsters = Utils.map(MonsterHelper.getData())
        let monster = monsters.length ? monsters[0] : null
        this.setState({
            monsters: monsters, 
            monster: monster
        })
    }

    filterMonsters(monster) {
        if (this.getState('elementFilter') && monster.elemType !== this.getState('elementFilter')) {
            return false
        }
        if (this.getState('search') && monster.name.toUpperCase().indexOf(this.getState('search').toUpperCase()) === -1) {
            return false
        }
        return true        
    }

    sortMonsters(m1, m2) {
        let sortAtts = Object.keys(SORT_ATTRIBUTE)
        let sorts = this.getState('sorts')
        for (let i = 0; i < sortAtts.length; i++) {
            let sortAtt = sortAtts[i]
            if (sorts[sortAtt]) {
                let s = m2[sortAtt] - m1[sortAtt]
                if (s) return s    
            }
        }
    }

    onSearch(event) {
        this.setState({ search: event.target.value ? event.target.value.trimLeft() : '' })
    }

	onClickMonster(monster) {
		this.setState({ monster: monster })
	}

	onClickRunes() {
		this.setState({ currentPage: 'runes' })
	}

	onClickInfos() {
		this.setState({ currentPage: 'infos' })
	}

	onClickElementFilters(key) {
        this.setState({
            elementFilter: (this.getState('elementFilter') === key) ? null : key
        })
	}

	onClickSort(key) {
        let sorts = this.getState('sorts')
        sorts[key] = !sorts[key]
        this.setState({ sorts: sorts })
	}
}
let MonstersObj = new MonstersData()
MonstersObj.FILTER_ELEMENT = FILTER_ELEMENT
MonstersObj.SORT_ATTRIBUTE = SORT_ATTRIBUTE
export default MonstersObj
