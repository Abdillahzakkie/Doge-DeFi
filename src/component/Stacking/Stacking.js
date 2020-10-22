import React, { useContext } from 'react';
import { userContext } from '../Context';
import { ErrorBoundary } from "../ErrorBoundary";
import Navbar from '../Navbar';
import './Stacking.css';

const Stacking = () => {
    const userConsumer = useContext(userContext);
    const { approvePuppyToken } = userConsumer;
    
    return (
        <>
            <Navbar/>
            <div className="menu-container">
                <div className="menu-item-one">
                    <img src={require("../../asset/chef.jpg")} alt="chef" height="120px"/>
                    <h4 className="select-dish">Irasshaimase!</h4>
                    <h3 className="sushi-token">Welcome to the Sushi Bar, stake Sushi to earn Sushi.</h3>
                </div>
                <div className="stacking-container">
                    <div className="stacking-one">
                        <div className="card-icon"><span role="img" aria-label="">🍣</span></div>
                        <div style={{margin: '1rem 0 2rem 0'}}> 
                            <h4 className="stacking-head">0.000</h4>
                            <p className="stacking-text">xSUSHI (SushiBar) Available</p>
                        </div>
                        <button className="card-btn">
                            <a href="/">Convert to SUSHI</a>
                        </button>
                    </div>
                    <div className="stacking-one">
                        <div className="card-icon"><span role="img" aria-label="">👨🏻‍🍳</span></div>
                        <div style={{margin: '1rem 0 2rem 0'}}> 
                            <h4 className="stacking-head">0.000</h4>
                            <p className="stacking-text">SUSHI Tokens Available</p>
                        </div>
                        <button className="card-btn" onClick={approvePuppyToken}>
                            Approve SUSHI
                        </button>
                    </div>
                    
                </div>
                <div className="menu-item-one">
                    <p className="card-text"><span role="img" aria-label="">ℹ️️</span> You will earn a portion of the swaps fees based on the amount of xSushi held relative the weight of the staking. xSushi can be minted by staking Sushi. To redeem Sushi staked plus swap fees convert xSushi back to Sushi. There are currently 27091256.264703516 xSUSHI in the whole pool.</p>
                </div>
            </div>
        </>
    )
}

export default ErrorBoundary(Stacking);