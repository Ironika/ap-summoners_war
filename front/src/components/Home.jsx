import React from 'react'
import HomeData from 'components/HomeData'
import Login from 'components-lib/login/Login'
import Register from 'components-lib/register/Register'
import SWPanel from 'components-lib/ui/SWPanel'

import './Home.scss'

class Home extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        HomeData.register(this)
    }

    componentWillUnmount() {
        HomeData.unregister()
    }

    buildData() {
        switch (this.state.status) {
            case HomeData.STATUS.HOME_LOGIN: 
                return (<Login onClick={this.onSwitchMode.bind(this)}/>)
            case HomeData.STATUS.HOME_REGISTER: 
                return (<Register onClick={this.onSwitchMode.bind(this)}/>)
        }
    }

    render() {
        return (
            <div className='ap-home'>
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        {this.buildData()}
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <SWPanel className="sm-home-text">
                            <p> 
                                In order to provide you with the best user experience an account is required. 
                                <br/><br/>
                                The strict minimum is required.
                            </p>
                        </SWPanel>
                        <img className="sm-home-img" src={"assets/images/summonerswar.png"} alt="summonerswar-builder"/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home
