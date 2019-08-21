import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom'
import ReportBreach from './Components/ReportBreach/ReportBreach';
import Header from './Header/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <HashRouter>
        <switch>
        <Route path='/reportbreach' exact component={ReportBreach}></Route>
        </switch>
         
      </HashRouter>
    </div>
  );
}

export default App;
