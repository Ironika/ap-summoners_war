package org.ap.summonerwar.optimizer.stuff;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.PriorityQueue;

import org.ap.summonerwar.optimizer.monster.Monster;
import org.ap.summonerwar.optimizer.monster.MonsterStats;
import org.ap.summonerwar.optimizer.monster.StuffedMonster;
import org.ap.summonerwar.optimizer.rune.ERuneSet;
import org.ap.summonerwar.optimizer.rune.EStatType;
import org.ap.summonerwar.optimizer.rune.Rune;
import org.ap.summonerwar.optimizer.team.Team;
import org.ap.summonerwar.optimizer.team.TeamMate;

public class StuffSelector {

	public static boolean checkNoBrokenSet(Stuff stuff) {
		for (ERuneSet runeset : ERuneSet.values()) {
			if (runeset == ERuneSet.SWIFT || runeset == ERuneSet.FATAL || runeset == ERuneSet.DESPAIR || runeset == ERuneSet.VIOLENT || runeset == ERuneSet.VAMPIRE) {
				if (stuff.getSet()[runeset.ordinal()] % 4 != 0)
					return false;
			} else {
				if (stuff.getSet()[runeset.ordinal()] % 2 != 0)
					return false;
			}
		}
		return true;
	}
	
	public static StuffedMonster goodStuff(Stuff stuff, Monster monster, Map<EStatType, Integer> requiredStatsEntrySet, Map<ERuneSet, Integer> requiredSetsEntrySet, boolean brokenSet, MonsterStats maxStats, int[] failures) {
		MonsterStats statsBonus = new MonsterStats(-1, -1, -1, -1, -1, -1, -1, -1);
		MonsterStats finalStats = new MonsterStats(0, 0, 0, 0, 0, 0, 0, 0);
		
		if (!brokenSet && !StuffSelector.checkNoBrokenSet(stuff)) {
			failures[8]++;
			return null;
		}
			
		
		for (Entry<ERuneSet, Integer> set : requiredSetsEntrySet.entrySet()) {
			if (!(stuff.getSet()[set.getKey().ordinal()] >= set.getValue())) {
				failures[8]++;
				return null;
			}	
		}
		
		for (Entry<EStatType, Integer> requiredStat : requiredStatsEntrySet.entrySet()) {
			EStatType type = requiredStat.getKey();
			int value = requiredStat.getValue();
			
			if (type == EStatType.HP) {
				statsBonus.setHp(stuff.computeBonusHp(monster.getMonsterStats().getHp()));
				finalStats.setHp(statsBonus.getHp() + monster.getMonsterStats().getHp());
				if (finalStats.getHp() < value) {
					failures[0]++;
					return null;
				}
					
			} else if (type == EStatType.ATK) {
				statsBonus.setAtk(stuff.computeBonusAtk(monster.getMonsterStats().getAtk()));
				finalStats.setAtk(statsBonus.getAtk() + monster.getMonsterStats().getAtk());
				if (finalStats.getAtk() < value){
					failures[1]++;
					return null;
				}
			} else if (type == EStatType.DEF) {
				statsBonus.setDef(stuff.computeBonusDef(monster.getMonsterStats().getDef()));
				finalStats.setDef(statsBonus.getDef() + monster.getMonsterStats().getDef());
				if (finalStats.getDef() < value){
					failures[2]++;
					return null;
				}
			} else if (type == EStatType.SPD) {
				statsBonus.setSpd(stuff.computeSpd(monster.getMonsterStats().getSpd()));
				finalStats.setSpd(statsBonus.getSpd() + monster.getMonsterStats().getSpd());
				if (finalStats.getSpd() < value){
					failures[3]++;
					return null;
				}
			} else if (type == EStatType.CRATE) {
				statsBonus.setCrate(stuff.computeCrate());
				finalStats.setCrate(statsBonus.getCrate() + monster.getMonsterStats().getCrate());
				if (finalStats.getCrate() < value){
					failures[4]++;
					return null;
				}
			} else if (type == EStatType.CDMG) {
				statsBonus.setCdmg(stuff.computeCdmg());
				finalStats.setCdmg(statsBonus.getCdmg() + monster.getMonsterStats().getCdmg());
				if (finalStats.getCdmg() < value){
					failures[5]++;
					return null;
				}
			} else if (type == EStatType.RES) {
				statsBonus.setRes(stuff.computeRes());
				finalStats.setRes(statsBonus.getRes() + monster.getMonsterStats().getRes());
				if (finalStats.getRes() < value){
					failures[6]++;
					return null;
				}
			} else if (type == EStatType.ACC) {
				statsBonus.setAcc(stuff.computeAcc());
				finalStats.setAcc(statsBonus.getAcc() + monster.getMonsterStats().getAcc());
				if (finalStats.getAcc() < value){
					failures[7]++;
					return null;
				}
			}
		}
		
		if (statsBonus.getHp() == -1) {
			statsBonus.setHp(stuff.computeBonusHp(monster.getMonsterStats().getHp()));
			finalStats.setHp(statsBonus.getHp() + monster.getMonsterStats().getHp());
		}
		if (statsBonus.getAtk() == -1) {
			statsBonus.setAtk(stuff.computeBonusAtk(monster.getMonsterStats().getAtk()));
			finalStats.setAtk(statsBonus.getAtk() + monster.getMonsterStats().getAtk());
		}
		if (statsBonus.getDef() == -1) {
			statsBonus.setDef(stuff.computeBonusDef(monster.getMonsterStats().getDef()));
			finalStats.setDef(statsBonus.getDef() + monster.getMonsterStats().getDef());
		}
		if (statsBonus.getSpd() == -1) {
			statsBonus.setSpd(stuff.computeSpd(monster.getMonsterStats().getSpd()));
			finalStats.setSpd(statsBonus.getSpd() + monster.getMonsterStats().getSpd());
		}
		if (statsBonus.getCrate() == -1) {
			statsBonus.setCrate(stuff.computeCrate());
			finalStats.setCrate(statsBonus.getCrate() + monster.getMonsterStats().getCrate());
		}
		if (statsBonus.getCdmg() == -1) {
			statsBonus.setCdmg(stuff.computeCdmg());
			finalStats.setCdmg(statsBonus.getCdmg() + monster.getMonsterStats().getCdmg());
		}
		if (statsBonus.getRes() == -1) {
			statsBonus.setRes(stuff.computeRes());
			finalStats.setRes(statsBonus.getRes() + monster.getMonsterStats().getRes());
		}
		if (statsBonus.getAcc() == -1) {
			statsBonus.setAcc(stuff.computeAcc());
			finalStats.setAcc(statsBonus.getAcc() + monster.getMonsterStats().getAcc());
		}
		
		if (maxStats.getHp() < finalStats.getHp())
			maxStats.setHp(finalStats.getHp());
		if (maxStats.getAtk() < finalStats.getAtk())
			maxStats.setAtk(finalStats.getAtk());
		if (maxStats.getDef() < finalStats.getDef())
			maxStats.setDef(finalStats.getDef());
		if (maxStats.getSpd() < finalStats.getSpd())
			maxStats.setSpd(finalStats.getSpd());
		if (maxStats.getCrate() < finalStats.getCrate())
			maxStats.setCrate(finalStats.getCrate());
		if (maxStats.getCdmg() < finalStats.getCdmg())
			maxStats.setCdmg(finalStats.getCdmg());
		if (maxStats.getRes() < finalStats.getRes())
			maxStats.setRes(finalStats.getRes());
		if (maxStats.getAcc() < finalStats.getAcc())
			maxStats.setAcc(finalStats.getAcc());
		
		StuffedMonster stuffedMonster = new StuffedMonster(monster, stuff, statsBonus, finalStats);
		return stuffedMonster;
	}
	
