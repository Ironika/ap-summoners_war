import AppHelper from 'helpers/AppHelper';
import AuthHelper from 'helpers/AuthHelper';
import MonsterHelper from 'helpers/MonsterHelper';
import RuneHelper from 'helpers/RuneHelper';
import DefaultHelper from 'helpers/DefaultHelper';
import { BaseData }  from 'ap-react-bootstrap'

/* This class was auto-generated by the JavaScriptWriter */
class ImportData extends BaseData {

	register(obj) {
		super.register(obj)

		if(!AuthHelper.getEntityId()) {
            AppHelper.navigate("/")
        }
        
		this.obj.onClickImport = this.onClickImport.bind(this)

		this.obj.state = {
			upload: "Upload your file",
			fileInput: {},
			error: "",
		}
	}

	unregister() {

	}

	onChange() {
		this.setState({upload: this.getState('fileInput').files[0].name, error: ""})
	}

	onClickImport() {
		let f = this.getState('fileInput').files[0]; 

	    if (f) {
	      	let r = new FileReader();
	      	r.onload = function(e) { 
			    let contents = e.target.result;
			    
			    AppHelper.setBusy(true).
			    then(DefaultHelper.postUserImport.bind(DefaultHelper, {data: contents, userId: AuthHelper.getEntityId()})).
				then(function() {
				    	let promises = []
				    	promises.push(MonsterHelper.getUserMonsters(AuthHelper.getEntityId()))
						promises.push(RuneHelper.getUserRunes(AuthHelper.getEntityId()))
						return Promise.all(promises)
				}).
				then(AppHelper.navigate.bind(AppHelper, 'profile')).
				then(AppHelper.setBusy.bind(AppHelper, false)).
				catch(function() {
					this.setState({error: "An error has occured !"})
					AppHelper.setBusy(false)
				}.bind(this))

	      	}.bind(this)
	      	r.readAsText(f);
	    } else { 
	      	this.setState({error: "Choose your file !"})
	    }
	}


}
var ImportObj = new ImportData();
export default ImportObj;
