import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import ImageHelper from 'helpers/ImageHelper'
import UserHelper from 'helpers/UserHelper'
import { BaseData, Utils } from 'ap-react-bootstrap'

let PAGES = {
    import: 'import',
    monsters: 'monsters',
    runes: 'runes',
    builds: 'builds'
}

/* This class was auto-generated by the JavaScriptWriter */
class AppData extends BaseData {

	register(obj) {
		super.register(obj)

		this.obj.onClickHome = this.onClickHome
		this.obj.onClickProfile = this.onClickProfile

		Utils.forEach(PAGES, function(page) {
			this.obj[page] = this.onClickPage.bind(this, PAGES[page])
		}.bind(this))

		this.obj.state = {
			username: 'Homunculus',
			profileImage: 'assets/images/monsters/Homunculus-Awakened_Fire.jpg',
			isLogged: false
		}

		UserHelper.register(this, this.buildDataUser.bind(this))
	}

	unregister() {
		UserHelper.unregister(this)
	}

	buildDataUser() {
        let username = UserHelper.getData(AuthHelper.getEntityId() + '/username')
        let profileImage = UserHelper.getData(AuthHelper.getEntityId() + '/profileImage')
        
        let img = ImageHelper.getData(profileImage)
        if (!img) {
            ImageHelper.getImage(profileImage).
            then(function () {
                let img = ImageHelper.getData(profileImage)
                this.setState({
                    username: username || 'Homunculus',
                    profileImage: img,
                    isLogged: true
                })
            }.bind(this))
        } else {
            this.setState({
                username: username || 'Homunculus',
                profileImage: img,
                isLogged: true
            })
        }
	}

	onClickHome() {
		AppHelper.navigate('/');
	}

	onClickProfile() {
		AppHelper.navigate('/profile');
	}

	onClickPage(page) {
		this.obj.setState({activePage: page})
		AppHelper.navigate('/' + page);
	}

}
var AppObj = new AppData();
AppObj.PAGES = PAGES
export default AppObj;