	public static List<StuffNode> selectStuffsForTeam(Team team) {
		List<TeamMate> teamMates = team.getTeamMates();
		
		List<StuffNode> currentNodes = new ArrayList<>();
		TeamMate teamMate = teamMates.get(0);
		double bestEval = teamMate.getSelectedStuff()[0].getEval();
		for (int j = 0; j < teamMate.getSelectedStuff().length; j++) {
			StuffedMonster currentMonster = teamMate.getSelectedStuff()[j];
			currentNodes.add(new StuffNode(null, currentMonster, currentMonster.getEval() / bestEval));
			
		}
		
		
		for (int i = 1; i < teamMates.size(); i++) {
			teamMate = teamMates.get(i);
			bestEval = teamMate.getSelectedStuff()[0].getEval();
			
			PriorityQueue<StuffNode> selecteds = new PriorityQueue<StuffNode>(new Comparator<StuffNode>() {

				@Override
				public int compare(StuffNode o1, StuffNode o2) {
					if (o2.totalEval() < o1.totalEval())
						return -1;
					else
						return 1;
				}
			});
			
			for (StuffNode currentNode : currentNodes) {
				for (int j = 0; j < teamMate.getSelectedStuff().length; j++) {
					StuffedMonster currentMonster = teamMate.getSelectedStuff()[j];
					
					StuffNode parentNode = currentNode;
					boolean add = true;
					while (parentNode != null) {
						if (StuffSelector.haveSameRune(currentMonster, parentNode.getStuffedMonster())) {
							add = false;
							break;
						}
						parentNode = parentNode.getParent();
					}
					if (add)
						selecteds.add(new StuffNode(currentNode, currentMonster, currentMonster.getEval() / bestEval));
				}
			}
			currentNodes.clear();
			int selectedsCount = selecteds.size() < 16000 ? selecteds.size() : 16000;
			for (int j = 0; j < selectedsCount; j++) {
				currentNodes.add(selecteds.poll());
			}
		}
		return currentNodes;
	}
	
	public static boolean haveSameRune(StuffedMonster monster1, StuffedMonster monster2) {
		for (Rune rune1 : monster1.getStuff().getRunes())
			for (Rune rune2 : monster2.getStuff().getRunes())
				if (rune1 == rune2)
					return true;
		return false;
	}
	
}
