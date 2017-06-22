import AppHelper from 'helpers/AppHelper'
import MonsterHelper from 'helpers/MonsterHelper'
import AuthHelper from 'helpers/AuthHelper'
import { Utils }  from 'ap-react-bootstrap'

class MonstersData {

	register(obj) {
		this.obj = obj
		MonsterHelper.register(this, this.buildData.bind(this))
		MonsterHelper.getUserMonsters(AuthHelper.getEntityId())
		this.init()
	}

	unregister() {
		MonsterHelper.unregister(this)
	}

	onClickMonster(monster) {
		this.obj.setState({monster: monster});
	}

	onClickRunes() {
		this.obj.setState({currentPage: 'runes'})
	}

	onClickInfos() {
		this.obj.setState({currentPage: 'infos'})
	}

	onClickElementFilters(id) {
		this.elementFilters[id] = !this.elementFilters[id]
		let datas = []
		let count = 0

		for (let filter in this.elementFilters)
			if(this.elementFilters[filter])
				for (let monster in this.monsters)
					if(this.monsters[monster].elemType == filter) {
						datas.push(this.monsters[monster])
						count++
					}

		if (count == 0)
			datas = this.monsters;

		this.obj.setState({monsters: datas, elementFilters: this.elementFilters})
	}

	onClickSort(key) {
		let datas = []

		this.sorts[key] = !this.sorts[key]

		for (let item in this.obj.state.monsters) {
			datas.push(this.obj.state.monsters[item])
		}

		if(this.sorts[key]) {
			datas.sort(function(a, b) {
				return b[key] - a[key];
			})
		} else {
			datas.sort(function(a, b) {
				return a[key] - b[key];
			})
		}

		this.obj.setState({monsters: datas, sorts: this.sorts})
	}

	buildData() {
		this.monsters = MonsterHelper.getData()
		this.monster = this.monsters[Object.keys(this.monsters)[0]]
		this.obj.setState({monsters: this.monsters, monster: this.monster})
	}

	init() {
		this.elementFilters = {
			Water: false,
			Fire: false,
			Wind: false,
			Light: false,
			Dark: false,
		}
		this.sorts = {
			star: false,
			lvl: false
		}

		this.monster = {}
		this.currentPage = 'infos'

		this.obj.setState({
			monster: this.monster,
			currentPage: this.currentPage,
			elementFilters: this.elementFilters,
			sorts: this.sorts,

			onClickMonster: this.onClickMonster.bind(this), 
			onClickInfos: this.onClickInfos.bind(this),
			onClickRunes: this.onClickRunes.bind(this),
			onClickElementFilters: this.onClickElementFilters.bind(this),
			onClickSort: this.onClickSort.bind(this)
		})
	}

}
var MonstersObj = new MonstersData();
export default MonstersObj;
