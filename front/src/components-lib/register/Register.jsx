import React from 'react'
import SWPanel from 'components-lib/ui/SWPanel'
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
        <h3 className="sm-register-title">Register</h3>
    )}

    _buildInputGroup(label, stateField, isFirst) { return (
        <div>
            <label className={isFirst ? "sm-label" : "sm-label sm-register-label-mid"}>{label}</label>
            <input type="text" className="sm-input" value={this.state[stateField]} onChange={this.onChange.bind(this, stateField)}/>
        </div>
    )}
    _buildFooter(label, callback) { return (
        <div>
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
        <SWPanel className="sm-register" size="lg">
            {this._buildHeader()}
            <div className="sm-content">
                {this._buildInputGroup('Name', 'username', true)}
                {this._buildInputGroup('Email', 'email')}
                {this._buildInputGroup('Password', 'password')}
                <a onClick={this.props.onClick} className="sm-register-login">Back to Login</a>
            </div>
            {this._buildFooter('Register', this.onSubmit)}
        </SWPanel>
    )}

    renderCheck() {return (
        <SWPanel className="sm-register">
            {this._buildHeader()}
            <div className="sm-content">
                <div className="sm-register-message">
                    A confirmation mail has been sent. Please enter the confirmation code below.
                </div>
                {this._buildInputGroup('Confirmation code', 'token')}
            </div>
            {this._buildFooter('Confirm email', this.onSubmitCheck)}
        </SWPanel>
    )}

}
export default Register
