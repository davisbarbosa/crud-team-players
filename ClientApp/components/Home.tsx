import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>Ol�,</h1>
            <p>No menu ao lado voc� pode, ver e cadastar os Times e Jogadores.</p>
            <p>Ap�s cadastras no m�nimo 2 times e cada um deles precisa ter no m�nimo 5 jogadores cadastrados.</p>
        </div>;
    }
}
