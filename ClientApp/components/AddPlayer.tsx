import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { PlayerData } from './FetchPlayer';
interface AddPlayerDataState {
    title: string;
    loading: boolean;
    teamList: Array<any>;
    empData: PlayerData;
}
export class AddPlayer extends React.Component<RouteComponentProps<any>, AddPlayerDataState> {
    constructor(props: any) {
        super(props);
        this.state = { title: "", loading: true, teamList: [], empData: new PlayerData };
        fetch('api/Player/GetTeamList')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
                this.setState({ teamList: data });
            });
        var empid = this.props.match.params["empid"];
        // This will set state for Edit player  
        if (empid > 0) {
            fetch('api/Player/Details/' + empid)
                .then(response => response.json() as Promise<PlayerData>)
                .then(data => {
                    this.setState({ title: "Editar", loading: false, empData: data });
                });
        }
        // This will set state for Add player  
        else {
            this.state = { title: "Cadastrar Novo", loading: false, teamList: [], empData: new PlayerData };
        }
        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.teamList);
        return <div>
            <h1>{this.state.title}</h1>
            <h3>Jogador</h3>
            <hr />
            {contents}
        </div>;
    }
    // This will handle the submit form event.  
    private handleSave(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);
        // PUT request for Edit player.  
        if (this.state.empData.playerId) {
            fetch('api/Player/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchplayer");
                })
        }
        // POST request for Add player.  
        else {
            fetch('api/Player/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchplayer");
                })
        }
    }
    // This will handle Cancel button click event.  
    private handleCancel(e: { preventDefault: () => void; }) {
        e.preventDefault();
        this.props.history.push("/fetchplayer");
    }
    // Returns the HTML Form to the render() method.  
    private renderCreateForm(teamList: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="playerId" value={this.state.empData.playerId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Nome</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.empData.name} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Team">Time</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="Team" defaultValue={this.state.empData.team} required>
                            <option value="">-- Escolha o Time --</option>
                            {teamList.map(team =>
                                <option key={team.teamId} value={team.teamName}>{team.teamName}</option>
                            )}
                        </select>
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Salvar</button>
                    <button className="btn" onClick={this.handleCancel}>Cancelar</button>
                </div >
            </form >
        )
    }
}