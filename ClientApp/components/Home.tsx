import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>Olá,</h1>
            <p>No menu ao lado você pode, ver e cadastar os Times e Jogadores.</p>
            <p>Após cadastras no mínimo 2 times e cada um deles precisa ter no mínimo 5 jogadores cadastrados.</p>
        </div>;
    }
}
