package org.ap.summonerwar.constants;

/* This class was auto-generated by the JavaWriter */
public enum ESetType {

	_ENERGY ("Energy"),
	_SWIFT ("Swift"),
	_FATAL ("Fatal"),
	_RAGE ("Rage"),
	_VAMPIRE ("Vampire"),
	_FOCUS ("Focus"),
	_GUARD ("Guard"),
	_SHIELD ("Shield"),
	_REVENGE ("Revenge"),
	_WILL ("Will"),
	_NEMESIS ("Nemesis"),
	_DESTROY ("Destroy"),
	_DESPAIR ("Despair"),
	_VIOLENT ("Violent"),
	_FIGHT ("Fight"),
	_DETERMINATION ("Determination"),
	_ENHANCE ("Enhance"),
	_ACCURACY ("Accuracy"),
	_TOLERANCE ("Tolerance"),
	_BLADE ("Blade"),
	_ENDURE ("Endure"),
	;

	private String _name;

	private  ESetType(String name) {
		_name = name;
	}

	public String getName() {
		return _name;
	}

	public static ESetType getByName(String name) {
		for (ESetType value: ESetType.values()) {
			if (value.getName().equals(name)) {
				return value;
			}
		}
		return null;
	}

}
