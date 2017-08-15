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
				<div className="sm-monster-rune-set">
					<h4>Set Effect</h4>
					<ul>
						{this._buildSets(this.props.sets)}
					</ul>
				</div>
				<div className="sm-monster-runes-list">
					{Utils.map(this.props.runes, this._buildRunes)}
				</div>
			</div>
		)
	}
}
export default MonsterRunes