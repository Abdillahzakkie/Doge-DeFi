import React from 'react';
import { Navbar } from '../Navbar';
import './Menu.css';

const Menu = () => {

    return (
        <>
          <Navbar />  
            <div className="menu-container">
                <div className="menu-item-one">
                    <img src={require("../../asset/chef.jpg")} alt="chef" height="120px"/>
                    <h4 className="select-dish">Select your favourite dishes</h4>
                    <h3 className="sushi-token">Earn SUSHI tokens by staking SushiSwap V2 SLP Tokens. Note: Current APY includes 2/3rd SUSHI emission that is locked and will be retroactively disbursed at a later date.</h3>
                </div>
                <div className="card-container">
                    <div className="card-one">
                    <div className="card-icon"><span role="img" aria-label="">🍣</span></div>
                        <div style={{margin: '1rem 0 3rem 0'}}>
                            <h4 className="card-head">Sushi Party!</h4>
                            <p className="card-text">Deposit SUSHI-ETH SLP</p>
                            <p className="card-text">Earn SUSHI</p>
                        </div>
                        <button className="card-btn">
                            <a href="/">Select</a>
                        </button>
                        <div className="card-footer">
                            <span>APY</span>
                            <span>87.17%</span>
                        </div>
                    </div>
                    <div className="card-one">
                    <div className="card-icon"><span role="img" aria-label="">🦄</span></div>
                        <div style={{margin: '1rem 0 3rem 0'}}>
                            <h4 className="card-head">Sushi Party!</h4>
                            <p className="card-text">Deposit SUSHI-ETH SLP</p>
                            <p className="card-text">Earn SUSHI</p>
                        </div>
                        <button className="card-btn">
                            <a href="/">Select</a>
                        </button>
                        <div className="card-footer">
                            <span>APY</span>
                            <span>87.17%</span>
                        </div>
                    </div>
                    <div className="card-one">
                    <div className="card-icon"><span role="img" aria-label="">🐢</span></div>
                        <div style={{margin: '1rem 0 3rem 0'}}>
                            <h4 className="card-head">Sushi Party!</h4>
                            <p className="card-text">Deposit SUSHI-ETH SLP</p>
                            <p className="card-text">Earn SUSHI</p>
                        </div>
                        <button className="card-btn">
                            <a href="/">Select</a>
                        </button>
                        <div className="card-footer">
                            <span>APY</span>
                            <span>87.17%</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Menu;