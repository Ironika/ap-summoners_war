package org.ap.summonerwar.optimizer.monster;

public class Monster {

	private long masterId;
	private long id;
	
	private String name;
	private EAttribute attribute;
	
	private int stars;
	private int level;
	
	private MonsterStats monsterStats;
	
	public Monster(long masterId, long id, String name, EAttribute attribute, int stars, int level, MonsterStats monsterStats) {
		this.setMasterId(masterId);
		this.setId(id);
		this.setName(name);
		this.setAttribute(attribute);
		this.setStars(stars);
		this.setLevel(level);
		this.setMonsterStats(monsterStats);
	}

	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append(this.name);
		return builder.toString();
	}
	
	public long getMasterId() { return masterId; }
	public void setMasterId(long masterId) { this.masterId = masterId; }

	public long getId() { return id; }
	public void setId(long id) { this.id = id; }

	public String getName() { return name; }
	public void setName(String name) { this.name = name; }

	public EAttribute getAttribute() { return attribute; }
	public void setAttribute(EAttribute attribute) { this.attribute = attribute; }

	public int getStars() { return stars; }
	public void setStars(int stars) { this.stars = stars; }

	public int getLevel() { return level; }
	public void setLevel(int level) { this.level = level; }

	public MonsterStats getMonsterStats() { return monsterStats; }
	public void setMonsterStats(MonsterStats monsterStats) { this.monsterStats = monsterStats; }
	
}
