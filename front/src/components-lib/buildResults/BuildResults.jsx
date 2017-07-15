import React from 'react';

import {Utils}  from 'ap-react-bootstrap'

import './BuildResults.scss';

/* This class was auto-generated by the JavaScriptWriter */
class BuildResults extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		BuildResultsData.register(this)
	}

	componentWillUnmount() {
		BuildResultsData.unregister()
	}

	_buildBuildResult() {
		return (
			<label className="sm-label" onClick={this.onClickShow.bind(this, 'sets')}>Results - Date</label>

		)
	}

	render() {
		return (
			<div className="sm-build-results">
			 	<div className="sm-content">
			 		{this._buildBuildResult()}
			 	</div>
		 	</div>
		)
	}
}
export default BuildResults;