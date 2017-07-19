import React from 'react';

import MonsterHelper from 'helpers/MonsterHelper'
import MonsterConfigHelper from 'helpers/MonsterConfigHelper'

import RuneHelper from 'helpers/RuneHelper'
import Rune from 'components-lib/rune/Rune'

import BuildResultsData from 'components-lib/buildResults/BuildResultsData';
import {Utils}  from 'ap-react-bootstrap'

import './BuildResults.scss';

/* This class was auto-generated by the JavaScriptWriter */
class BuildResults extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		BuildResultsData.register(this)
	}

	componentWillUnmount() {
		BuildResultsData.unregister()
	}

	buildImg(monster){
		let storage = "(In Storage)"
		let element = "(" + monster.elemType + ")"

		let name = monster.name

		if(name.search("Unknow") != -1) {
			return (<img className="sm-monster-image" src={"assets/images/monsters/default-monster.jpg"}/>)
		}

		if(name.search(storage) != -1) {
			name = name.slice(0 , name.search(storage) - 2)
		}

		if(name.search(element) != -1) {
			name = name.slice(0 , name.search(element) - 2)
			name = name + "_" + monster.elemType
		}

		while(name.search(" ") != -1)
			name = name.replace(" ", "-")


		return (<img className="sm-monster-image" src={"assets/images/monsters/" + name + ".jpg"}/>)
	}

	_buildMonsterResult(monsterResult) {
		let monster = MonsterHelper.getData(MonsterConfigHelper.getData(monsterResult.monsterConfigId).monsterId)
		let rune1 = RuneHelper.getData(monsterResult.rune1)
		let rune2 = RuneHelper.getData(monsterResult.rune2)
		let rune3 = RuneHelper.getData(monsterResult.rune3)
		let rune4 = RuneHelper.getData(monsterResult.rune4)
		let rune5 = RuneHelper.getData(monsterResult.rune5)
		let rune6 = RuneHelper.getData(monsterResult.rune6)
		return (
			<li className="sm-build-monster-result">
				<div className="col-xs-6 sm-build-monster-result-left">
					{this.buildImg(monster)}
					<div className="sm-build-monster-result-runes">
						<img className="sm-rune1" src={"assets/images/runes/Rune-" + rune1.set + ".png"}/>
						<div className="sm-build-monster-result-rune1">
							<Rune rune={rune1}/>
						</div>
						<img className="sm-rune2" src={"assets/images/runes/Rune-" + rune2.set + ".png"}/>
						<div className="sm-build-monster-result-rune2">
							<Rune rune={rune2}/>
						</div>
						<img className="sm-rune3" src={"assets/images/runes/Rune-" + rune3.set + ".png"}/>
						<div className="sm-build-monster-result-rune3">
							<Rune rune={rune3}/>
						</div>
						<img className="sm-rune4" src={"assets/images/runes/Rune-" + rune4.set + ".png"}/>
						<div className="sm-build-monster-result-rune4">
							<Rune rune={rune4}/>
						</div>
						<img className="sm-rune5" src={"assets/images/runes/Rune-" + rune5.set + ".png"}/>
						<div className="sm-build-monster-result-rune5">
							<Rune rune={rune5}/>
						</div>
						<img className="sm-rune6" src={"assets/images/runes/Rune-" + rune6.set + ".png"}/>
						<div className="sm-build-monster-result-rune6">
							<Rune rune={rune6}/>
						</div>
					</div>
				</div>
				<div className="col-xs-6 sm-build-monster-result-right">
					<ul>
						<li>Hp : <span>{monsterResult.hp}</span></li>
						<li>Atk : <span>{monsterResult.atk}</span></li>
						<li>Def : <span>{monsterResult.def}</span></li>
						<li>Spd : <span>{monsterResult.spd}</span></li>
						<li>Crate : <span>{monsterResult.crate}</span></li>
						<li>Cdmg : <span>{monsterResult.cdmg}</span></li>
						<li>Res : <span>{monsterResult.res}</span></li>
						<li>Acc : <span>{monsterResult.acc}</span></li>
					</ul>
				</div>
			</li>
		)
	}

	_buildTeamResult(teamResult) {
		return (
			<div className="sm-build-team-result">
				<ul>
					<li className="sm-build-team-result-first">{teamResult.eval.toFixed(2)}</li>
					{Utils.map(teamResult.monsterResults, this._buildMonsterResult.bind(this))}
				</ul>
			</div>
		)
	}

	_buildBuildResult(buildResult) {
		let creationDate = buildResult.creationDate[0] + "/" + buildResult.creationDate[1] + "/" + buildResult.creationDate[2] + " - " + buildResult.creationDate[3] + ":" + buildResult.creationDate[4]
		return (
			<div className={"sm-build-result" }>
				<label className="sm-label" onClick={this.onClickShow.bind(this, buildResult.id)}>Result : {creationDate}</label>
				<div className={"sm-build-team-results " + (this.state.showResult[buildResult.id] ? "" : "sm-hide")} >
					{Utils.map(buildResult.teamResults, this._buildTeamResult.bind(this))}
				</div>
				<hr/>
			</div>
		)
	}

	render() {
		return (
			<div className="sm-build-results">
			 	<div className="sm-content">
			 		{Utils.map(this.props.buildResults, this._buildBuildResult.bind(this))}
			 	</div>
		 	</div>
		)
	}
}
export default BuildResults;