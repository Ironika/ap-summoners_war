import React from 'react'
import {RaterStar, Utils} from 'ap-react-bootstrap'
import Rune from 'components-lib/rune/Rune'
import SetType from 'utils/constants/SetType'
import RuneHelper from 'helpers/RuneHelper'

import './MonsterRunes.scss'

class MonsterRunes extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.state = this.__buildCurrentRunes()
	}
	componentWillReceiveProps(props) {
		this.setState(this.__buildCurrentRunes())
	}

	__buildCurrentRunes() {
		let allRunes = RuneHelper.getData()
		let monsterRunes = []
		this.mainSet = ""
		this.subSet = ""

		for (let key in allRunes) {
			if (allRunes[key].monsterId == this.props.monster.id) {
				monsterRunes.push(allRunes[key])
			}
		}

		this.__getSetsRunes(monsterRunes)

		return { runes: monsterRunes, mainSet: this.mainSet, subSet: this.subSet}
	}

	__getSetsRunes(runes) {
		let runeSets = []
		let count = 0

		for(let rune in runes)
			runeSets.push(runes[rune].set)

		for(let set in SetType.VALUES) {
			count = 0;

			for(let runeSet in runeSets) 
				if(runeSets[runeSet] == SetType.VALUES[set].key)
					count++

			if(count > 3) 
				this.mainSet = SetType.VALUES[set].key
			else if(count > 1)
				this.subSet = SetType.VALUES[set].key
		}
	}

	_buildRunes(rune) {
		return (<Rune key={rune.id} rune={rune}/>)
	}

	_buildSets(set) {
		if(set) {
			return (
				<li key={"set-" + set}>
					<img src={"assets/images/runes/Rune-" + set + ".png"}/>
					<p className="">{set}</p>
				</li>
			)
		}
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
									{this._buildSets(this.state.mainSet)}
									{this._buildSets(this.state.subSet)}
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