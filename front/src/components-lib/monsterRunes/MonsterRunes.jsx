import React from 'react'
import {RaterStar, Utils} from 'ap-react-bootstrap'
import Rune from 'components-lib/rune/Rune'
import SetType from 'utils/constants/SetType'
import RuneHelper from 'helpers/RuneHelper'

import './MonsterRunes.scss'

let SETS_BONUS = {
    Energy: 2,
    Swift: 4,
    Despair: 4,
    Blade: 2,
    Focus: 2,
    Fatal: 4,
    Revenge: 2,
    Vampire: 4,
	Rage: 4,
	Guard: 2,
	Shield: 2,
	Revenge: 2,
	Will: 2,
	Nemesis: 2,
	Violent: 4,
	Destroy: 2,
	Fight: 0,
	Determination: 0,
	Enhance: 0,
	Accuracy: 0,
	Tolerance: 0,
	Endure: 0,
}

class MonsterRunes extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.state = this._buildSetsRunes(this.props)
	}
	componentWillReceiveProps(props) {
		this.setState(this._buildSetsRunes(props))
	}

	_buildSetsRunes(props) {
		let runeSets = {}
		let sets = {}

		for(let rune in props.runes)
			if (props.runes[rune].set in runeSets)
				runeSets[props.runes[rune].set]++ 
			else 
				runeSets[props.runes[rune].set] = 1

		for(let set in runeSets)
			if(runeSets[set] >= SETS_BONUS[set])
				if (set in sets)
					sets[set]++ 
				else 
					sets[set] = 1

		return { runes: props.runes, sets: sets}
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