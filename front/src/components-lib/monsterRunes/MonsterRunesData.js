import RuneHelper from 'helpers/RuneHelper'
import { BaseData } from 'ap-react-bootstrap'

class MonsterRunesData extends BaseData {

	register(obj, monster) {
		super.register(obj)

		this.buildRunesData()

		RuneHelper.register(this, this.buildRunesData.bind(this))

		RuneHelper.getMonsterRunes(monster.id)
	}

	unregister() {
		RuneHelper.unregister(this)
	}

	buildRunesData() {
		this.setState({
			runes: RuneHelper.getData() || {}
		})
	}
}
let MonsterRunesObj = new MonsterRunesData()
export default MonsterRunesObj
