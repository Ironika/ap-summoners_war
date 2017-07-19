import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import BuildHelper from 'helpers/BuildHelper'
import MonsterConfigHelper from 'helpers/MonsterConfigHelper'

import {Utils, BaseData}  from 'ap-react-bootstrap'

/* This class was auto-generated by the JavaScriptWriter */
class BuildsListData extends BaseData {
	register(obj) {
		super.register(obj)

		this.obj.onClickAddBuild = this.onClickAddBuild.bind(this)
		this.obj.onClickBuild = this.onClickBuild.bind(this)
        this.obj.onClickDelete = this.onClickDelete.bind(this)

		this.obj.state = {  
			builds: [],
			build: {}
		}

        this._buildBuildsData()
        BuildHelper.register(this, this._buildBuildsData.bind(this))
	}

    unregister() {
        BuildHelper.unregister(this)
    }

    onClickDelete(buildId) {
        BuildHelper.deleteBuild(buildId).
        then(function(result) {
            let promises = []
            let storeMonstersConfig = AppHelper.getData('/monstersConfig')
            for(let key in storeMonstersConfig)
                if (buildId == storeMonstersConfig[key].buildId) {
                    promises.push(MonsterConfigHelper.deleteMonstersconfig(storeMonstersConfig[key].id))
                }
            return Promise.all(promises)
        }.bind(this)).
        then(MonsterConfigHelper.getUserMonstersconfig.bind(MonsterConfigHelper, AuthHelper.getEntityId())).
        then(BuildHelper.getUserBuilds.bind(BuildHelper, AuthHelper.getEntityId()))
    }

    _buildBuildsData() {
        let builds = Utils.map(BuildHelper.getData())
        let build = builds.length ? builds[0] : null

        if (AppHelper.getData('/currentBuild') && BuildHelper.getData()[AppHelper.getData('/currentBuild').id])
            build = AppHelper.getData('/currentBuild')
        if (build)
            AppHelper.put('/currentBuild', build)
        this.setState({ builds: builds, build: build })
    }

    onClickBuild(build) {
        AppHelper.put('/currentBuild', build)
        this.setState({ build: build })
    }

	onClickAddBuild() {
        let build = {name: "New Build", id: String(new Date().getTime()), userId: AuthHelper.getEntityId(), isNewBuild: true}
        this.getState('builds').push(build)
        this.setState({builds : this.getState('builds')})
        this.onClickBuild(build)
	}

}

var BuildsListDataObj = new BuildsListData();
export default BuildsListDataObj;