import React from 'react'
import BuildsData from 'components/builds/BuildsData'
import BuildProfil from 'components-lib/buildProfil/BuildProfil'
import BuildsList from 'components-lib/buildsList/BuildsList'
import BuildInfos from 'components-lib/buildInfos/BuildInfos'

import './Builds.scss';

/* This class was auto-generated by the JavaScriptWriter */
class Builds extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		BuildsData.register(this)
	}

	componentWillUnmount() {
		BuildsData.unregister()
	}

	render() {
		return (
			<div className='sm-builds'>
				<div className="row sm-max-height">
					<div className={"col-xs-12 " + (this.state.isExpanded ? "sm-hide" : "")}>
						 <BuildsList/>
					</div>
					<div className={"col-xs-12 " + (this.state.isExpanded ? "sm-max-height" : "sm-builds-profil")}>
						<BuildProfil />
					</div>
					<div className={"col-xs-12 " + (this.state.isExpanded ? "sm-hide" : "")}>
						<BuildInfos/>
					</div>
				</div>
			</div>
		);
	}

}
export default Builds;
