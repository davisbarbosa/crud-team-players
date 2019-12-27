import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface FetchTeamDataState {
    empList: TeamData[];
    loading: boolean;
}

export class FetchTeam extends React.Component<RouteComponentProps<any>, FetchTeamDataState> {
    constructor(state: any) {
        super();
        this.state = { empList: [], loading: true };
        fetch('api/Team/Index')
            .then(response => response.json() as Promise<TeamData[]>)
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
            : this.renderTeamTable(this.state.empList);
        return <div>
            <h1>Team Data</h1>
            <p>This component demonstrates fetching Team data from the server.</p>
            <p>
                <Link to="/addteam">Create New</Link>
            </p>
            {contents}
        </div>;
    }
    // Handle Delete request for an team  
    private handleDelete(id: number) {
        if (!confirm("Do you want to delete team with Id: " + id))
            return;
        else {
            fetch('api/Team/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        empList: this.state.empList.filter((rec) => {
                            return (rec.teamId != id);
                        })
                    });
            });
        }
    }
    private handleEdit(id: number) {
        this.props.history.push("/team/edit/" + id);
    }
    // Returns the HTML table to the render() method.  
    private renderTeamTable(empList: TeamData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>TeamId</th>
                    <th>Name</th>
                    <th>Team</th>
                </tr>
            </thead>
            <tbody>
                {empList.map(emp =>
                    <tr key={emp.teamId}>
                        <td></td>
                        <td>{emp.teamId}</td>
                        <td>{emp.teamName}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(emp.teamId)}>Edit</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(emp.teamId)}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
export class TeamData {
    teamId: number = 0;
    teamName: string = "";
}