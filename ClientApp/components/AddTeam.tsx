import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { TeamData } from './FetchTeam';
interface AddTeamDataState {
    title: string;
    loading: boolean;
    teamList: Array<any>;
    empData: TeamData;
}
export class AddTeam extends React.Component<RouteComponentProps<any>, AddTeamDataState> {
    constructor(props: any) {
        super(props);
        this.state = { title: "", loading: true, teamList: [], empData: new TeamData };
        var empid = this.props.match.params["empid"];
        // This will set state for Edit team  
        if (empid > 0) {
            fetch('api/Team/Details/' + empid)
                .then(response => response.json() as Promise<TeamData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, empData: data });
                });
        }
        // This will set state for Add team  
        else {
            this.state = { title: "Create", loading: false, teamList: [], empData: new TeamData };
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
            <h3>Team</h3>
            <hr />
            {contents}
        </div>;
    }
    // This will handle the submit form event.  
    private handleSave(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data);
        // PUT request for Edit team.  
        if (this.state.empData.teamId) {
            fetch('api/Team/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchteam");
                })
        }
        // POST request for Add team.  
        else {
            fetch('api/Team/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchteam");
                })
        }
    }
    // This will handle Cancel button click event.  
    private handleCancel(e: { preventDefault: () => void; }) {
        e.preventDefault();
        this.props.history.push("/fetchteam");
    }
    // Returns the HTML Form to the render() method.  
    private renderCreateForm(teamList: Array<any>) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="teamId" value={this.state.empData.teamId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="TeamName">TeamName</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="teamName" defaultValue={this.state.empData.teamName} required />
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}