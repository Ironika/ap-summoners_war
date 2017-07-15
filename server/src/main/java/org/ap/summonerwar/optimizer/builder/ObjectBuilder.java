package org.ap.summonerwar.optimizer.builder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.ap.summonerwar.optimizer.monster.EAttribute;
import org.ap.summonerwar.optimizer.monster.Monster;
import org.ap.summonerwar.optimizer.monster.MonsterStats;
import org.ap.summonerwar.optimizer.rune.ERuneSet;
import org.ap.summonerwar.optimizer.rune.EStatPos;
import org.ap.summonerwar.optimizer.rune.EStatType;
import org.ap.summonerwar.optimizer.rune.Rune;
import org.ap.summonerwar.optimizer.rune.Stat;
import org.ap.summonerwar.optimizer.team.Team;
import org.ap.summonerwar.optimizer.team.TeamMate;
import org.ap.summonerwar.storage.BuildData;
import org.ap.summonerwar.storage.MonsterCollection;
import org.ap.summonerwar.storage.MonsterConfigCollection;
import org.ap.summonerwar.storage.MonsterConfigData;
import org.ap.summonerwar.storage.MonsterData;
import org.ap.summonerwar.storage.RuneCollection;
import org.ap.summonerwar.storage.RuneData;
import org.ap.web.internal.APWebException;
import org.bson.Document;

public class ObjectBuilder {

	public static Team buildTeam(BuildData buildData) throws APWebException {
		Team team = new Team(buildData.getName());
		
		Document doc = new Document().append("buildId", buildData.getId());
		List<MonsterConfigData> configs = MonsterConfigCollection.get(doc);
		for (MonsterConfigData config : configs)
			team.addTeamMate(ObjectBuilder.buildTeamMate(config));
		return team;
	}
	
	public static TeamMate buildTeamMate(MonsterConfigData config) throws APWebException {
		MonsterData monsterData = MonsterCollection.getById(config.getMonsterId());
		Monster monster = ObjectBuilder.buildMonster(monsterData);
		TeamMate teamMate = new TeamMate(config.getId(), monster);
		teamMate.setRequiredStats(ObjectBuilder.buildRequiredStats(config));
		teamMate.setEvalStats(ObjectBuilder.buildEvalStats(config));
		teamMate.setRequiredSets(ObjectBuilder.buildRequiredSets(config));
		teamMate.setBrokenSet(config.getBrokenSet());
		return teamMate;
	}
	
	public static Monster buildMonster(MonsterData monsterData) throws APWebException {
		MonsterStats stats = new MonsterStats(monsterData.getHp(), monsterData.getAtk(), monsterData.getDef(), 
				monsterData.getSpd(), monsterData.getCrate(), monsterData.getCdmg(), monsterData.getRes(), monsterData.getAcc());
		Monster monster = new Monster(0, 0, monsterData.getName(), 
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
				requiredSets.put(type, requiredSets.get(type) + ObjectBuilder.getSetValue(type));
			else 
				requiredSets.put(type, ObjectBuilder.getSetValue(type));
		}
		if (config.getSet2() != null) {
			ERuneSet type = ERuneSet.fromMarkup(config.getSet2());
			if (requiredSets.containsKey(type))
				requiredSets.put(type, requiredSets.get(type) + ObjectBuilder.getSetValue(type));
			else 
				requiredSets.put(type, ObjectBuilder.getSetValue(type));
		}
		if (config.getSet3() != null) {
			ERuneSet type = ERuneSet.fromMarkup(config.getSet3());
			if (requiredSets.containsKey(type))
				requiredSets.put(type, requiredSets.get(type) + ObjectBuilder.getSetValue(type));
			else 
				requiredSets.put(type, ObjectBuilder.getSetValue(type));
		}
			
		return requiredSets;
	}
	
	public static int getSetValue(ERuneSet type) {
		if (type.equals(ERuneSet.RAGE) || type.equals(ERuneSet.VAMPIRE) || type.equals(ERuneSet.SWIFT)
				 || type.equals(ERuneSet.VIOLENT) || type.equals(ERuneSet.FATAL) || type.equals(ERuneSet.DESPAIR))
			return 4;
		return 2;
		
	}
	
