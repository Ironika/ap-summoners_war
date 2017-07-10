package org.ap.summonerwar.optimizer.monster;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

public class MonsterStats {
	private int hp;
	private int atk;
	private int def;
	private int spd;
	private int crate;
	private int cdmg;
	private int res;
	private int acc;
	
	public MonsterStats(int hp, int atk, int def, int spd, int crate, int cdmg, int res, int acc) {
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
		builder.append("ATK: " + this.atk + "\n");
		builder.append("DEF: " + this.def + "\n");
		builder.append("SPD: " + this.spd + "\n");
		builder.append("CRATE: " + this.crate + "\n");
		builder.append("CDMG: " + this.cdmg + "\n");
		builder.append("RES: " + this.res + "\n");
		builder.append("ACC: " + this.acc + "\n");
		return builder.toString();
	}
	
	public JSONObject toJSON() throws JSONException {
		JSONObject result = new JSONObject();
		result.put("HP", this.hp);
		result.put("ATK", this.atk);
		result.put("DEF", this.def);
		result.put("SPD", this.spd);
		result.put("CRATE", this.crate);
		result.put("CDMG", this.cdmg);
		result.put("RES", this.res);
		result.put("ACC", this.acc);
		return result;
	}
	
	public int getHp() { return hp; }
	public void setHp(int hp) { this.hp = hp; }

	public int getAtk() { return atk; }
	public void setAtk(int atk) { this.atk = atk; }

	public int getDef() { return def; }
	public void setDef(int def) { this.def = def; }

	public int getSpd() { return spd; }
	public void setSpd(int spd) { this.spd = spd; }

	public int getCrate() { return crate; }
	public void setCrate(int crate) { this.crate = crate; }

	public int getCdmg() { return cdmg; }
	public void setCdmg(int cdmg) { this.cdmg = cdmg; }

	public int getRes() { return res; }
	public void setRes(int res) { this.res = res; }

	public int getAcc() { return acc; }
	public void setAcc(int acc) { this.acc = acc; }
	
}
