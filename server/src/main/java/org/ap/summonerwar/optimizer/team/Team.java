package org.ap.summonerwar.optimizer.team;
import java.util.ArrayList;
import java.util.List;

public class Team {

	private String name;
	private List<TeamMate> teamMates;

	public Team(String name) {
		this.setName(name);
		this.teamMates = new ArrayList<TeamMate>();
	}
	
	public void addTeamMate(TeamMate teamMate) {
		this.teamMates.add(teamMate);
	}
	
	public List<TeamMate> getTeamMates() { return teamMates; }
	public void setTeamMates(List<TeamMate> teamMates) { this.teamMates = teamMates; }

	public String getName() { return name; }
	public void setName(String name) { this.name = name; }
}
