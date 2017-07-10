package org.ap.summonerwar.optimizer.rune;
public enum ERuneSet {
	ENERGY,
	FATAL,
	BLADE,
	SWIFT,
	FOCUS,
	DESPAIR,
	VIOLENT,
	SHIELD,
	WILL,
	RAGE,
	REVENGE,
	NEMESIS,
	ENDURE,
	VAMPIRE,
	GUARD,
	DESTROY,
	FIGHT,
	DETERMINATION,
	ENHANCE,
	ACCURACY,
	TOLERANCE;
	
	public String getMarkup() {
		return name().toLowerCase();
	}
	
	public static ERuneSet fromMarkup(String markup) {
		markup = markup.toLowerCase();
		for (ERuneSet entry : values()) {
			if (entry.getMarkup().equals(markup)) {
				return entry;
			}
		}
		return null;
	}
}
