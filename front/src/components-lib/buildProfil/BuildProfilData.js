import { BaseData }  from 'ap-react-bootstrap'
import AppHelper from 'helpers/AppHelper'

class BuildProfilData extends BaseData {

    register(obj) {
        super.register(obj)

        this.obj.onClickConfig = this.onClickConfig.bind(this)
        this.obj.onClickResults = this.onClickResults.bind(this)

        this.obj.state = {
            currentPage: 'config',
            buildHaveResults: false,
        }

        AppHelper.register('/currentBuild', this, this.onBuildChange.bind(this));
    }

    unregister() {
        AppHelper.unregister(this)
    }

    onBuildChange() {
        // let monster = AppHelper.getData('/currentMonster')
        // let runes = []

        // let allRunes = RuneHelper.getData()
        // let monsterHaveRunes = false
        // for (let key in allRunes) {
        //     if (allRunes[key].monsterId == monster.id) {
        //         runes.push(allRunes[key])
        //         monsterHaveRunes = true
        //     }
        // }

        // if(monsterHaveRunes)
        //     this.setState({ monster: monster, monsterHaveRunes: monsterHaveRunes, runes: runes})
        // else 
        //     this.setState({ monster: monster, monsterHaveRunes: monsterHaveRunes, currentPage: 'infos', runes: runes})
    }

    onClickConfig() {
        this.setState({ currentPage: 'config' })
    }

    onClickResults() {
        this.setState({ currentPage: 'results' })
    }
}
let BuildProfilDataObj = new BuildProfilData()
export default BuildProfilDataObj