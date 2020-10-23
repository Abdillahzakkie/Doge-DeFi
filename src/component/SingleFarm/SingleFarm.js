import React, { useContext, useState } from 'react';
import { ErrorBoundary } from "../ErrorBoundary";
import { userContext } from '../Context';
import Navbar from '../Navbar';
import '../Farm/Farm.css';
import { SingleStakePageContainer } from "./singleFarm.styled";

const SingleStakePage = ({ match, history }) => {
    const [approveAmount, setApproveAmount]= useState('');
    const userConsumer = useContext(userContext);
    const { 
        loading, 
        getSlug, 
        approveDogeEthTokens, 
        claimEthDogePuppyTokens,
        approveEthUsdtPuppyTokens, 
        claimEthUsdtPuppyTokens,
        approveEthUsdcTokens ,
        claimEthUsdcTokens
    } = userConsumer;

    const card = getSlug(match.params.id);
    if(!card) return history.push('/menu');
    const { icon, title1, title2 } = card;

    const handleApproveToken = e => {
        e.preventDefault();
        if(loading) return alert('Unlock your account to proceed');

        if(approveAmount === '') return alert ('Please approve an amount before continuing');
        if(title1 === 'Water') {
            approveDogeEthTokens(approveAmount)
        } else if(title1 === 'Fish') {
            approveEthUsdtPuppyTokens(approveAmount);
        } else if(title1 === 'Eat') {
            approveEthUsdcTokens(approveAmount)
        }
        return;
    }

    const handleHarvestToken = e => {
        e.preventDefault();
        if(loading) return alert('Unlock your account to proceed');

        if(title1 === 'Water') {
            claimEthDogePuppyTokens()
        } else if(title1 === 'Fish') {
            claimEthUsdtPuppyTokens();
        } else if(title1 === 'Eat') {
            claimEthUsdcTokens()
        }
        return;
    }

    return (
        <>
            <Navbar />  
            <SingleStakePageContainer className="menu-container">
                <div className="menu-item-one">
                    <img src={require("../../asset/chef.jpg")} alt="chef" height="120px"/>
                    <h4 className="select-dish">Select your favourite dishes</h4>
                    <h3 className="sushi-token">Earn SUSHI tokens by staking SushiSwap V2 SLP Tokens. Note: Current APY includes 2/3rd SUSHI emission that is locked and will be retroactively disbursed at a later date.</h3>
                </div>
                <div className="card-container">
                    <div className="card-one">
                        <div className="card-icon">
                            <span role="img" aria-label="">{icon}</span>
                        </div>
                        <div style={{margin: '1rem 0 3rem 0'}}>
                            <h4 className="card-head">{title1}</h4>
                            <p className="card-text">{title2}</p>
                        </div>
                        <button className="card-btn" onClick={handleHarvestToken}>Harvest</button>
                    </div>

                    <div className="card-one">
                        <div className="card-icon">
                            <span role="img" aria-label="">{icon}</span>
                        </div>
                        <div style={{margin: '1rem 0 3rem 0'}}>
                            <h4 className="card-head">{title1}</h4>
                            <input 
                                type="number" 
                                value={approveAmount} 
                                placeholder='0.00'
                                min='0'
                                onChange={e => setApproveAmount(e.target.value)}
                            />
                        </div>
                        <button className="card-btn" onClick={handleApproveToken}>Approve</button>
                    </div>
                </div>
            </SingleStakePageContainer>
        </>
    )
}

export default ErrorBoundary(SingleStakePage);