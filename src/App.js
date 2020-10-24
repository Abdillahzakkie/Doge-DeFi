import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './component/Home/Home';
import Menu from './component/Farm/Farm';
import Exchange from './component/Exchange/Exchange';
import SingleStakePage from "./component/SingleFarm/SingleFarm";
import Footer from './component/Footer/Footer';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/farm' component={Menu} />
          <Route exact path='/exchange' component={Exchange} />
          <Route exact path='/farm/:id' component={SingleStakePage} />

        </Switch>
        <Footer/>
    </div>
  );
}

export default App;
