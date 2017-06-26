import { BaseData }  from 'ap-react-bootstrap'
import AppHelper from 'helpers/AppHelper'

class MonsterProfilData extends BaseData {

    register(obj) {
        super.register(obj)

        this.obj.onClickInfos = this.onClickInfos.bind(this)
        this.obj.onClickRunes = this.onClickRunes.bind(this)

        this.obj.state = {
            currentPage: 'infos',
            monster: {}
        }

        AppHelper.register('/monster', this, this.onMonsterChange.bind(this));
    }

    unregister() {
        
    }

    onMonsterChange() {
        let monster = AppHelper.getData('/monster')
        this.setState({ monster: monster })
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