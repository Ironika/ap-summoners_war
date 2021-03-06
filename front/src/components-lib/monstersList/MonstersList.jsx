import React from 'react';
import {Utils}  from 'ap-react-bootstrap';
import MonstersListData from 'components-lib/monstersList/MonstersListData';
import Monster from 'components-lib/monster/Monster';
import MonsterInfos from 'components-lib/monsterInfos/MonsterInfos';
import MonsterRunes from 'components-lib/monsterRunes/MonsterRunes';
import { BusyBars }  from 'ap-react-bootstrap'
import ElemType from 'utils/constants/ElemType'
import SWPanel from 'components-lib/ui/SWPanel'
import './MonstersList.scss';

/* This class was auto-generated by the JavaScriptWriter */
class MonsterList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        MonstersListData.register(this)
    }

    componentWillUnmount() {
        MonstersListData.unregister()
    }

    _buildMonster(monster) { 
        return ( <Monster key={monster.id} monster={monster} onClick={this.onClickMonster}/>)
    }

    _buildElementFilters(elemType) {
        return (
            <div key={elemType.key} onClick={this.onClickElementFilters.bind(this, elemType.key)} className={this.state.elementFilter[elemType.key] ? "sm-monster-filters-element sm-monster-filters-element-active" : "sm-monster-filters-element"}>
                <img src={"assets/images/elements/" + elemType.key + ".png"}/>
            </div>
        )
    }

    _buildSorts(sort, key) {
        return (
            <li key={key}>
                <label className="sm-label" htmlFor={key}>{key}</label>
                <input id={key} className="sm-checkbox" type="checkbox" onClick={this.onClickSort.bind(this, key)}/>
            </li>
            
        )
    }

    render() { 
        if (this.refs.list && this.state.threshold === MonstersListData.GROWING_INITIAL) {
            this.refs.list.scrollTop = 0;
        }
        return (
            <div className="sm-monsterslist">
                <SWPanel className="sm-monster-filters-elements">
                    {ElemType.VALUES.map(this._buildElementFilters.bind(this))}
                </SWPanel>
                <SWPanel className="sm-monster-filters">
                    <ul>
                        <li className="sm-li-search-input">
                            <input className="sm-input sm-search-input" placeholder='Search' value={this.state.search} onChange={this.onSearch}/>
                        </li>
                        {Utils.map(MonstersListData.SORT_ATTRIBUTE, this._buildSorts.bind(this))}
                    </ul>
                </SWPanel>
                <div className='sm-monster-list' ref='list' onScroll={this.onScroll}>
                    {this.state.monsters.slice(0, this.state.threshold).map(this._buildMonster.bind(this))}
                    {this.state.monsters.length > this.state.threshold ?
                        <div className='sm-monsters-busy'>
                            <BusyBars className='sm-busy-indicator'/>
                        </div>
                    : '' }
                </div>
            </div>
        )
    }

}
export default MonsterList;
