import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from "../Context";
import { renderPoolView, renderSwapView } from './OtherLayout';
import logo from "../../asset/chef.jpg";
import './Exchange.css'


const Exchange = () => {
    const [display, setDisplay] = useState('swap');
    const toggleDisplay = (e) => setDisplay(e.target.id);
    const userConsumer = useContext(userContext);
    const { connectWallet, user } = userConsumer;

    return (
        <div>
            <nav className="exchange-container">
                <div className="item-one">
                    <Link to='/' className="item-one-link">
                        <img src={logo} alt="chef" height="35px"/>
                    </Link>
                    <div>
                        <Link to="/" className="sushi item-one-link">SushiSwap</Link>
                        <Link to="/" className="masterchef item-one-link">MasterChef</Link>
                    </div>
                </div>
                <div className="nav-right">
                    <div style={{marginRight: '1.2rem'}}>
                        <button className="wallet" onClick={connectWallet}>
                            { user ? 'My Wallet' : 'Unlock Wallet' }
                        </button>
                    </div>
                    <div style={{marginRight: '1.2rem'}} className="btn-container">
                        <button id="open-settings-dialog-button" className="settings"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></button>
                    </div>
                    <div style={{marginRight: '1.2rem'}}>
                        <button className="dot"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></button>
                    </div>
                </div>
            </nav>  
            
            <div className="form-section">
                <div className="form-head">
                    <span id="swap" className={`span ${display === 'swap' ? 'active': ''}`} onClick={toggleDisplay}>Swap</span>
                    <span id="pool" className={`span ${display === 'pool' ? 'active': ''}`} onClick={toggleDisplay}>Pool</span>
                </div>
                {display === 'pool'? renderPoolView() : renderSwapView()}
            </div>
        </div>
    )
    
}

export default Exchange;