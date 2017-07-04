import AppHelper from 'helpers/AppHelper'
import AuthHelper from 'helpers/AuthHelper'
import BuildHelper from 'helpers/BuildHelper'
import ImageHelper from 'helpers/ImageHelper'
import MonsterHelper from 'helpers/MonsterHelper'
import RuneHelper from 'helpers/RuneHelper'
import UserHelper from 'helpers/UserHelper'

import { BaseData, MomentHelper } from 'ap-react-bootstrap'

class ProfileData extends BaseData {

	register(obj) {
        super.register(obj)

        if(!AuthHelper.getEntityId()) {
            AppHelper.navigate("/")
        }

        this.obj.onClick = this.onClick.bind(this)
        this.obj.onChangeUpload = this.onChangeUpload.bind(this)
        this.obj.onSendImage = this.onSendImage.bind(this)

        this.obj.state = {
            upload: "Upload your picture",
            fileInput: {},
            username: '', 
            email: '', 
            lastImport: '',
            monsters: 0,
            runes: 0, 
            builds: 0
        }

        this.buildDataUser()
        this.buildDataMonster()
        this.buildDataRune()
        this.buildDataBuild()
	}
	unregister() {
	}

	buildDataUser() {
        let username = UserHelper.getData(AuthHelper.getEntityId() + '/username')
        let email = UserHelper.getData(AuthHelper.getEntityId() + '/email')
        let lastImport = UserHelper.getData(AuthHelper.getEntityId() + '/lastImport')
		this.setState({
            username: username || '',
            email: email || '',
            lastImport: lastImport ? MomentHelper.localDateToHumanDate(lastImport) : '',
        })
	}
    buildDataMonster(id) {
        this.setState({
            monsters: (Object.keys(MonsterHelper.getData() || {})).length
        })
    }
    buildDataRune(id) {
        this.setState({
            runes: (Object.keys(RuneHelper.getData() || {})).length
        })
    }
    buildDataBuild(id) {
        this.setState({
            builds: (Object.keys(BuildHelper.getData() || {})).length
        })
    }

	onClick() {
		UserHelper.putUser({
            username: this.getState('username'),
            email: this.getState('email')
        })
	}

    onChangeUpload() {
        this.setState({upload: this.getState('fileInput').files[0].name})

        // let data = {
        //     file: this.getState('fileInput').files[0],
        //     name: this.getState('fileInput').files[0].name
        // }
        // ImageHelper.postImage(data).then(
        //     UserHelper.put({profileImage: })
        // )
    }

    onSendImage() {
        let file = this.getState('fileInput').files[0]
        ImageHelper.postImage({
            name: file.name,
            file: file
        }).
        then(this._handleImageSent).
        then(UserHelper.getUser.bind(UserHelper, AuthHelper.getEntityId())).
        catch(function(error) {
            console.error(error)
        })
    }

    _handleImageSent(result) {
        let user = UserHelper.getData(AuthHelper.getEntityId())
        user.profileImage = result.id
        return UserHelper.putUser(user)
    }

}
let ProfileObj = new ProfileData()
export default ProfileObj
