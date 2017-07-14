package org.ap.summonerwar.optimizer.monster;

public enum EAttribute {
	DARK,
	LIGHT,
	WIND,
	FIRE,
	WATER;
	
	public String getMarkup() {
		return name().toLowerCase();
	}
	
	public static EAttribute fromMarkup(String markup) {
		markup = markup.toLowerCase();
		for (EAttribute entry : values()) {
			if (entry.getMarkup().equals(markup)) {
				return entry;
			}
		}
		return null;
	}
}
