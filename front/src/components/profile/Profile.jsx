import React from 'react';
import ProfileData from 'components/profile/ProfileData';
import './Profile.scss';

/* This class was auto-generated by the JavaScriptWriter */
class Profile extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		ProfileData.register(this)
	}

	componentWillUnmount() {
		ProfileData.unregister()
	}

	render() {
		return (
			<div className='sm-profile'>
				<div className="row">
					<div className="col-xs-12 col-md-6">
						<div className="sm-sheet sm-profil-stat">
							<img alt="Summoners War" src="assets/images/runes.png"/>
							<p>Monsters : <span>{this.state.monsters}</span></p>
						</div>
						<div className="sm-sheet sm-sheet-top sm-profil-stat">
							<img alt="Summoners War" src="assets/images/runes.png"/>
							<p>Runes : <span>{this.state.runes}</span></p>
						</div>
						<div className="sm-sheet sm-sheet-top sm-profil-stat sm-profil-stat-last">
							<img alt="Summoners War" src="assets/images/runes.png"/>
							<p>Builds : <span>{this.state.builds}</span></p>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="sm-sheet sm-profile-user">
							<div className="sm-content">
								<ul className="sm-profil-user-key">
                                    <li>Username : <input className="sm-input" type="text" value={this.state.username} onChange={this.onChange.bind(this, 'username')}disabled={true} /></li>
									<li>Mail : <input className="sm-input" type="text" value={this.state.email} onChange={this.onChange.bind(this, 'email')} disabled={true}/></li>
									<li>Last import : <input className="sm-input" value={this.state.lastImport} disabled={true}/></li>
								</ul>
							</div>
							<div className="sm-upload sm-upload-profile">
								<label htmlFor="file-upload" className="sm-button">
								    {this.state.upload}
								</label>
								<input id="file-upload" type="file" ref={(c) => this.state.fileInput = c} onChange={this.onChangeUpload.bind(this, 'file')}/>
                                {this.state.fileInput.files ? 
                                    <button className='sm-button' onClick={this.onSendImage}>Send</button>
                                : '' }
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

}
export default Profile;
