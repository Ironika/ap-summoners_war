package org.ap.summonerwar.optimizer.monster;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

public class MonsterStats {
	private int hp;
	private char atk;
	private char def;
	private char spd;
	private char crate;
	private char cdmg;
	private char res;
	private char acc;
	
	public MonsterStats(int hp, char atk, char def, char spd, char crate, char cdmg, char res, char acc) {
		this.setHp(hp);
		this.setAtk(atk);
		this.setDef(def);
		this.setSpd(spd);
		this.setCrate(crate);
		this.setCdmg(cdmg);
		this.setRes(res);
		this.setAcc(acc);
	}
	
	public void reset() {
		this.hp = 0;
		this.atk = 0;
		this.def = 0;
		this.spd = 0;
		this.crate = 0;
		this.cdmg = 0;
		this.res = 0;
		this.acc = 0;
	}
	
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("HP: " + this.hp + "\n");
		builder.append("ATK: " + (int)this.atk + "\n");
		builder.append("DEF: " + (int)this.def + "\n");
		builder.append("SPD: " + (int)this.spd + "\n");
		builder.append("CRATE: " + (int)this.crate + "\n");
		builder.append("CDMG: " + (int)this.cdmg + "\n");
		builder.append("RES: " + (int)this.res + "\n");
		builder.append("ACC: " + (int)this.acc + "\n");
		return builder.toString();
	}
	
	public JSONObject toJSON() throws JSONException {
		JSONObject result = new JSONObject();
		result.put("HP", this.hp);
		result.put("ATK", (int)this.atk);
		result.put("DEF", (int)this.def);
		result.put("SPD", (int)this.spd);
		result.put("CRATE", (int)this.crate);
		result.put("CDMG", (int)this.cdmg);
		result.put("RES", (int)this.res);
		result.put("ACC", (int)this.acc);
		return result;
	}
	
	public int getHp() { return hp; }
	public void setHp(int hp) { this.hp = hp; }

	public char getAtk() { return atk; }
	public void setAtk(char atk) { this.atk = atk; }

	public char getDef() { return def; }
	public void setDef(char def) { this.def = def; }

	public char getSpd() { return spd; }
	public void setSpd(char spd) { this.spd = spd; }

	public char getCrate() { return crate; }
	public void setCrate(char crate) { this.crate = crate; }

	public char getCdmg() { return cdmg; }
	public void setCdmg(char cdmg) { this.cdmg = cdmg; }

	public char getRes() { return res; }
	public void setRes(char res) { this.res = res; }

	public char getAcc() { return acc; }
	public void setAcc(char acc) { this.acc = acc; }
	
}
