import React from 'react'
import RunesData from 'components/runes/RunesData'
import Rune from 'components/lib/rune/Rune'
import {Utils}  from 'ap-react-bootstrap'

import PosType from 'utils/constants/PosType'
import SetType from 'utils/constants/SetType'

import './Runes.scss'

class Runes extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		RunesData.register(this)
	}

	componentWillUnmount() {
		RunesData.unregister()
	}

	_buildRune(rune) {
		return (<Rune key={rune.id} rune={rune}/>)
	}

	_buildType(setType) {
		return (
			<div key={setType.key} onClick={this.onClickFilterSet.bind(this, setType.key)} className={(this.state.filterSet[setType.key]) ? "sm-rune-type sm-rune-type-active" : "sm-rune-type"}>
				<img src={"assets/images/runes/Rune-" + setType.key + ".png"}/>
			</div>
		)
	}

	_buildSorts(sort, key) {
        return (
            <li key={key}>
                <label className="sm-label">{key}</label>
                <input className="sm-checkbox" type="checkbox" onClick={this.onClickSort.bind(this, key)}/>
            </li>
        )
    }

	render() {
		return (
			<div className='ap-runes'>
				<div className="row">
					<div className="col-xs-12">
						<div className="sm-sheet">
							<div className="sm-runes-types">
								{SetType.VALUES.map(this._buildType.bind(this))}
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-8">
						<div className="sm-runes sm-sheet-mid">
							{Utils.map(this.state.runes, this._buildRune)}
						</div>
					</div>
					<div className="col-xs-12 col-md-4">
						<div className="sm-sheet sm-sheet-mid">
							<div className="sm-runes-pos-filters">
								<img src="assets/images/runes.png" className="sm-runes-pos-img"/>
								<input className="sm-checkbox sm-checkbox-1" type="checkbox" onClick={this.onClickFilterPos.bind(this, '1')}/>
								<input className="sm-checkbox sm-checkbox-2" type="checkbox" onClick={this.onClickFilterPos.bind(this, '2')}/>
								<input className="sm-checkbox sm-checkbox-3" type="checkbox" onClick={this.onClickFilterPos.bind(this, '3')}/>
								<input className="sm-checkbox sm-checkbox-4" type="checkbox" onClick={this.onClickFilterPos.bind(this, '4')}/>
								<input className="sm-checkbox sm-checkbox-5" type="checkbox" onClick={this.onClickFilterPos.bind(this, '5')}/>
								<input className="sm-checkbox sm-checkbox-6" type="checkbox" onClick={this.onClickFilterPos.bind(this, '6')}/>
								<ul className="sm-runes-filters">
									{Utils.map(RunesData.SORT_ATTRIBUTE, this._buildSorts.bind(this))}
								</ul>
							</div>
						</div>
						<div className="sm-sheet sm-sheet-mid">
							<div className="sm-runes-filters-main"> 
								<h4>Main Stat</h4>
								<ul>
									<li>
										<label className="sm-label">Hp</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
									<li>
										<label className="sm-label">HpFLat</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
									<li>
										<label className="sm-label">Atk</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
									<li>
										<label className="sm-label">AtkFlat</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
									<li>
										<label className="sm-label">Def</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
									<li>
										<label className="sm-label">DefFlat</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
									<li>
										<label className="sm-label">Spd</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
									<li>
										<label className="sm-label">Acc</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
									<li>
										<label className="sm-label">Res</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
								</ul>
							</div>
						</div>


						<div className="sm-sheet sm-sheet-mid">
							<div className="sm-runes-filters-main"> 
								<h4>Sub Stat</h4>
								<ul>
									<li>
										<label className="sm-label">Hp</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
									<li>
										<label className="sm-label">HpFLat</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
									<li>
										<label className="sm-label">Atk</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
									<li>
										<label className="sm-label">AtkFlat</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
									<li>
										<label className="sm-label">Def</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
									<li>
										<label className="sm-label">DefFlat</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
									<li>
										<label className="sm-label">Spd</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
									<li>
										<label className="sm-label">Acc</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
									<li>
										<label className="sm-label">Res</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
								</ul>
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}

}
export default Runes;
