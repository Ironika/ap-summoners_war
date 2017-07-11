package org.ap.summonerwar.optimizer.builder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.ap.summonerwar.optimizer.monster.EAttribute;
import org.ap.summonerwar.optimizer.monster.Monster;
import org.ap.summonerwar.optimizer.monster.MonsterStats;
import org.ap.summonerwar.optimizer.rune.ERuneSet;
import org.ap.summonerwar.optimizer.rune.EStatType;
import org.ap.summonerwar.optimizer.team.Team;
import org.ap.summonerwar.optimizer.team.TeamMate;
import org.ap.summonerwar.storage.BuildCollection;
import org.ap.summonerwar.storage.BuildData;
import org.ap.summonerwar.storage.MonsterCollection;
import org.ap.summonerwar.storage.MonsterConfigCollection;
import org.ap.summonerwar.storage.MonsterConfigData;
import org.ap.summonerwar.storage.MonsterData;
import org.ap.web.internal.APWebException;
import org.bson.Document;

public class Builder {

	public static Team buildTeam(String buildId) throws APWebException {
		BuildData buildData = BuildCollection.getById(buildId);
		Team team = new Team(buildData.getName());
		
		Document doc = new Document().append("buildId", buildData.getId());
		List<MonsterConfigData> configs = MonsterConfigCollection.get(doc);
		for (MonsterConfigData config : configs)
			team.addTeamMate(Builder.buildTeamMate(config));
		return team;
	}
	
	public static TeamMate buildTeamMate(MonsterConfigData config) throws APWebException {
		MonsterData monsterData = MonsterCollection.getById(config.getMonsterId());
		Monster monster = Builder.buildMonster(monsterData);
		TeamMate teamMate = new TeamMate(monster);
		teamMate.setRequiredStats(Builder.buildRequiredStats(config));
		teamMate.setEvalStats(Builder.buildEvalStats(config));
		teamMate.setRequiredSets(Builder.buildRequiredSets(config));
		teamMate.setBrokenSet(false);
		return null;
	}
	
	public static Monster buildMonster(MonsterData monsterData) throws APWebException {
		MonsterStats stats = new MonsterStats(monsterData.getHp(), monsterData.getAtk(), monsterData.getDef(), 
				monsterData.getSpd(), monsterData.getCrate(), monsterData.getCdmg(), monsterData.getRes(), monsterData.getAcc());
		Monster monster = new Monster(Long.parseLong(monsterData.getUserId()), Long.parseLong(monsterData.getId()), monsterData.getName(), 
				EAttribute.fromMarkup(monsterData.getElemType()), monsterData.getStar(), monsterData.getLvl(), stats);
		return monster;
	}
	
	public static Map<EStatType, Integer> buildRequiredStats(MonsterConfigData config) {
		Map<EStatType, Integer> requiredStats = new HashMap<EStatType, Integer>();
		if (config.getRequiredHp() != null && config.getRequiredHp() > 0)
			requiredStats.put(EStatType.fromMarkup2("HP"), config.getRequiredHp());
		if (config.getRequiredAtk() != null && config.getRequiredAtk() > 0)
			requiredStats.put(EStatType.fromMarkup2("ATK"), config.getRequiredAtk());
		if (config.getRequiredDef() != null && config.getRequiredDef() > 0)
			requiredStats.put(EStatType.fromMarkup2("DEF"), config.getRequiredDef());
		if (config.getRequiredSpd() != null && config.getRequiredSpd() > 0)
			requiredStats.put(EStatType.fromMarkup2("SPD"), config.getRequiredSpd());
		if (config.getRequiredCrate() != null && config.getRequiredCrate() > 0)
			requiredStats.put(EStatType.fromMarkup2("CRATE"), config.getRequiredCrate());
		if (config.getRequiredCdmg() != null && config.getRequiredCdmg() > 0)
			requiredStats.put(EStatType.fromMarkup2("CDMG"), config.getRequiredCdmg());
		if (config.getRequiredAcc() != null && config.getRequiredAcc() > 0)
			requiredStats.put(EStatType.fromMarkup2("ACC"), config.getRequiredAcc());
		if (config.getRequiredRes() != null && config.getRequiredRes() > 0)
			requiredStats.put(EStatType.fromMarkup2("RES"), config.getRequiredRes());
		return requiredStats;
	}
	
	public static Map<EStatType, Integer> buildEvalStats(MonsterConfigData config) {
		Map<EStatType, Integer> evalStats = new HashMap<EStatType, Integer>();
		if (config.getNotationHp() != null && config.getNotationHp() > 0)
			evalStats.put(EStatType.fromMarkup2("HP"), config.getNotationHp());
		if (config.getNotationAtk() != null && config.getNotationAtk() > 0)
			evalStats.put(EStatType.fromMarkup2("ATK"), config.getNotationAtk());
		if (config.getNotationDef() != null && config.getNotationDef() > 0)
			evalStats.put(EStatType.fromMarkup2("DEF"), config.getNotationDef());
		if (config.getNotationSpd() != null && config.getNotationSpd() > 0)
			evalStats.put(EStatType.fromMarkup2("SPD"), config.getNotationSpd());
		if (config.getNotationCrate() != null && config.getNotationCrate() > 0)
			evalStats.put(EStatType.fromMarkup2("CRATE"), config.getNotationCrate());
		if (config.getNotationCdmg() != null && config.getNotationCdmg() > 0)
			evalStats.put(EStatType.fromMarkup2("CDMG"), config.getNotationCdmg());
		if (config.getNotationAcc() != null && config.getNotationAcc() > 0)
			evalStats.put(EStatType.fromMarkup2("ACC"), config.getNotationAcc());
		if (config.getNotationRes() != null && config.getNotationRes() > 0)
			evalStats.put(EStatType.fromMarkup2("RES"), config.getNotationRes());
		return evalStats;
	}
	
	public static Map<ERuneSet, Integer> buildRequiredSets(MonsterConfigData config) {
		Map<ERuneSet, Integer> requiredSets = new HashMap<ERuneSet, Integer>();
		if (config.getSet1() != null) {
			ERuneSet type = ERuneSet.fromMarkup(config.getSet1());
			if (requiredSets.containsKey(type))
				requiredSets.put(type, requiredSets.get(type) + Builder.getSetValue(type));
			else 
				requiredSets.put(type, Builder.getSetValue(type));
		}
		if (config.getSet2() != null) {
			ERuneSet type = ERuneSet.fromMarkup(config.getSet2());
			if (requiredSets.containsKey(type))
				requiredSets.put(type, requiredSets.get(type) + Builder.getSetValue(type));
			else 
				requiredSets.put(type, Builder.getSetValue(type));
		}
		if (config.getSet3() != null) {
			ERuneSet type = ERuneSet.fromMarkup(config.getSet3());
			if (requiredSets.containsKey(type))
				requiredSets.put(type, requiredSets.get(type) + Builder.getSetValue(type));
			else 
				requiredSets.put(type, Builder.getSetValue(type));
		}
			
		return requiredSets;
	}
	
	public static int getSetValue(ERuneSet type) {
		if (type.equals(ERuneSet.RAGE) || type.equals(ERuneSet.VAMPIRE) || type.equals(ERuneSet.SWIFT)
				 || type.equals(ERuneSet.VIOLENT) || type.equals(ERuneSet.FATAL) || type.equals(ERuneSet.DESPAIR))
			return 4;
		return 2;
		
	}
	
}
