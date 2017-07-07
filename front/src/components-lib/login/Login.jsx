import React from 'react';
import LoginData from 'components-lib/login/LoginData';
import './Login.scss';

/* This class was auto-generated by the JavaScriptWriter */
class Login extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		LoginData.register(this)
	}

	componentWillUnmount() {
		LoginData.unregister()
	}

	render() {
		return (
			<div className="sm-sheet sm-login">
				<h3 className="sm-login-title">Login</h3>
				<div className="sm-content">
					<label className="sm-label">Username or Email</label>
					<input type="text" className="sm-input" value={this.state.username} onChange={this.onChange.bind(this, 'username')}/>
					<label className="sm-label sm-login-label-mid">Password</label>
					<input type="text" className="sm-input" value={this.state.password} onChange={this.onChange.bind(this, 'password')}/>
					<a onClick={this.props.onClick} className="sm-login-register">Create an Account</a>
				</div>
				<p className="sm-error sm-login-error">{this.state.error}</p>
				<div className="sm-login-button">
					<button className="sm-button" onClick={this.onSubmit}>Login</button>
				</div>
			</div>
		);
	}

}
export default Login;
