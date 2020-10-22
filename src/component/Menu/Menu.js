import React from 'react';
import { Link } from "react-router-dom";
import { ErrorBoundary } from "../ErrorBoundary";
import Navbar from '../Navbar';
import { data } from "../data/menu";
import './Menu.css';

const Menu = () => {

    const cardList = data.map(card => {
        return (
            <div className="card-one" key={card.id}>
                <div className="card-icon">
                    <span role="img" aria-label="">{card.icon}</span>
                </div>
                <div style={{margin: '1rem 0 3rem 0'}}>
                    <h4 className="card-head">{card.title1}</h4>
                    <p className="card-text">{card.title2}</p>
                    <p className="card-text">{card.title3}</p>
                </div>
                <button className="card-btn">
                    <Link to={`/staking/${card.id}`}>Select</Link>
                </button>
                <div className="card-footer">
                    <span>APY</span>
                    <span>{card.apy}%</span>
                </div>
            </div>
        )
    })

    return (
        <>
          <Navbar />  
            <div className="menu-container">
                <div className="menu-item-one">
                    <img src={require("../../asset/chef.jpg")} alt="chef" height="120px"/>
                    <h4 className="select-dish">Select your favourite dishes</h4>
                    <h3 className="sushi-token">Earn SUSHI tokens by staking SushiSwap V2 SLP Tokens. Note: Current APY includes 2/3rd SUSHI emission that is locked and will be retroactively disbursed at a later date.</h3>
                </div>
                <div className="card-container">{cardList}</div>
            </div>
        </>
    )
}

export default ErrorBoundary(Menu);