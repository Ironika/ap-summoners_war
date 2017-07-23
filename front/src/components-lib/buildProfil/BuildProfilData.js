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
        this.obj.onClickExpand = this.onClickExpand.bind(this)

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
                let buildResult = buildResults[teamResults[key].buildResultId]
                if (buildResult) {
                    buildResult.teamResults[key] = teamResults[key]
                    buildResult.teamResults[key]['monsterResults'] = {}
                }
            }

            for (let key in monsterResults) {
                let buildResult = buildResults[teamResults[monsterResults[key].teamResultId].buildResultId]
                if (buildResult)
                    buildResult.teamResults[monsterResults[key].teamResultId].monsterResults[key] = monsterResults[key]
            }
            this.setState({buildHaveResults: buildHaveResults, buildResults: buildResults})
        }
        else 
            this.setState({buildHaveResults: buildHaveResults, currentPage: 'config', buildResults: buildResults})
    }

    onClickExpand() {
        AppHelper.put('/isExpanded', !AppHelper.getData("/isExpanded"))
        this.setState()
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