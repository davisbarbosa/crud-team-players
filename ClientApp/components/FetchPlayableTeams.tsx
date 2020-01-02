import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface FetchTeamDataState {
	empList: TeamData[];
	loading: boolean;
}

export class FetchPlayableTeams extends React.Component<RouteComponentProps<any>, FetchTeamDataState> {
	constructor() {
		super();


		this.state = { empList: [], loading: true };
		fetch('api/Player/GetPlayableTeams')
			.then(response => response.json() as Promise<TeamData[]>)
			.then(data => {
				this.setState({ empList: data, loading: false });
			});
	}
	public render() {
		let contents = this.state.loading
			? <p><em>Loading...</em></p>
			: this.renderTeamTable(this.state.empList);
		return <div>
			<h1>Jogar</h1>
			<p>Selecione 2 times e clique em jogar.</p>
			{contents}
		</div>;
	}

	onChange = option => {
		var team1 = $('#Team1 option:selected').attr('value');
		var team2 = $('#Team2 option:selected').attr('value');
		if(team1 != "" || team2 != "") {
			if ((team1 == team2)) {
				$("a.play").attr("disabled", "disabled");
				alert('Selecione times diferentes');
			} else {
				$("a.play").removeAttr("disabled");
			}
		}

	};


	// Returns the HTML table to the render() method.  
	private renderTeamTable(empList: TeamData[]) {
		return <div className="form-group row">
			<div className="col-md-4">
				<label className="control-label" htmlFor="Team">Time 1</label>
				<select onChange={this.onChange} id="Team1" className="form-control" data-val="true" name="Team1" required>
					<option value="">-- Escolha o Time --</option>
					{empList.map(team =>
						<option key={team.teamId} value={team.teamId}>{team.teamName}</option>
					)}
				</select>
			</div>

			<div className="col-md-4">
				<label className="control-label" htmlFor="Team">Time 2</label>
				<select onChange={this.onChange} id="Team2" className="form-control" data-val="true" name="Team2" required>
					<option value="">-- Escolha o Time --</option>
					{empList.map(team =>
						<option key={team.teamId} value={team.teamId}>{team.teamName}</option>
					)}
				</select>
			</div>
			<div className="col-md-12">
				<a disabled className="play btn btn-primary">Jogar</a>
			</div>
		</div >

	}
}
export class TeamData {
	teamId: number = 0;
	teamName: string = "";
}