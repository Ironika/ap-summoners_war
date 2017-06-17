import AppHelper from 'helpers/AppHelper';
import MonsterHelper from 'helpers/MonsterHelper';
import AuthHelper from 'helpers/AuthHelper';

/* This class was auto-generated by the JavaScriptWriter */
class MonstersData {

	register(obj) {
		this.obj = obj
		MonsterHelper.register(this, this.buildData.bind(this))
		MonsterHelper.getUserMonsters(AuthHelper.getEntityId())
		this.init()
	}

	unregister() {
	}

	onClickMonster(monster) {
		this.obj.setState({monster: monster});
	}

	onClickRune() {
		this.obj.setState({currentPage: 'runes'})
	}

	onClickInfos() {
		this.obj.setState({currentPage: 'infos'})
	}

	buildData() {
		this.monsters = MonsterHelper.getData()
		this.monster = this.monsters[Object.keys(this.monsters)[0]]
		this.obj.setState({monsters: this.monsters, monster: this.monster})
	}

	init() {
		this.monster = {}
		this.currentPage = 'infos'
		this.onClickMonster = this.onClickMonster.bind(this)

		this.obj.setState({
			onClickMonster: this.onClickMonster, 
			monster: this.monster,
			currentPage: this.currentPage,
			onClickInfos: this.onClickInfos.bind(this),
			onClickRune: this.onClickRune.bind(this)
		})
	}

}
var MonstersObj = new MonstersData();
export default MonstersObj;