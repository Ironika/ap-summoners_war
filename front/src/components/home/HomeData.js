import AppHelper from 'helpers/AppHelper'
import { Dispatcher } from 'ap-flux'

class HomeData {

	register(obj) {
		this.obj = obj
		this.isLoginCompo = true
		this.onClick = this.onClick.bind(this)
		this.obj.setState({isLoginCompo: this.isLoginCompo, onClick: this.onClick})
	}

	unregister() {
	}

	onClick() {
		this.isLoginCompo = !this.isLoginCompo
		this.obj.setState({isLoginCompo: this.isLoginCompo})
	}

}
var HomeObj = new HomeData()
export default HomeObj
