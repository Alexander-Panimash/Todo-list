import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Tasks from './pages/tasks/Tasks';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Tasks}/>
    </Switch>
  );
};

export default App;
