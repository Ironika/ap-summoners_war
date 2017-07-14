package org.ap.summonerwar.optimizer.rune;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

public class Rune {

	private String id;
	private ERuneSet set;
	private int stars;
	private int level;
	private int slot;
	private String monster;
	
	private Stat[] stats;

	
	public Rune(String id, ERuneSet set, int stars, int level, int slot, String monster, Stat[] stats) {
		this.setId(id);
		this.setSet(set);
		this.setStars(stars);
		this.setLevel(level);
		this.setSlot(slot);
		this.setMonster(monster);
		this.setStats(stats);
	}
	
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("id: ").append(id).append("\n");
		builder.append("set: ").append(set).append("\n");
		builder.append("stars: ").append(stars).append("\n");
		builder.append("level: ").append(level).append("\n");
		builder.append("slot: ").append(slot).append("\n");
		for (Stat stat : this.stats) {
			builder.append(stat).append("\n");
		}
		builder.append("location: ");
		if (this.monster == null || this.monster.equals("Unknown name"))
			builder.append("storage").append("\n");
		else
			builder.append(this.monster).append("\n");
		return builder.toString();
	}
	
	public JSONObject toJSON() throws JSONException {
		JSONObject result = new JSONObject();
		result.put("stars", this.stars);
		result.put("level", this.level);
		result.put("slot", this.slot);
		result.put("set", this.set);
		if (this.monster == null || this.monster.equals("Unknown name"))
			result.put("location", "storage");
		else
			result.put("location", this.monster);
		JSONArray stats = new JSONArray(); 
		for (Stat stat : this.stats) {
			stats.put(stat.toJSON());
		}
		result.put("stats", stats);
		return result;
	}
	
	public String getId() { return id; }
	public void setId(String id) { this.id = id; }

	public ERuneSet getSet() { return set; }
	public void setSet(ERuneSet set) { this.set = set; }

	public int getStars() { return stars; }
	public void setStars(int stars) { this.stars = stars; }

	public int getLevel() { return level; }
	public void setLevel(int level) { this.level = level; }

	public Stat[] getStats() { return stats; }
	public void setStats(Stat[] stats) { this.stats = stats; }

	public int getSlot() { return slot; }
	public void setSlot(int slot) { this.slot = slot; }

	public String getMonster() { return monster; }
	public void setMonster(String monster) { this.monster = monster; }
	
}
