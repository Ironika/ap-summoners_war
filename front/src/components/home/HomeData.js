import AppHelper from 'helpers/AppHelper';
import { Dispatcher } from 'ap-flux';

/* This class was auto-generated by the JavaScriptWriter */
class HomeData {

	register(obj) {
		this.obj = obj

		this.init();
	}

	unregister() {
	}

	onClick() {
		this.isLoginCompo = !this.isLoginCompo
		this.obj.setState({isLoginCompo: this.isLoginCompo})
	}

	init() {
		this.isLoginCompo = true
		this.onClick = this.onClick.bind(this)
		this.obj.setState({isLoginCompo: this.isLoginCompo, onClick: this.onClick})
	}
}
var HomeObj = new HomeData();
export default HomeObj;
