package org.ap.summonerwar.optimizer.rune;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

public class Stat {

	private EStatType type;
	private int value;
	private EStatPos pos;
	
	private boolean enchanted;
	private int enchantValue;

	public Stat(EStatType type, int value, EStatPos pos, boolean enchanted, int enchantValue) {
		this.setType(type);
		this.setValue(value);
		this.setPos(pos);
		this.setEnchanted(enchanted);
		this.setEnchantValue(enchantValue);
	}
	
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("pos: ").append(pos);
		builder.append(", type: ").append(type);
		builder.append(", value: ").append(value);
		if (!(pos == EStatPos.MAIN || pos == EStatPos.SUBMAIN)) {
			builder.append(", enchanted: ").append(enchanted);
			builder.append(", enchantValue: ").append(enchantValue);
		}
		return builder.toString();
	}
	
	public JSONObject toJSON() throws JSONException {
		JSONObject result = new JSONObject();
		result.put("type", this.type);
		result.put("value", this.value);
		result.put("pos", this.pos);
		return result;
	}
	
	public EStatType getType() { return type; }
	public void setType(EStatType type) { this.type = type; }

	public int getValue() { return value; }
	public void setValue(int value) { this.value = value; }

	public EStatPos getPos() { return pos; }
	public void setPos(EStatPos pos) { this.pos = pos; }
	
	public boolean isEnchanted() { return enchanted; }
	public void setEnchanted(boolean enchanted) { this.enchanted = enchanted; }

	public int getEnchantValue() { return enchantValue; }
	public void setEnchantValue(int enchantValue) { this.enchantValue = enchantValue; }
	
}
