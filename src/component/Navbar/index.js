import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import './Navbar.css';


export const NavBar = () => {

    return (
        <div className="nav-container">
            <div className="item-one">
                <Link to='/' className="item-one-link">
                    <img src={require('../../asset/chef.jpg')} alt="chef" height="35px"/>
                </Link>
                <div>
                    <Link to="/" className="sushi item-one-link">SushiSwap</Link>
                    <Link to="/" className="masterchef item-one-link">MasterChef</Link>
                </div>
            </div>
            <div className="item-two">
                <Link to='/menu' className="item-two-link">Menu</Link>
                <Link to='/stacking' className="item-two-link">Stacking</Link>
                <Link to='/exchange' className="item-two-link" target='blank'>Exchange</Link>
            </div>
            <div>
                <button className="item-three">Unlock wallet</button>
            </div>
        </div>
    );

}

export default withRouter(NavBar);