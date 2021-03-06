import { Validators } from 'ap-react-bootstrap'
import BuildState from 'utils/constants/BuildState'

/* This class was auto-generated by the JavaScriptWriter */
class BuildFields {

	static get RUNES_LVL() {
		return _RUNES_LVL
	}

	static get NAME() {
		return _NAME
	}

	static get STATE() {
		return _STATE
	}

	static get ID() {
		return _ID
	}

	static get USER_ID() {
		return _USER_ID
	}

	static get RUNES_STARS() {
		return _RUNES_STARS
	}

	static get VALUES() {
		return [
			_RUNES_LVL,
			_NAME,
			_STATE,
			_ID,
			_USER_ID,
			_RUNES_STARS,
		]
	}

	static get(id) {
		for (let i = 0 ; i < BuildFields.VALUES.length ; i++) {
			if (BuildFields.VALUES[i].key === id) {
				return BuildFields.VALUES[i]
			}
		}
	}

}
let _RUNES_LVL = {
	key: 'runesLvl',
	type: 'number',
}
let _NAME = {
	key: 'name',
	type: 'string',
}
let _STATE = {
	key: 'state',
	type: 'string',
	values: BuildState.VALUES,
}
let _ID = {
	key: 'id',
	type: 'string',
}
let _USER_ID = {
	key: 'userId',
	type: 'string',
}
let _RUNES_STARS = {
	key: 'runesStars',
	type: 'number',
}
export default BuildFields
