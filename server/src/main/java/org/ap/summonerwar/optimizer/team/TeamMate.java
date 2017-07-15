package org.ap.summonerwar.optimizer.team;
import java.util.HashMap;
import java.util.Map;

import org.ap.summonerwar.optimizer.monster.Monster;
import org.ap.summonerwar.optimizer.monster.StuffedMonster;
import org.ap.summonerwar.optimizer.rune.ERuneSet;
import org.ap.summonerwar.optimizer.rune.EStatType;

public class TeamMate {

	private String id;
	private Map<EStatType, Integer> requiredStats;
	private Map<EStatType, Integer> evalStats;
	private Map<ERuneSet, Integer> requiredSets;
	private Monster monster;
	private boolean brokenSet;
	
	private StuffedMonster[] selectedStuff;
	
	public TeamMate(String id, Monster monster) {
		this.setId(id);
		this.setRequiredStats(new HashMap<EStatType, Integer>());
		this.setEvalStats(new HashMap<EStatType, Integer>());
		this.setSelectedStuff(new StuffedMonster[0]);
		this.setRequiredSets(new HashMap<ERuneSet, Integer>());
		this.setMonster(monster);
		this.setBrokenSet(true);
	}

	public void addRequiredStat(EStatType type, int value) {
		this.requiredStats.put(type, value);
	}
	
	public void addEvalStat(EStatType type, int value) {
		this.evalStats.put(type, value);
	}
	
	public void addRequiredSet(ERuneSet type, int value) {
		this.requiredSets.put(type, value);
	}
	
	public Map<EStatType, Integer> getRequiredStats() { return requiredStats; }
	public void setRequiredStats(Map<EStatType, Integer> requiredStats) { this.requiredStats = requiredStats; }

	public Monster getMonster() { return monster; }
	public void setMonster(Monster monster) { this.monster = monster; }

	public StuffedMonster[] getSelectedStuff() { return selectedStuff; }
	public void setSelectedStuff(StuffedMonster[] selectedStuff) { this.selectedStuff = selectedStuff; }

	public Map<EStatType, Integer> getEvalStats() { return evalStats; }
	public void setEvalStats(Map<EStatType, Integer> evalStats) { this.evalStats = evalStats; }

	public Map<ERuneSet, Integer> getRequiredSets() { return requiredSets; }
	public void setRequiredSets(Map<ERuneSet, Integer> requiredSets) { this.requiredSets = requiredSets; }

	public boolean isBrokenSet() { return brokenSet; }
	public void setBrokenSet(boolean brokenSet) { this.brokenSet = brokenSet; }

	public String getId() { return id; }
	public void setId(String id) { this.id = id; }
	
}
