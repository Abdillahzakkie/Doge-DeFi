import React, { useContext, useState, useEffect } from 'react';
import { ErrorBoundary } from "../ErrorBoundary";
import { userContext } from '../Context';
import Navbar from '../Navbar';
import logo from '../../asset/chef.jpg';
import '../Farm/Farm.css';
import { SingleStakePageContainer } from "./singleFarm.styled";

const SingleStakePage = ({ match, history }) => {
    const [approveAmount, setApproveAmount]= useState('');
    const [harvestBalance, setHarvestBalance] = useState('0');
    const userConsumer = useContext(userContext);

    const { 
        loading, 
        getSlug, 
        approveDogeEthTokens, 
        claimEthDogePuppyTokens,
        claimableDogeETHPuppyTokens,
        approveEthUsdtPuppyTokens, 
        claimEthUsdtPuppyTokens,
        claimableEthUsdtPuppyTokens,
        approveEthUsdcTokens ,
        claimEthUsdcTokens,
        claimableEthUsdcTokens
    } = userConsumer;
    const card = getSlug(match.params.id);
    let shouldReload = false;

    useEffect(() => {
        if(loading === false && shouldReload === false) {
            (async () => {
                if(card.title1 === 'Water') {
                    const result = (await claimableDogeETHPuppyTokens())['1'];
                    setHarvestBalance(() => result)
                } else if(card.title1 === 'Fish') {
                    const result = (await claimableEthUsdtPuppyTokens())['1'];
                    setHarvestBalance(() => result)
                } else if(card.title1 === 'Eat') {
                    const result = (await claimableEthUsdcTokens())['1'];
                    setHarvestBalance(() => result)
                }
            })()
        }
        return;
    }, [
        loading,
        setHarvestBalance, card.title1, 
        claimableDogeETHPuppyTokens, 
        claimableEthUsdtPuppyTokens, 
        claimableEthUsdcTokens
    ])

    if(!card) return history.push('/menu');

    const handleApproveToken = e => {
        e.preventDefault();
        if(loading) return alert('Unlock your account to proceed');
        const value = Math.round(approveAmount);

        if(value === '') return alert ('Please approve an amount before continuing');
        if(card.title1 === 'Water') {
            approveDogeEthTokens(value)
        } else if(card.title1 === 'Fish') {
            approveEthUsdtPuppyTokens(value);
        } else if(card.title1 === 'Eat') {
            approveEthUsdcTokens(value)
        }
        return;
    }

    const handleHarvestToken = e => {
        e.preventDefault();
        if(loading) return alert('Unlock your account to proceed');
        if(harvestBalance === '0') return alert('You have zero rewards to claim');

        if(card.title1 === 'Water') {
            claimEthDogePuppyTokens()
        } else if(card.title1 === 'Fish') {
            claimEthUsdtPuppyTokens();
        } else if(card.title1 === 'Eat') {
            claimEthUsdcTokens()
        }
        return;
    }

    if(harvestBalance === '0') shouldReload = true;

    return (
        <>
            <Navbar />  
            <SingleStakePageContainer className="menu-container">
                <div className="menu-item-one">
                    <img src={logo} alt="chef" height="120px"/>
                    <h4 className="select-dish">Select your favourite dishes</h4>
                    <h3 className="sushi-token">Earn SUSHI tokens by staking SushiSwap V2 SLP Tokens. Note: Current APY includes 2/3rd SUSHI emission that is locked and will be retroactively disbursed at a later date.</h3>
                </div>
                <div className="card-container">
                    <div className="card-one">
                        <div className="card-icon">
                            <span role="img" aria-label="">{card.icon}</span>
                        </div>
                        <div style={{margin: '1rem 0 3rem 0'}}>
                            <h4 className="card-head">{card.title1}</h4>
                            <p className="card-text">{card.title2}</p>
                            <p className="card-text">{`${harvestBalance}.00`}</p>
                        </div>
                        <button className="card-btn" onClick={handleHarvestToken}>
                            Harvest
                        </button>
                    </div>

                    <div className="card-one">
                        <div className="card-icon">
                            <span role="img" aria-label="">{card.icon}</span>
                        </div>
                        <div style={{margin: '1rem 0 3rem 0'}}>
                            <h4 className="card-head">{card.title1}</h4>
                            <input 
                                type="number" 
                                value={approveAmount} 
                                placeholder='0.00'
                                min='0'
                                onChange={e => setApproveAmount(`${e.target.value}.00`)}
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