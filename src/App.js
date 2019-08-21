import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom'
import ReportBreach from './Components/ReportBreach/ReportBreach';
import Header from './Header/Header';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import Login from './Components/Login/Login';

function App() {
  return (
    <div className="App">
      <Header/>
      <HashRouter>
        <Switch>
        <Route path='/reportbreach' exact component={ReportBreach}></Route>
        <Route path='/admindashboard' exact component={AdminDashboard}></Route>
        <Route path='/login' exact component={Login}></Route>
        </Switch>
         
      </HashRouter>
    </div>
  );
}

export default App;
