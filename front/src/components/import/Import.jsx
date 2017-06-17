import React from 'react';
import ImportData from 'components/import/ImportData';
import './Import.scss';

/* This class was auto-generated by the JavaScriptWriter */
class Import extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		ImportData.register(this)
	}

	componentWillUnmount() {
		ImportData.unregister()
	}

	render() {
		return (
			<div className='ap-import'>
				<div className="row">
					<div className="col-xs-12">
						<h3 className="sm-import-title">Import your Json File</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-6">
						<form className="sm-upload">
							<div className="sm-sheet sm-sheet-mid">
								<div className="sm-content">
									<label htmlFor="file-upload" className="sm-label sm-upload-label">
									    Upload your Json file
									</label>
									<input id="file-upload" type="file"/>
								</div>
								<div className="sm-upload-button">
									<input className="sm-button" type="submit" value="Import"/>
								</div>
							</div>
							<div className="sm-sheet sm-sheet-mid">
								<ul className="sm-upload-filters">
									<li>
										<label className="sm-label">Filter</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
									<li>
										<label className="sm-label">Filter</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
									<li>
										<label className="sm-label">Filter</label>
										<input className="sm-checkbox" type="checkbox"/>
									</li>
								</ul>
							</div>
						</form>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="sm-import-img-content">
							<img src="assets/images/upload.png" alt="Summoners War Homunculus" className="sm-import-img" />
						</div>
					</div>
				</div>
			</div>
		);
	}

}
export default Import;