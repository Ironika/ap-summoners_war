package org.ap.summonerwar.optimizer.monster;
import java.util.Map;

import org.ap.summonerwar.optimizer.rune.EStatType;
import org.ap.summonerwar.optimizer.rune.Rune;
import org.ap.summonerwar.optimizer.stuff.Stuff;
import org.ap.summonerwar.optimizer.team.TeamMate;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;


public class StuffedMonster {
	
	private TeamMate teamMate;
	private Stuff stuff;
	private MonsterStats bonusStats;
	private MonsterStats finalStats;
	
	private double eval = -1;
	
	public StuffedMonster(TeamMate teamMate, Stuff stuff, MonsterStats bonusStats, MonsterStats finalStats) {
		this.setTeamMate(teamMate);
		this.setStuff(stuff);
		this.setBonusStats(bonusStats);
		this.setFinalStats(finalStats);
	}

	public double eval(MonsterStats maxStats, Map<EStatType, Integer> evalStats) {
		if (eval == -1) {
			eval = 0;
			if (evalStats.containsKey(EStatType.HP))
				eval += (double)finalStats.getHp() / (double)maxStats.getHp();
			if (evalStats.containsKey(EStatType.ATK))
				eval += (double)finalStats.getAtk() / (double)maxStats.getAtk();
			if (evalStats.containsKey(EStatType.DEF))
				eval += (double)finalStats.getDef() /(double) maxStats.getDef();
			if (evalStats.containsKey(EStatType.SPD))
				eval += (double)finalStats.getSpd() /(double) maxStats.getSpd();
			if (evalStats.containsKey(EStatType.CRATE))
				eval += (double)finalStats.getCrate() / (double)maxStats.getCrate();
			if (evalStats.containsKey(EStatType.CDMG))
				eval += (double)finalStats.getCdmg() / (double)maxStats.getCdmg();
			if (evalStats.containsKey(EStatType.RES))
				eval += (double)finalStats.getRes() / (double)maxStats.getRes();
			if (evalStats.containsKey(EStatType.ACC))
				eval += (double)finalStats.getAcc() / (double)maxStats.getAcc();
		}
		return eval;
	}
	
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append(this.eval);
		return builder.toString();
	}
	
	public JSONObject toJSON() throws JSONException {
		JSONObject result = new JSONObject();
		result.put("name", this.getMonster().getName());
		result.put("stats", this.finalStats.toJSON());
		JSONArray runes = new JSONArray();
		for (Rune rune : this.stuff.getRunes()) {
			runes.put(rune.toJSON());
		}
		result.put("runes", runes);
		return result;
	}
	
	public Monster getMonster() { return this.teamMate.getMonster(); }

	public MonsterStats getBonusStats() { return bonusStats; }
	public void setBonusStats(MonsterStats bonusStats) { this.bonusStats = bonusStats; }

	public MonsterStats getFinalStats() { return finalStats; }
	public void setFinalStats(MonsterStats finalStats) { this.finalStats = finalStats; }

	public Stuff getStuff() { return stuff; }
	public void setStuff(Stuff stuff) { this.stuff = stuff; }

	public double getEval() { return eval; }
	public void setEval(long eval) { this.eval = eval; }

	public TeamMate getTeamMate() { return teamMate; }
	public void setTeamMate(TeamMate teamMate) { this.teamMate = teamMate; }
	
}
