package org.ap.summonerwar.optimizer.stuff;

import org.ap.summonerwar.optimizer.rune.ERuneSet;
import org.ap.summonerwar.optimizer.rune.EStatType;
import org.ap.summonerwar.optimizer.rune.Rune;

public class Stuff {

	private Rune[] runes;
	private int[] bonus;
	private char[] set;
	
	public Stuff(Rune rune1, Rune rune2, Rune rune3, Rune rune4, Rune rune5, Rune rune6, int[] bonus) {
		this.setRunes(new Rune[6]);
		this.setBonus(bonus);
		this.setSet(new char[ERuneSet.values().length]);
		this.runes[0] = rune1;
		this.set[rune1.getSet().ordinal()]++;
		this.runes[1] = rune2;
		this.set[rune2.getSet().ordinal()]++;
		this.runes[2] = rune3;
		this.set[rune3.getSet().ordinal()]++;
		this.runes[3] = rune4;
		this.set[rune4.getSet().ordinal()]++;
		this.runes[4] = rune5;
		this.set[rune5.getSet().ordinal()]++;
		this.runes[5] = rune6;
		this.set[rune6.getSet().ordinal()]++;
	}
	
	public int computeBonusHp(int baseHp) {
		int bonusBySet = (int) (baseHp * (this.set[ERuneSet.ENERGY.ordinal()] / 2 * 0.15));
		return this.bonus[EStatType.HP_FLAT.ordinal()]  + (baseHp * this.bonus[EStatType.HP.ordinal()] / 100) + bonusBySet;
	}
	
	public int computeBonusAtk(int baseAtk) {
		int bonusBySet = (int) (baseAtk * (this.set[ERuneSet.FATAL.ordinal()] / 4 * 0.35));
		return this.bonus[EStatType.ATK_FLAT.ordinal()]  + (baseAtk * this.bonus[EStatType.ATK.ordinal()] / 100) + bonusBySet;
	} 
	
	public int computeBonusDef(int baseDef) {
		int bonusBySet = (int) (baseDef * (this.set[ERuneSet.GUARD.ordinal()] / 2 * 0.15));
		return this.bonus[EStatType.DEF_FLAT.ordinal()]  + (baseDef * this.bonus[EStatType.DEF.ordinal()] / 100) + bonusBySet;
	}
	
	public int computeSpd(int baseSpd) {
		int bonusBySet = (int) (baseSpd * (this.set[ERuneSet.SWIFT.ordinal()] / 4) * 0.25);
		return this.bonus[EStatType.SPD.ordinal()] + bonusBySet;
	}
	
	public int computeCrate() {
		return this.bonus[EStatType.CRATE.ordinal()] + ((this.set[ERuneSet.BLADE.ordinal()] / 2) * 12);
	}
	
	public int computeCdmg() {
		return this.bonus[EStatType.CDMG.ordinal()] + ((this.set[ERuneSet.RAGE.ordinal()] / 4) * 40);
	}
	
	public int computeRes() {
		return this.bonus[EStatType.RES.ordinal()] + ((this.set[ERuneSet.ENDURE.ordinal()] / 2) * 20);
	}
	
	public int computeAcc() {
		return this.bonus[EStatType.ACC.ordinal()] + ((this.set[ERuneSet.FOCUS.ordinal()] / 2) * 20);
	}
	
	public Rune[] getRunes() { return runes; }
	public void setRunes(Rune[] runes) { this.runes = runes; }

	public int[] getBonus() { return bonus; }
	public void setBonus(int[] bonus) { this.bonus = bonus; }

	public char[] getSet() { return set; }
	public void setSet(char[] set) { this.set = set; }
}
