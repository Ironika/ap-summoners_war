import React from 'react'
import RunesData from 'components/runes/RunesData'
import Rune from 'components-lib/rune/Rune'
import RuneStar from 'components-lib/runeStar/RuneStar'
import {Utils, FormSelect}  from 'ap-react-bootstrap'

import PosType from 'utils/constants/PosType'
import SetType from 'utils/constants/SetType'
import StatType from 'utils/constants/StatType'

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
			<div key={setType.key} onClick={this.onClickSetFilter.bind(this, setType.key)} className={(this.state.setFilter === setType.key) ? "sm-rune-type sm-rune-type-active" : "sm-rune-type"}>
				<img src={"assets/images/runes/Rune-" + setType.key + ".png"} title={setType.key}/>
			</div>
		)
	}

	_buildSubStat(substat) {
		return (
			<li key={substat.key} className={(this.state.subStatFilter === substat.key) ? "sm-runes-sub-active" : ""}>
				<span className="sm-label" onClick={this.onClickSubStatFilter.bind(this, substat.key)}>{substat.key}</span>
			</li>
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
			<div className='sm-runes'>
				<div className="row">
					<div className="col-xs-12 col-md-4">
						<div className="sm-sheet sm-runes-types">
							{SetType.VALUES.map(this._buildType.bind(this))}
						</div>
						<div className="sm-sheet sm-sheet-top sm-runes-main-filters"> 
							<h4>Main Stat</h4>
							<FormSelect values={this.state.statTypeValues} className={'sm-input sm-runes-main-select'} onChange={this.onChangeMainStatFilter.bind(this)}/>
						</div>
						<div className="sm-sheet sm-sheet-top sm-runes-sub-filters">
							<h4>Sub Stat</h4>
							<ul>
								{StatType.VALUES.map(this._buildSubStat.bind(this))}
							</ul>
						</div>
                        <div className="sm-sheet sm-sheet-top sm-runes-positions">
                            <RuneStar onChange={this.onClickRuneStar}/>
                            <ul>
                                {Utils.map(RunesData.SORT_ATTRIBUTE, this._buildSorts.bind(this))}
                            </ul>
                        </div>
					</div>
					<div className="col-xs-12 col-md-8">
						<div className="sm-runes-list">
							{Utils.map(this.state.runes, this._buildRune)}
						</div>
					</div>
				</div>
			</div>
		);
	}

}
export default Runes;
