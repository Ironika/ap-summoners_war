import React from 'react'
import {RaterStar, Utils} from 'ap-react-bootstrap'
import Rune from 'components-lib/rune/Rune'
import SetType from 'utils/constants/SetType'
import RuneHelper from 'helpers/RuneHelper'

import './MonsterRunes.scss'

let SETS = {
    Energy: 2,
    Swift: 4,
    Despair: 4,
    Blade: 2,
    Focus: 2,
    Fatal: 4,
    Revenge: 2,
    Vampire: 4
}

class MonsterRunes extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.state = this.__buildCurrentRunes(this.props)
	}
	componentWillReceiveProps(props) {
		this.setState(this.__buildCurrentRunes(props))
	}

	__buildCurrentRunes(props) {
		let allRunes = RuneHelper.getData()
		let monsterRunes = []
		let sets = {}

		for (let key in allRunes) {
			if (allRunes[key].monsterId == props.monster.id) {
				monsterRunes.push(allRunes[key])
			}
		}

		sets = this.__getSetsRunes(monsterRunes)

		return { runes: monsterRunes, sets: sets}
	}

	__getSetsRunes(runes) {
		let runeSets = {}
		let count = 0

		let sets = {}

		for(let rune in runes)
			if (runes[rune].set in runeSets)
				runeSets[runes[rune].set]++ 
			else 
				runeSets[runes[rune].set] = 1

		for(let set in runeSets)
			if(runeSets[set] >= SETS[set])
				if (set in sets)
					sets[set]++ 
				else 
					sets[set] = 1

		return sets
	}

	_buildRunes(rune) {
		return (<Rune key={rune.id} rune={rune}/>)
	}

	_buildSets(sets) {
		let setJsx = []
		for (let key in sets) {
			setJsx.push(this.__buildSet(key , sets[key]))
		}
		return setJsx
	}

	__buildSet(set, count) {
		let setJsx;
		if (count > 1)
			setJsx = (<p className="">{set + ' x ' + count}</p>)
		else
			setJsx = (<p className="">{set}</p>)

		return (
			<li key={"set-" + set}>
				<img src={"assets/images/runes/Rune-" + set + ".png"}/>
				{setJsx}
			</li>
		)
	}

	render() {
		return (
			<div className="sm-monster-runes">
				<div className="row sm-monster-rune-row">
					<div className="col-xs-12">
						<div className="col-xs-3">
							<img className="sm-monster-runes-img" src="assets/images/runes.png" />
						</div>
						<div className="col-xs-9">
							<div className="sm-monster-rune-set">
								<h4>Set Effect</h4>
								<ul>
									{this._buildSets(this.state.sets)}
								</ul>
							</div>
						</div>
					</div>
					<div className="col-xs-12">
						<div className="sm-monster-runes-list">
							{Utils.map(this.state.runes, this._buildRunes)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default MonsterRunes