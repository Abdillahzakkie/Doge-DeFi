import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './component/Home/Home';
import Menu from './component/Menu/Menu';
import Stacking from './component/Stacking/Stacking';
import Exchange from './component/Exchange/Exchange';
import SingleStakePage from "./component/SingleStakePage/SingleStakePage";
import Footer from './component/Footer/Footer';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/menu' component={Menu} />
          <Route exact path='/exchange' component={Exchange} />
          <Route exact path='/stacking' component={Stacking} />
          <Route exact path='/stacking/:id' component={SingleStakePage} />
        </Switch>
        <Footer/>
    </div>
  );
}

export default App;
