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

class MonstersListData extends BaseData {

	register(obj) {
        super.register(obj)

        this.obj.onSearch = this.onSearch.bind(this)
        this.obj.onClickMonster = this.onClickMonster.bind(this)
		
        this.obj.onClickElementFilters = this.onClickElementFilters.bind(this)
        this.obj.onClickSort = this.onClickSort.bind(this)

        this.search = ''
        this.elementFilter = null
        this.sorts = {}

        this.obj.state = {
            monsters: [],
            monster: {}
        }

        MonsterHelper.register(this, this.buildMonstersData.bind(this))
        AppHelper.setBusy(true).then(
		    MonsterHelper.getUserMonsters(AuthHelper.getEntityId()).then(
                AppHelper.setBusy.bind(AppHelper, false)
            )
        ).catch(AppHelper.setBusy.bind(AppHelper, false))
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
        if (this.elementFilter && monster.elemType !== this.elementFilter) {
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
        AppHelper.put('/monster', monster)
		//this.setState({ monster: monster })
	}

	onClickElementFilters(key) {
        this.elementFilter = (this.elementFilter === key) ? null : key
        let monsters = Utils.map(MonsterHelper.getData()).filter(this.filterMonsters.bind(this)).sort(this.sortMonsters.bind(this));
        this.setState({monsters: monsters, elementFilter: this.elementFilter})
	}

	onClickSort(key) {
        let sorts = this.sorts
        sorts[key] = !sorts[key]
        let monsters = Utils.map(MonsterHelper.getData()).filter(this.filterMonsters.bind(this)).sort(this.sortMonsters.bind(this));
        this.setState({monsters: monsters})
	}
}
let MonstersListObj = new MonstersListData()
MonstersListObj.FILTER_ELEMENT = FILTER_ELEMENT
MonstersListObj.SORT_ATTRIBUTE = SORT_ATTRIBUTE
export default MonstersListObj
