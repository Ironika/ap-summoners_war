import React from 'react';
import MonsterConfigData from 'components-lib/monsterConfig/MonsterConfigData';

import {Utils, FormSelect}  from 'ap-react-bootstrap'
import AppHelper from 'helpers/AppHelper'

import './MonsterConfig.scss';

/* This class was auto-generated by the JavaScriptWriter */
class MonsterConfig extends React.Component {

	constructor(props) {
		super(props);
		this.MonsterConfigDataObj = new MonsterConfigData();
	}

	componentWillMount() {
		this.MonsterConfigDataObj.register(this)
	}

	componentWillUnmount() {
		this.MonsterConfigDataObj.unregister()
	}

	componentWillReceiveProps(nextProps) {
		this.MonsterConfigDataObj.update(nextProps)
	}

	_buildStat(id, stat, key) {
		if(id == "sets")
			var statName = stat			
		else	
			var statName = key + " : " + stat
			
		return (
			<li key={key}>
				<span>{statName}</span>
				<i className="glyphicon glyphicon-remove" onClick={this.onClickDeleteStat.bind(this, id, key)}></i>
			</li>
		)
	}

	render() {
		return (
			<div className="sm-build-buildmonsterconfig sm-content">
				<i className="glyphicon glyphicon-remove sm-build-buildmonsterconfig-delete" onClick={this.props.onClick.bind(this, this.state.monsterConfig)}></i>
				<div className="sm-builds-monster-name">
					<img alt="Summoners War" src={"assets/images/monsters/" + this.state.monsterImage + ".jpg"}/>
					<input className="sm-input" type="text" defaultValue={this.state.monsterName} onChange={this.onChangeMonsterName.bind(this)}/>
				</div>
				<hr/>
				<div className="sm-builds-monster-stats">
					<label className="sm-label" onClick={this.onClickShow.bind(this, 'requiredStats')}>Required Stats</label>
					<div className={"sm-builds-monster-stats-box " + (this.state.requiredStatsIsOpen ? "" : "sm-hide")}>
						<FormSelect values={this.state.statTypeValues} className={'sm-input sm-builds-select'} onChange={this.onChangeSelect.bind(this, 'requiredStats')}/>
						<input type="text" className="sm-input" onChange={this.onChangeInput.bind(this, 'requiredStats')}/>
						<button className="sm-button" onClick={this.onClickSubmit.bind(this, 'requiredStats')}>Ok</button>
						<div className="sm-stats-content">
							<ul>
								{Utils.map(this.state.requiredStats, this._buildStat.bind(this, 'requiredStats'))}
							</ul>
						</div>
					</div>
				</div>
				<hr/>
				<div className="sm-builds-monster-stats">
					<label className="sm-label" onClick={this.onClickShow.bind(this, 'notationStats')}>Notations Stats</label>
					<div className={"sm-builds-monster-stats-box " + (this.state.notationStatsIsOpen ? "" : "sm-hide")}>
						<FormSelect values={this.state.statTypeValues} className={'sm-input sm-builds-select'} onChange={this.onChangeSelect.bind(this, 'notationStats')}/>
						<input type="text" className="sm-input" onChange={this.onChangeInput.bind(this, 'notationStats')}/>
						<button className="sm-button" onClick={this.onClickSubmit.bind(this, 'notationStats')}>Ok</button>
						<div className="sm-stats-content">
							<ul>
								{Utils.map(this.state.notationStats, this._buildStat.bind(this, 'notationStats'))}
							</ul>
						</div>
					</div>
				</div>
				<hr/>
				<div className="sm-builds-monster-stats">
					<label className="sm-label" onClick={this.onClickShow.bind(this, 'sets')}>Sets</label>
					<div className={"sm-builds-monster-stats-box " + (this.state.setsIsOpen ? "" : "sm-hide")}>
						<FormSelect values={this.state.setTypeValues} className={'sm-input sm-builds-select'} onChange={this.onChangeSelect.bind(this, 'sets')}/>
						<button className="sm-button" onClick={this.onClickSubmit.bind(this, 'sets')}>Ok</button>
						<div className="sm-stats-content">
							<ul>
								{Utils.map(this.state.sets, this._buildStat.bind(this, 'sets'))}
							</ul>
						</div>
					</div>
				</div>
				<hr/>
			</div>
		);
	}

}
export default MonsterConfig;
