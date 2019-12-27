import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchPlayer } from './components/FetchPlayer';
import { AddPlayer } from './components/AddPlayer';
import { FetchTeam } from './components/FetchTeam';
import { AddTeam } from './components/AddTeam';

export const routes = <Layout>
    <Route exact path='/' component={Home} />  
    <Route path='/fetchplayer' component={FetchPlayer} />
    <Route path='/addplayer' component={AddPlayer} />
    <Route path='/player/edit/:empid' component={AddPlayer} />
    <Route path='/fetchteam' component={FetchTeam} />
    <Route path='/addteam' component={AddTeam} />
    <Route path='/team/edit/:empid' component={AddTeam} />

</Layout>;