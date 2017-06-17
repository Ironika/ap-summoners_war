import AppHelper from 'helpers/AppHelper';
import UserHelper from 'helpers/UserHelper';
import MonsterHelper from 'helpers/MonsterHelper';
import RuneHelper from 'helpers/RuneHelper';
import AuthHelper from 'helpers/AuthHelper';

/* This class was auto-generated by the JavaScriptWriter */
class ProfileData {

	register(obj) {
		this.obj = obj
		this.init()
		UserHelper.register(this, this.buildData.bind(this, 'user'))
		MonsterHelper.register(this, this.buildData.bind(this, 'monster'))
		RuneHelper.register(this, this.buildData.bind(this, 'rune'))
		UserHelper.getUser(AuthHelper.getEntityId())
		MonsterHelper.getUserMonsters(AuthHelper.getEntityId())
		RuneHelper.getUserRunes(AuthHelper.getEntityId())
	}

	unregister() {
	}

	buildData(id) {
		if(id == 'user') {
			console.log(AuthHelper.getData())
			this.user = UserHelper.getData(AuthHelper.getEntityId())
			this.user.username = AuthHelper.getData().username
			this.user.mail = AuthHelper.getData().mail
			if(this.user) {
				this.obj.setState({user: this.user})
			}
		} else if(id == "monster"){
			this.monsters = Object.keys(MonsterHelper.getData()).length;
			if(this.monsters) {
				this.obj.setState({monsters: this.monsters})
			}
		} else {
			this.runes = Object.keys(RuneHelper.getData()).length;
			if(this.runes) {
				this.obj.setState({runes: this.runes})
			}
		}
	}

	onChange(id, event) {
		if (id == 'mail') {
			this.user.mail = event.target.value;
	    	this.obj.setState({user: this.user})
		} else if (id == 'name') {
			this.user.name = event.target.value;
	    	this.obj.setState({user: this.user});
		}
	}

	onClick() {
		this.user.username = this.name
		this.user.mail = this.mail
		UserHelper.putUser(this.user)
	}

	init() {
		this.user = {username: AuthHelper.getData().username, mail: AuthHelper.getData().mail }
		this.monsters = 0
		this.runes = 0
		this.builds = 0
		this.onClick = this.onClick.bind(this)
		this.onChange = this.onChange.bind(this)

		this.obj.setState({
			user: this.user, 
			monsters: this.monsters, 
			runes: this.runes, 
			builds: this.builds, 
			onChange: this.onChange,
			onClick: this.onClick,
		});
	}

}
var ProfileObj = new ProfileData();
export default ProfileObj;