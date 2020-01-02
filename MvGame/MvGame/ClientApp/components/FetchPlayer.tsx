import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface FetchPlayerDataState {
	empList: PlayerData[];
	loading: boolean;
}

export class FetchPlayer extends React.Component<RouteComponentProps<any>, FetchPlayerDataState> {
	constructor(state: any) {
		super();
		this.state = { empList: [], loading: true };
		fetch('api/Player/Index')
			.then(response => response.json() as Promise<PlayerData[]>)
			.then(data => {
				this.setState({ empList: data, loading: false });
			});
		// This binding is necessary to make "this" work in the callback  
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
	}
	public render() {
		let contents = this.state.loading
			? <p><em>Loading...</em></p>
			: this.renderPlayerTable(this.state.empList);
		return <div>
			<h1>Jogadores</h1>
			<p>
				<Link to="/addplayer">Cadastrar Novo Jogador</Link>
			</p>
			{contents}
		</div>;
	}
	// Handle Delete request for an player  
	private handleDelete(id: number) {
		if (!confirm("Do you want to delete player with Id: " + id))
			return;
		else {
			fetch('api/Player/Delete/' + id, {
				method: 'delete'
			}).then(data => {
				this.setState(
					{
						empList: this.state.empList.filter((rec) => {
							return (rec.playerId != id);
						})
					});
			});
		}
	}
	private handleEdit(id: number) {
		this.props.history.push("/player/edit/" + id);
	}
	// Returns the HTML table to the render() method.  
	private renderPlayerTable(empList: PlayerData[]) {
		return <table className='table'>
			<thead>
				<tr>
					<th></th>
					{/* <th>PlayerId</th> */}
					<th>Nome</th>
					<th>Time</th>
					<th>Editar</th>
					<th>Remover</th>
				</tr>
			</thead>
			<tbody>
				{empList.map(emp =>
					<tr key={emp.playerId}>
						<td></td>
						{/* <td>{emp.playerId}</td> */}
						<td>{emp.name}</td>
						<td>{emp.team}</td>
						<td>
							<a className="action" onClick={(id) => this.handleEdit(emp.playerId)}><i className="glyphicon glyphicon-pencil"></i></a>
						</td>
						<td>
							<a className="action" onClick={(id) => this.handleDelete(emp.playerId)}><i className="glyphicon glyphicon-remove"></i></a>
						</td>
					</tr>
				)}
			</tbody>
		</table>;
	}
}
export class PlayerData {
	playerId: number = 0;
	name: string = "";
	gender: string = "";
	team: string = "";
	department: string = "";
}