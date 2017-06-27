import React from 'react'
import {RaterStar, Utils} from 'ap-react-bootstrap'
import Rune from 'components-lib/rune/Rune'

import MonsterRunesData from './MonsterRunesData'

import './MonsterRunes.scss'

class MonsterRunes extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		MonsterRunesData.register(this, this.props.monster)
	}
	componentWillReceiveProps(props) {
		MonsterRunesData.unregister()
		MonsterRunesData.register(this, props.monster)
	}
	componentWillUnmount() {
		MonsterRunesData.unregister()
	}

	buildRune(rune) {
		return (<Rune key={rune.id} rune={rune}/>)
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
									<li>
										<img src="assets/images/runes/Rune-Blade.png"/>
										<p className="">Blade</p>
									</li>
									<li>
										<img src="assets/images/runes/Rune-Energy.png"/>
										<p className="">Energy</p>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-xs-12">
						<div className="sm-monster-runes-list">
							{Utils.map(this.state.runes, this.buildRune)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default MonsterRunes