import React from 'react'
import RegisterData from 'components-lib/register/RegisterData'

import './Register.scss'

class Register extends React.Component {

	constructor(props) {
		super(props)
	}

	componentWillMount() {
		RegisterData.register(this)
	}

	componentWillUnmount() {
		RegisterData.unregister()
	}


    _buildHeader() { return (
        <div className="col-xs-12">
            <h3 className="sm-register-title">Register</h3>
        </div>
    )}
    _buildInputGroup(label, stateField, isFirst) { return (
        <div>
            <label className={isFirst ? "sm-label" : "sm-label sm-register-label-mid"}>{label}</label>
            <input type="text" className="sm-input" value={this.state[stateField]} onChange={this.onChange.bind(this, stateField)}/>
        </div>
    )}
    _buildFooter(label, callback) { return (
        <div className="col-xs-12">
            <div className="sm-register-error">
                {this.state.error}
            </div>
            <div className="sm-register-button">
                <button className="sm-button" onClick={callback}>{label}</button>
            </div>
        </div>
    )}

    render() {
        switch (this.state.status) {
            case RegisterData.STATUS.REGISTER_INITIAL: return this.renderInitial()
            case RegisterData.STATUS.REGISTER_CHECK: return this.renderCheck()
        }
    }

    renderInitial() {return (
        <div className="sm-register">
            {this._buildHeader()}
            <div className="col-xs-12">
                <div className="sm-content">
                    {this._buildInputGroup('Name', 'username', true)}
                    {this._buildInputGroup('Email', 'email')}
                    {this._buildInputGroup('Password', 'password')}
                    <a onClick={this.props.onClick} className="sm-register-login">Back to Login</a>
                </div>
            </div>
            {this._buildFooter('Register', this.onSubmit)}
        </div>
    )}

    renderCheck() {return (
        <div className="sm-register">
            {this._buildHeader()}
            <div className="col-xs-12">
                <div className="sm-content">
                    <div className="sm-register-message">
                        A confirmation mail has been sent. Please enter the confirmation code below.
                    </div>
                    {this._buildInputGroup('Confirmation code', 'token')}
                </div>
            </div>
            {this._buildFooter('Confirm email', this.onSubmitCheck)}
        </div>
    )}

}
export default Register
