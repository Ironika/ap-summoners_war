
/* This class was auto-generated by the JavaScriptWriter */
class BuildState {

	static get SAVE() {
		return _SAVE
	}

	static get INBUILDING() {
		return _INBUILDING
	}

	static get BUILD() {
		return _BUILD
	}

	static get VALUES() {
		return [
			_SAVE,
			_INBUILDING,
			_BUILD,
		]
	}

	static get(id) {
		return id && BuildState[id.toUpperCase()]
	}

}
let _SAVE = { key: 'Save' }
let _INBUILDING = { key: 'InBuilding' }
let _BUILD = { key: 'Build' }
export default BuildState