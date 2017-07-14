package org.ap.summonerwar.optimizer.stuff;

import org.ap.summonerwar.optimizer.monster.StuffedMonster;
import org.ap.summonerwar.optimizer.rune.Rune;

public class StuffNode {
	private StuffNode parent;
	private StuffedMonster stuffedMonster;
	
	private double eval;
	private double totalEval = -1;

	public StuffNode(StuffNode parent, StuffedMonster stuffedMonster, double eval) {
		this.setParent(parent);
		this.setStuffedMonster(stuffedMonster);
		this.setEval(eval);
	}
	
	public double totalEval() {
		if (this.totalEval == -1) {
			this.totalEval = this.eval;
			if (this.parent != null)
				this.totalEval += this.parent.totalEval();
		}
		return this.totalEval;
	}
	
	public String toString() {
		StringBuilder builder = new StringBuilder();
		//builder.append("totalEval: ").append(this.totalEval).append("\n");
//		if (this.parent != null)
//			builder.append(this.parent.toString());
		builder.append("Monster: ").append(this.stuffedMonster.getMonster().getName()).append("\n");
		builder.append(this.stuffedMonster.getFinalStats().toString()).append("\n");
		for (Rune rune : this.stuffedMonster.getStuff().getRunes()) {
			builder.append(rune.toString()).append("\n");
			
		}
		
		return builder.toString();
	}
	
	public StuffNode getParent() { return parent; }
	public void setParent(StuffNode parent) { this.parent = parent; }
	
	public StuffedMonster getStuffedMonster() { return stuffedMonster; }
	public void setStuffedMonster(StuffedMonster stuffedMonster) { this.stuffedMonster = stuffedMonster; }

	public double getEval() { return eval; }
	public void setEval(double eval) { this.eval = eval; }
	
}
