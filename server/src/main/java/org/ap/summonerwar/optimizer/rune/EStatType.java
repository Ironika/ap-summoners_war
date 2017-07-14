package org.ap.summonerwar.optimizer.rune;

public enum EStatType {
	SPD,
	ATK,
	ATK_FLAT,
	HP,
	HP_FLAT,
	DEF,
	DEF_FLAT,
	CDMG,
	CRATE,
	ACC,
	RES;
	
	public static EStatType fromMarkup(String markup) {
		switch (markup) {
		case "SPD":
			return EStatType.SPD;
		case "ATK%":
			return EStatType.ATK;
		case "ATK flat":
			return EStatType.ATK_FLAT;
		case "HP%":
			return EStatType.HP;
		case "HP flat":
			return EStatType.HP_FLAT;
		case "DEF%":
			return EStatType.DEF;
		case "DEF flat":
			return EStatType.DEF_FLAT;
		case "CDmg":
			return EStatType.CDMG;
		case "CRate":
			return EStatType.CRATE;
		case "ACC":
			return EStatType.ACC;
		case "RES":
			return EStatType.RES;
		case "":
			return null;
		default:
			System.err.println("UNKNOW STAT TYPE:" + markup);
			return null;
		}
	}
	
	public static EStatType fromMarkup2(String markup) {
		switch (markup) {
		case "SPD":
			return EStatType.SPD;
		case "ATK":
			return EStatType.ATK;
		case "HP":
			return EStatType.HP;
		case "DEF":
			return EStatType.DEF;
		case "CDMG":
			return EStatType.CDMG;
		case "CRATE":
			return EStatType.CRATE;
		case "ACC":
			return EStatType.ACC;
		case "RES":
			return EStatType.RES;
		case "":
			return null;
		default:
			System.err.println("UNKNOW STAT TYPE:" + markup);
			return null;
		}
	}
	
	public static EStatType fromMarkup3(String markup) {
		switch (markup) {
		case "Spd":
			return EStatType.SPD;
		case "Atk":
			return EStatType.ATK;
		case "AtkFlat":
			return EStatType.ATK_FLAT;
		case "Hp":
			return EStatType.HP;
		case "HpFlat":
			return EStatType.HP_FLAT;
		case "Def":
			return EStatType.DEF;
		case "DefFlat":
			return EStatType.DEF_FLAT;
		case "Cdmg":
			return EStatType.CDMG;
		case "Crate":
			return EStatType.CRATE;
		case "Acc":
			return EStatType.ACC;
		case "Res":
			return EStatType.RES;
		case "":
			return null;
		default:
			System.err.println("UNKNOW STAT TYPE:" + markup);
			return null;
		}
	}
}
