package org.ap.summonerwar.optimizer.stuff;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.PriorityQueue;
import java.util.TreeSet;

import org.ap.summonerwar.optimizer.monster.Monster;
import org.ap.summonerwar.optimizer.monster.MonsterStats;
import org.ap.summonerwar.optimizer.monster.StuffedMonster;
import org.ap.summonerwar.optimizer.rune.ERuneSet;
import org.ap.summonerwar.optimizer.rune.EStatType;
import org.ap.summonerwar.optimizer.rune.Rune;
import org.ap.summonerwar.optimizer.team.Team;
import org.ap.summonerwar.optimizer.team.TeamMate;

import jersey.repackaged.com.google.common.collect.Lists;

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
	
	public static StuffedMonster goodStuff(Stuff stuff, TeamMate teamMate, MonsterStats maxStats, int[] failures) {
		Monster monster = teamMate.getMonster();
		Map<EStatType, Integer> requiredStats = teamMate.getRequiredStats();
		Map<ERuneSet, Integer> requiredSets = teamMate.getRequiredSets();
		boolean brokenSet = teamMate.isBrokenSet();
		
		char zero = 0;
		MonsterStats statsBonus = new MonsterStats(zero, zero, zero, zero, zero, zero, zero, zero);
		MonsterStats finalStats = new MonsterStats(zero, zero, zero, zero, zero, zero, zero, zero);
		
		if (!brokenSet && !StuffSelector.checkNoBrokenSet(stuff)) {
			failures[8]++;
			return null;
		}
			
		
		for (Entry<ERuneSet, Integer> set : requiredSets.entrySet()) {
			if (!(stuff.getSet()[set.getKey().ordinal()] >= set.getValue())) {
				failures[8]++;
				return null;
			}	
		}
		
		for (Entry<EStatType, Integer> requiredStat : requiredStats.entrySet()) {
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
				statsBonus.setAtk((char)stuff.computeBonusAtk(monster.getMonsterStats().getAtk()));
				finalStats.setAtk((char)(statsBonus.getAtk() + monster.getMonsterStats().getAtk()));
				if (finalStats.getAtk() < value){
					failures[1]++;
					return null;
				}
			} else if (type == EStatType.DEF) {
				statsBonus.setDef((char)stuff.computeBonusDef(monster.getMonsterStats().getDef()));
				finalStats.setDef((char)(statsBonus.getDef() + monster.getMonsterStats().getDef()));
				if (finalStats.getDef() < value){
					failures[2]++;
					return null;
				}
			} else if (type == EStatType.SPD) {
				statsBonus.setSpd((char)stuff.computeSpd(monster.getMonsterStats().getSpd()));
				finalStats.setSpd((char)(statsBonus.getSpd() + monster.getMonsterStats().getSpd()));
				if (finalStats.getSpd() < value){
					failures[3]++;
					return null;
				}
			} else if (type == EStatType.CRATE) {
				statsBonus.setCrate((char)stuff.computeCrate());
				finalStats.setCrate((char)(statsBonus.getCrate() + monster.getMonsterStats().getCrate()));
				if (finalStats.getCrate() < value){
					failures[4]++;
					return null;
				}
			} else if (type == EStatType.CDMG) {
				statsBonus.setCdmg((char)stuff.computeCdmg());
				finalStats.setCdmg((char)(statsBonus.getCdmg() + monster.getMonsterStats().getCdmg()));
				if (finalStats.getCdmg() < value){
					failures[5]++;
					return null;
				}
			} else if (type == EStatType.RES) {
				statsBonus.setRes((char)stuff.computeRes());
				finalStats.setRes((char)(statsBonus.getRes() + monster.getMonsterStats().getRes()));
				if (finalStats.getRes() < value){
					failures[6]++;
					return null;
				}
			} else if (type == EStatType.ACC) {
				statsBonus.setAcc((char)stuff.computeAcc());
				finalStats.setAcc((char)(statsBonus.getAcc() + monster.getMonsterStats().getAcc()));
				if (finalStats.getAcc() < value){
					failures[7]++;
					return null;
				}
			}
		}
		
		if (statsBonus.getHp() == 0) {
			statsBonus.setHp(stuff.computeBonusHp(monster.getMonsterStats().getHp()));
			finalStats.setHp(statsBonus.getHp() + monster.getMonsterStats().getHp());
		}
		if (statsBonus.getAtk() == 0) {
			statsBonus.setAtk((char)stuff.computeBonusAtk(monster.getMonsterStats().getAtk()));
			finalStats.setAtk((char)(statsBonus.getAtk() + monster.getMonsterStats().getAtk()));
		}
		if (statsBonus.getDef() == 0) {
			statsBonus.setDef((char)stuff.computeBonusDef(monster.getMonsterStats().getDef()));
			finalStats.setDef((char)(statsBonus.getDef() + monster.getMonsterStats().getDef()));
		}
		if (statsBonus.getSpd() == 0) {
			statsBonus.setSpd((char)stuff.computeSpd(monster.getMonsterStats().getSpd()));
			finalStats.setSpd((char)(statsBonus.getSpd() + monster.getMonsterStats().getSpd()));
		}
		if (statsBonus.getCrate() == 0) {
			statsBonus.setCrate((char)stuff.computeCrate());
			finalStats.setCrate((char)(statsBonus.getCrate() + monster.getMonsterStats().getCrate()));
		}
		if (statsBonus.getCdmg() == 0) {
			statsBonus.setCdmg((char)stuff.computeCdmg());
			finalStats.setCdmg((char)(statsBonus.getCdmg() + monster.getMonsterStats().getCdmg()));
		}
		if (statsBonus.getRes() == 0) {
			statsBonus.setRes((char)stuff.computeRes());
			finalStats.setRes((char)(statsBonus.getRes() + monster.getMonsterStats().getRes()));
		}
		if (statsBonus.getAcc() == 0) {
			statsBonus.setAcc((char)stuff.computeAcc());
			finalStats.setAcc((char)(statsBonus.getAcc() + monster.getMonsterStats().getAcc()));
		}
		
		statsBonus = null;
		
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
		
		StuffedMonster stuffedMonster = new StuffedMonster(teamMate, stuff, finalStats);
		return stuffedMonster;
	}
	
	public static List<StuffNode> selectStuffsForTeam(Team team) {
		List<TeamMate> rowTeamMates = team.getTeamMates();
		List<TeamMate> teamMates = new ArrayList<TeamMate>();
		
		Integer teamMatesSize = 0;
		for (TeamMate teamMate : rowTeamMates) {
			int i = 0;
			for (i = 0; i < teamMatesSize; i++) {
				if (teamMate.getAttaqueOrder() <= teamMates.get(i).getAttaqueOrder())
					break;
			}
			teamMates.add(i, teamMate);
			teamMatesSize++;
		}
		
		List<StuffNode> currentNodes = new ArrayList<>();
		TeamMate teamMate = teamMates.get(0);
		if (teamMate.getSelectedStuff().length == 0)
			return Collections.emptyList();
		double bestEval = teamMate.getSelectedStuff()[0].getEval();
		for (int j = 0; j < teamMate.getSelectedStuff().length; j++) {
			StuffedMonster currentMonster = teamMate.getSelectedStuff()[j];
			currentNodes.add(new StuffNode(null, currentMonster, currentMonster.getEval() / bestEval));
		}
		
		PriorityQueue<StuffNode> selecteds = new PriorityQueue<StuffNode>(new Comparator<StuffNode>() {

			@Override
			public int compare(StuffNode o1, StuffNode o2) {
				if (o2.totalEval() > o1.totalEval())
					return -1;
				else
					return 1;
			}
		});
		
		
		for (int i = 1; i < teamMates.size(); i++) {
			teamMate = teamMates.get(i);
			bestEval = teamMate.getSelectedStuff()[0].getEval();
			
			for (StuffNode currentNode : currentNodes) {
				for (int j = 0; j < teamMate.getSelectedStuff().length; j++) {
					StuffedMonster currentMonster = teamMate.getSelectedStuff()[j];
					
					StuffNode parentNode = currentNode;
					boolean add = true;
					while (parentNode != null) {
						if (StuffSelector.haveSameRune(currentMonster, parentNode.getStuffedMonster())
							|| (currentMonster.getTeamMate().getAttaqueOrder() > parentNode.getStuffedMonster().getTeamMate().getAttaqueOrder() 
									&& currentMonster.getFinalStats().getSpd() >= parentNode.getStuffedMonster().getFinalStats().getSpd())) {
							add = false;
							break;
						}
						parentNode = parentNode.getParent();
					}
					if (add) {
						StuffSelector.addToSet(selecteds, 20000, new StuffNode(currentNode, currentMonster, currentMonster.getEval() / bestEval));
						//selecteds.add(new StuffNode(currentNode, currentMonster, currentMonster.getEval() / bestEval));
					}
				}
			}
			currentNodes.clear();
			int selectedsCount = selecteds.size();
			for (int j = 0; j < selectedsCount; j++) {
				currentNodes.add(selecteds.poll());
			}
			Collections.reverse(currentNodes);
			System.out.println("Finish: " + teamMate.getMonster().getName());
			System.out.println("Selected: " + selectedsCount);
			selecteds.clear();
		}
		return currentNodes;
	}
	
	private static void addToSet(PriorityQueue<StuffNode> set, int sizeLimit, StuffNode node) {
		if (set.size() < sizeLimit) {
			set.add(node);
		} else {
			StuffNode last = set.peek();
	    	if (last.totalEval() < node.totalEval()) {
	    		set.poll();
	    		set.add(node);
	       }
		}
	}
	
	public static boolean haveSameRune(StuffedMonster monster1, StuffedMonster monster2) {
		for (Rune rune1 : monster1.getStuff().getRunes())
			for (Rune rune2 : monster2.getStuff().getRunes())
				if (rune1 == rune2)
					return true;
		return false;
	}
	
}
