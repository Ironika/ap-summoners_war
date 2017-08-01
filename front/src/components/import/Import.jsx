import React from 'react';
import SWPanel from 'components-lib/ui/SWPanel'
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
			<div className='sm-import'>
				<div className="row">
					<div className="col-xs-12 col-sm-6">
						<SWPanel>
							<p className="sm-import-text">
								Import your Json file and create your optimised builds for your team !
								<br/><br/>
								Take a look of all your monsters and runes like in game !
								<br/><br/>
								<a href="assets/summonerswar-builderTEST.json" download>
									<button className="sm-button">Get Test File ?</button>
								</a>
							</p>
						</SWPanel>
						<SWPanel className="sm-import-file" size="lg">
							<div className="sm-content sm-upload">
								<label htmlFor="file-upload" className="sm-label sm-upload-label">
								    {this.state.upload}
								</label>
								<input id="file-upload" type="file" ref={(c) => this.state.fileInput = c} onChange={this.onChange.bind(this)}/>
							</div>
							<div className="col-xs-12">
								<p className="sm-error sm-import-error">{this.state.error}</p>
							</div>
							<div className="sm-upload-button">
								<button className="sm-button" onClick={this.onClickImport}>Import</button>
							</div>
						</SWPanel>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="sm-import-img">
							<img src="assets/images/upload.png" alt="summonerswar-builder" />
						</div>
					</div>
				</div>
			</div>
		);
	}

}
export default Import;
