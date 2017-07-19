import React from 'react'
import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import BuildHelper from 'helpers/BuildHelper'
import MonsterConfigHelper from 'helpers/MonsterConfigHelper'
import DefaultHelper from 'helpers/DefaultHelper'
import BuildState from 'utils/constants/BuildState'
import SWPanel from 'components-lib/ui/SWPanel'

import {Utils}  from 'ap-react-bootstrap'

import './BuildInfos.scss';

/* This class was auto-generated by the JavaScriptWriter */
class BuildInfos extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		let currentBuild = AppHelper.getData('/currentBuild')
		this.state = {
            build: currentBuild,
            isNewBuild: this.isNewBuild(currentBuild),
            canSave: false
        }  
		AppHelper.register('/currentBuild', this, this._onBuildChange.bind(this));
	}

	componentWillUnmount() {
		AppHelper.unregister(this)
	}

	isNewBuild(build) {
		if (build && build.isNewBuild)
			return true
		else
			return false
	}

	_onBuildChangeCanSave() {
		let build = AppHelper.getData('/currentBuild')
		let canSave = AppHelper.getData('/currentBuild/' + build.id + "/canSave")
        this.setState({canSave: canSave})
    }

	_onBuildChange() {
		let build = AppHelper.getData('/currentBuild')
		AppHelper.register('/currentBuild/' + build.id + "/canSave", this, this._onBuildChangeCanSave.bind(this));
		let canSave = AppHelper.getData('/currentBuild/' + build.id + "/canSave")
		build.runesLvl = 9
		build.runesStars = 5
        this.setState({
            build: build,
            isNewBuild: this.isNewBuild(build),
            canSave: canSave
        })
    }

	onChangeBuildName(event) {
		let build = AppHelper.getData('/currentBuild')
		AppHelper.put('/currentBuild/' + build.id + "/canSave", true)
		this.state.build.name = event.target.value
		this.setState({build: this.state.build})
	}

	onClickEdit(){
		let build = AppHelper.getData('/currentBuild')
		AppHelper.put('/currentBuild/' + build.id + "/canSave", false)
		build.state = BuildState.SAVE.key
		BuildHelper.putBuild(build).
		then(function() {
			let promises = []
			let currentMonsterConfig = {}
			let oldMonsterConfig = {}

			let storeMonstersConfig = AppHelper.getData('/monstersConfig')
			for(let key in storeMonstersConfig) {
	    		if (build.id == storeMonstersConfig[key].buildId) {
	    			storeMonstersConfig[key].buildId = build.id
	    			currentMonsterConfig[key] = storeMonstersConfig[key]
	    		}
	    	}

	    	let oldStoreMonstersConfig = MonsterConfigHelper.getData()
			for(let key in oldStoreMonstersConfig) {
	    		if (build.id == oldStoreMonstersConfig[key].buildId)
	    			oldMonsterConfig[key] = oldStoreMonstersConfig[key]
	    	}

	    	for (let key in currentMonsterConfig) {
	    		if (oldMonsterConfig[key])
	    			promises.push(MonsterConfigHelper.putMonstersconfig(currentMonsterConfig[key]))
	    		else
	    			promises.push(MonsterConfigHelper.postMonstersconfig(currentMonsterConfig[key]))
	    	}

	    	for (let key in oldMonsterConfig) {
	    		if (!currentMonsterConfig[key])
	    			promises.push(MonsterConfigHelper.deleteMonstersconfig(oldMonsterConfig[key].id))
	    	}

			return Promise.all(promises)
		}.bind(this)).
		then(MonsterConfigHelper.getUserMonstersconfig.bind(MonsterConfigHelper, AuthHelper.getEntityId())).
		then(BuildHelper.getUserBuilds.bind(BuildHelper, AuthHelper.getEntityId()))
	}

	onClickSave() {
		let build = AppHelper.getData('/currentBuild')
		delete(build.isNewBuild)
		build.state = BuildState.SAVE.key
		BuildHelper.postBuild(build).
		then(function(result) {
			let promises = []
			let storeMonstersConfig = AppHelper.getData('/monstersConfig')
	    	for(let key in storeMonstersConfig)
	    		if (build.id == storeMonstersConfig[key].buildId) {
	    			storeMonstersConfig[key].buildId = result.id
					promises.push(MonsterConfigHelper.postMonstersconfig(storeMonstersConfig[key]))
	    		}
			return Promise.all(promises)
		}.bind(this)).
		then(MonsterConfigHelper.getUserMonstersconfig.bind(MonsterConfigHelper, AuthHelper.getEntityId())).
		then(BuildHelper.getUserBuilds.bind(BuildHelper, AuthHelper.getEntityId()))
	}

	onClickBuild() {
		let build = AppHelper.getData('/currentBuild')
		build.state = BuildState.INBUILDING.key
		DefaultHelper.postBuildDo({buildId: build.id})
	}


	render() {
		if (this.state.build) {
			return (
				<SWPanel className="sm-builds-infos">
					<ul>
						<li>
							<label className="sm-label">Build Name</label>
							<input className="sm-input" type="text" value={this.state.build.name} onChange={this.onChangeBuildName.bind(this)}/>
						</li>
						<li className="sm-mini-li">
							<label className="sm-label">Status</label>
							<input className="sm-input sm-cursor-disabled" value={this.state.build.state} disabled={true}/>
						</li>
						<li className="sm-mini-li">
							<label className="sm-label">Runes lvl</label>
							<input className="sm-input sm-cursor-disabled sm-mini-input" value={this.state.build.runesLvl} disabled={true}/>
						</li>
						<li className="sm-mini-li">
							<label className="sm-label">Runes stars</label>
							<input className="sm-input sm-cursor-disabled sm-mini-input" value={this.state.build.runesStars} disabled={true}/>
						</li>
						<li className="sm-button-mobile"><button className={"sm-button " + (this.state.isNewBuild ? "" : "sm-hide")} onClick={this.onClickSave.bind(this)}>Save</button></li>
						<li className="sm-button-mobile"><button className={"sm-button " + (this.state.canSave ? "" : "sm-button-disabled ") + (this.state.isNewBuild ? "sm-hide" : "")} disabled={!this.state.canSave} onClick={this.onClickEdit.bind(this)}>Save</button></li>
						<li className="sm-button-mobile"><button className="sm-button" onClick={this.onClickBuild.bind(this)}>Build</button></li>
					</ul>
				</SWPanel>
			);
		}
		else
			return(<div></div>);
	}

}
export default BuildInfos;
