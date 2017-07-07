import React from 'react'
import HomeData from 'components/HomeData'
import Login from 'components-lib/login/Login'
import Register from 'components-lib/register/Register'
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
                    <div className="col-xs-12 col-md-6">
                        {this.buildData()}
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <div className="sm-sheet">
                            <p className="sm-home-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        </div>
                        <img className="sm-home-img" src={"assets/images/summonerswar.png"} />
                    </div>
                </div>
            </div>
        )
    }
}
export default Home