	public static List<List<Rune>> buildSelectedRunes(String userId, BuildData buildData) throws APWebException {
		List<String> bannedRunes = ObjectBuilder.buildBannedRunes(userId);
		
		Document doc = new Document().append("userId", userId);
		List<RuneData> runeDatas = RuneCollection.get(doc);
		
		List<List<Rune>> selectedRunes = new ArrayList<List<Rune>>();
		selectedRunes.add(new ArrayList<Rune>());
		selectedRunes.add(new ArrayList<Rune>());
		selectedRunes.add(new ArrayList<Rune>());
		selectedRunes.add(new ArrayList<Rune>());
		selectedRunes.add(new ArrayList<Rune>());
		selectedRunes.add(new ArrayList<Rune>());
		
		for (RuneData runeData : runeDatas) {
			if (runeData.getLvl() >= buildData.getRunesLvl() && runeData.getStar() >= buildData.getRunesStars()) {
				if (!bannedRunes.contains(runeData.getId())) {
					Rune rune = ObjectBuilder.buildRune(runeData);
					selectedRunes.get(rune.getSlot() - 1).add(rune);
				}
			}
		}
		
		return selectedRunes;
	}
	
	public static Rune buildRune(RuneData runeData) throws APWebException {
		ERuneSet set = ERuneSet.fromMarkup(runeData.getSet());
		Stat[] stats = ObjectBuilder.buildRuneStats(runeData);
		MonsterData monsterData = MonsterCollection.getById(runeData.getMonsterId());
		String monsterName = null;
		if (monsterData != null)
			monsterName = monsterData.getName();
		Rune rune = new Rune(runeData.getId(), set, runeData.getStar(), runeData.getLvl(), Integer.parseInt(runeData.getPos()), monsterName, stats);
		return rune;
	}
	
	public static Stat[] buildRuneStats(RuneData runeData) {
		int nbStats = 0;		
		
		EStatType statType = EStatType.fromMarkup3(runeData.getStatMainType());
		Stat mainStat  = new Stat(statType, runeData.getStatMain(), EStatPos.MAIN, false, 0);
		nbStats++;
		Stat subMainStat = null;
		if (runeData.getStatSubType() != null) {
			statType = EStatType.fromMarkup3(runeData.getStatSubType());
			subMainStat  = new Stat(statType, runeData.getStatSub(), EStatPos.SUBMAIN, false, 0);
			nbStats++;
		}
		Stat s1Stat = null;
		if (runeData.getStat1Type() != null) {
			statType = EStatType.fromMarkup3(runeData.getStat1Type());
			s1Stat  = new Stat(statType, runeData.getStat1(), EStatPos.SUB1, false, 0);
			nbStats++;
		}
		Stat s2Stat = null;
		if (runeData.getStat2Type() != null) {
			statType = EStatType.fromMarkup3(runeData.getStat2Type());
			s2Stat  = new Stat(statType, runeData.getStat2(), EStatPos.SUB2, false, 0);
			nbStats++;
		}
		Stat s3Stat = null;
		if (runeData.getStat3Type() != null) {
			statType = EStatType.fromMarkup3(runeData.getStat3Type());
			s3Stat  = new Stat(statType, runeData.getStat3(), EStatPos.SUB3, false, 0);
			nbStats++;
		}
		Stat s4Stat = null;
		if (runeData.getStat4Type() != null) {
			statType = EStatType.fromMarkup3(runeData.getStat4Type());
			s4Stat  = new Stat(statType, runeData.getStat4(), EStatPos.SUB4, false, 0);
			nbStats++;
		}
		
		Stat[] stats = new Stat[nbStats];
		int statPos = 0;
		stats[statPos] = mainStat;
		statPos++;
		if (subMainStat != null) {
			stats[statPos] = subMainStat;
			statPos++;
		}
		if (s1Stat != null) {
			stats[statPos] = s1Stat;
			statPos++;
		}
		if (s2Stat != null) {
			stats[statPos] = s2Stat;
			statPos++;
		}
		if (s3Stat != null) {
			stats[statPos] = s3Stat;
			statPos++;
		}
		if (s4Stat != null) {
			stats[statPos] = s4Stat;
			statPos++;
		}			
		
		return stats;
	}
	
	public static List<String> buildBannedRunes(String userId) throws APWebException {
		List<String> bannedRunes = new ArrayList<String>();
		Document doc = new Document().append("userId", userId);
		List<MonsterData> monsterDatas = MonsterCollection.get(doc);
		for (MonsterData monsterData : monsterDatas) {
			if (monsterData.getIsLock() != null && monsterData.getIsLock() == true) {
				doc = new Document().append("monsterId", monsterData.getId());
				List<RuneData> runeDatas = RuneCollection.get(doc);
				for (RuneData runeData : runeDatas)
					bannedRunes.add(runeData.getId());
			}
		}
		System.out.println("BannedRunes: " + bannedRunes.size());
		return bannedRunes;
	}
}
