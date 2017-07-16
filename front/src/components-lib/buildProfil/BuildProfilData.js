import { BaseData }  from 'ap-react-bootstrap'
import AppHelper from 'helpers/AppHelper'
import BuildResultHelper from 'helpers/BuildResultHelper'
import TeamResultHelper from 'helpers/TeamResultHelper'
import MonsterResultHelper from 'helpers/MonsterResultHelper'

class BuildProfilData extends BaseData {

    register(obj) {
        super.register(obj)

        this.obj.onClickConfig = this.onClickConfig.bind(this)
        this.obj.onClickResults = this.onClickResults.bind(this)

        this.obj.state = {
            currentPage: 'config',
            buildHaveResults: false,
            buildResults: {}
        }

        AppHelper.register('/currentBuild', this, this.onBuildChange.bind(this));
    }

    unregister() {
        AppHelper.unregister(this)
    }

    onBuildChange() {
        let build = AppHelper.getData('/currentBuild')

        let allResults = BuildResultHelper.getData()
        let teamResults = TeamResultHelper.getData()
        let monsterResults = MonsterResultHelper.getData()

        let buildHaveResults = false
        let buildResults = {}

        for (let key in allResults) {
            if (allResults[key].buildId == build.id) {
                buildHaveResults = true
                buildResults[key] = allResults[key]
                buildResults[key]['teamResults'] = {}
            }
        }

        if(buildHaveResults) {
            for (let key in teamResults) {
                buildResults[teamResults[key].buildResultId].teamResults[key] = teamResults[key]
                buildResults[teamResults[key].buildResultId].teamResults[key]['monsterResults'] = {}
            }

            for (let key in monsterResults)
                buildResults[teamResults[monsterResults[key].teamResultId].buildResultId].teamResults[monsterResults[key].teamResultId].monsterResults[key] = monsterResults[key]
            this.setState({buildHaveResults: buildHaveResults, buildResults: buildResults})
        }
        else 
            this.setState({buildHaveResults: buildHaveResults, currentPage: 'config', buildResults: buildResults})
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