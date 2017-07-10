import React from 'react'
import BuildsData from 'components/builds/BuildsData'
import MonsterConfigList from 'components-lib/monsterConfigList/MonsterConfigList'
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
			<div className='sm-builds sm-max-height'>
				<div className="row sm-max-height">
					<div className="col-xs-12 col-sm-2">
						 <BuildsList/>
					</div>
					<div className="col-xs-10 col-sm-10">
						<MonsterConfigList/>
						<BuildInfos/>
					</div>
				</div>
			</div>
		);
	}

}
export default Builds;
