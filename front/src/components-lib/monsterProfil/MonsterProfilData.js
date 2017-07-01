import { BaseData }  from 'ap-react-bootstrap'
import AppHelper from 'helpers/AppHelper'
import RuneHelper from 'helpers/RuneHelper'

class MonsterProfilData extends BaseData {

    register(obj) {
        super.register(obj)

        this.obj.onClickInfos = this.onClickInfos.bind(this)
        this.obj.onClickRunes = this.onClickRunes.bind(this)

        this.obj.state = {
            currentPage: 'infos',
            monsterHaveRunes: false,
            monster: {},
            runes: []
        }

        AppHelper.register('/currentMonster', this, this.onMonsterChange.bind(this));
    }

    unregister() {
        AppHelper.unregister(this)
    }

    onMonsterChange() {
        let monster = AppHelper.getData('/currentMonster')
        let runes = []

        let allRunes = RuneHelper.getData()
        let monsterHaveRunes = false
        for (let key in allRunes) {
            if (allRunes[key].monsterId == monster.id) {
                runes.push(allRunes[key])
                monsterHaveRunes = true
            }
        }

        if(monsterHaveRunes)
            this.setState({ monster: monster, monsterHaveRunes: monsterHaveRunes, runes: runes})
        else 
            this.setState({ monster: monster, monsterHaveRunes: monsterHaveRunes, currentPage: 'infos', runes: runes})
    }

    onClickRunes() {
        this.setState({ currentPage: 'runes' })
    }

    onClickInfos() {
        this.setState({ currentPage: 'infos' })
    }
}
let MonsterProfilObj = new MonsterProfilData()
export default MonsterProfilObj