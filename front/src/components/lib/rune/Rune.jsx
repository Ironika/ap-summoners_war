import React from 'react';
import {RaterStar} from 'ap-react-bootstrap';
import './Rune.scss';

/* This class was auto-generated by the JavaScriptWriter */
class Rune extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		console.log("AaaaaaaaaaaAAAAAAAA ", this.props.rune)
		this.setState({rune: this.props.rune})
	}

	componentWillReceiveProps(nextProps) {
		console.log("BBBBBBBBBBBBBBBBBBB ", this.props.rune)
		this.setState({rune: nextProps.rune})
	}

	render() {
		return (
			<div className="sm-rune">
				<RaterStar className="sm-rune-star" value={this.state.rune.star} starMax={6}/>
				<img className="sm-rune-set" src={"assets/images/runes/Rune-" + this.state.rune.set + ".png"}/>
				<span className="sm-rune-lvl">+12</span>
				<div className="sm-rune-stats">
					<ul className="sm-rune-stat">
						<li className="first">{this.state.rune.statMainType} <span>{this.state.rune.statMain}%</span></li>
						<li>{this.state.rune.stat1Type} <span>{this.state.rune.stat1}%</span></li>
						<li>{this.state.rune.stat2Type} <span>{this.state.rune.stat2}%</span></li>
					</ul>
					<ul className="sm-rune-stat">
						<li className="first">{this.state.rune.statSubType} <span>{this.state.rune.statSub}%</span></li>
						<li>{this.state.rune.stat3Type} <span>{this.state.rune.stat3}%</span></li>
						<li>{this.state.rune.stat4Type} <span>{this.state.rune.stat4}%</span></li>
					</ul>
				</div>
			</div>
		);
	}

}
export default Rune;
