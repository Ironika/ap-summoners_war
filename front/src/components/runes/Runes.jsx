import React from 'react'
import RunesData from 'components/runes/RunesData'
import Rune from 'components-lib/rune/Rune'
import RuneStar from 'components-lib/runeStar/RuneStar'
import { Utils, FormSelect, BusyBars }  from 'ap-react-bootstrap'
import SWPanel from 'components-lib/ui/SWPanel'

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
        if (this.refs.list && this.state.threshold === 50) {
            this.refs.list.scrollTop = 0;
        }
		return (
			<div className='sm-runes sm-max-height'>
				<div className="row sm-max-height">
					<div className="col-xs-12 col-md-4 sm-max-height sm-max-height-fix">
                        <SWPanel className="sm-runes-positions">
                            <RuneStar onChange={this.onClickRuneStar}/>
                            <ul>
                                {Utils.map(RunesData.SORT_ATTRIBUTE, this._buildSorts.bind(this))}
                            </ul>
                        </SWPanel>
                        <SWPanel>
                        	<div className="sm-runes-types">
								{SetType.VALUES.map(this._buildType.bind(this))}
							</div>
						</SWPanel>
					</div>
					<div className="col-xs-12 col-md-8 sm-max-height">
						<div className="row sm-runes-stats">
							<div className="col-xs-12 col-md-4 sm-max-height">
								<SWPanel className="sm-runes-main-filters"> 
									<h4>Main Stat</h4>
									<FormSelect values={this.state.statTypeValues} className={'sm-input sm-runes-main-select'} onChange={this.onChangeMainStatFilter.bind(this)}/>
								</SWPanel>
							</div>
							<div className="col-xs-12 col-md-8 sm-max-height">
								<SWPanel className="sm-runes-sub-filters"> 
									<ul>
										{StatType.VALUES.map(this._buildSubStat.bind(this))}
									</ul>
								</SWPanel>
							</div>
						</div>
						<div className="clearfix"></div>
						<div className='sm-runes-list' onScroll={this.onScroll} ref='list'>
							{this.state.runes.slice(0, this.state.threshold).map(this._buildRune)}
                            {this.state.runes.length > this.state.threshold ?
                                <div className='sm-runes-busy'>
                                    <BusyBars className='sm-busy-indicator'/>
                                </div>
                            : '' }
						</div>
					</div>
				</div>
			</div>
		);
	}

}
export default Runes;
