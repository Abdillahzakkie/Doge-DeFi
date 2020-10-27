import React, { useContext, useState, useEffect } from 'react';
import { ErrorBoundary } from "../ErrorBoundary";
import { userContext } from '../Context';
import Navbar from '../Navbar';
import { handleApproveToken } from "../Helper/approveToken";
import { handleHarvestToken } from "../Helper/harvestToken";
import { handleStakeToken } from "../Helper/stakeToken";
import logo from "../../asset/62_624227_puppy_cute_adorable_digital_cartoon_dog_animal_puppy.png";
import '../Farm/Farm.css';
import { SingleStakePageContainer } from "./singleFarm.styled";

const SingleStakePage = ({ match, history }) => {
    const [approveAmount, setApproveAmount]= useState('');
    const [stakeAmount, setStakeAmount] = useState('');
    const [harvestBalance, setHarvestBalance] = useState('0');
    const userConsumer = useContext(userContext);

    const { 
        loading, getSlug, web3, dogeTokenAddress, user,

        ETH_DOGE, claimEthDogePuppyTokens,
        claimableDogeETH, stakeDogeEthTokens,

        EHT_USDT, claimEthUsdtPuppyTokens,
        claimableEthUsdt, stakeEthUsdtTokens,

        EHT_USDC, claimEthUsdcTokens,
        claimableEthUsdc, stakeEthUsdcTokens
    } = userConsumer;
    const card = getSlug(match.params.id);

    useEffect(() => {
        const tokenName = card.title1;
        if(tokenName === 'Water') setHarvestBalance(() => claimableDogeETH);
        else if(tokenName === 'Fish') setHarvestBalance(() => claimableEthUsdt);  
        else if(tokenName === 'Eat') setHarvestBalance(() => claimableEthUsdc);

    }, [
        card.title1, setHarvestBalance, claimableDogeETH, 
        claimableEthUsdt, claimableEthUsdc
    ])

    if(!card) return history.push('/menu');
    
    const submitApprove = async e => {
        await handleApproveToken(
            loading, approveAmount, card,
            web3, user, ETH_DOGE, 
            EHT_USDT, EHT_USDC, dogeTokenAddress
        )(e)
    }

    const submitStake = async e => {
        await handleStakeToken(
            loading, stakeAmount, card,
            stakeDogeEthTokens, stakeEthUsdtTokens, stakeEthUsdcTokens
        )(e)
    }

    const submitHarvest = async e => {
        await handleHarvestToken(
            loading, card, harvestBalance,
            claimEthDogePuppyTokens, claimEthUsdtPuppyTokens, claimEthUsdcTokens
        )(e)
    }

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
                            <input 
                                type="number" 
                                value={approveAmount} 
                                placeholder='0.00'
                                min='0'
                                onChange={e => setApproveAmount(e.target.value)}
                            />
                        </div>
                        <button className="card-btn" onClick={submitApprove}>Approve</button>
                    </div>

                    <div className="card-one">
                        <div className="card-icon">
                            <span role="img" aria-label="">{card.icon}</span>
                        </div>
                        <div style={{margin: '1rem 0 3rem 0'}}>
                            <h4 className="card-head">{card.title1}</h4>
                            <input 
                                type="number" 
                                value={stakeAmount} 
                                placeholder='0.00'
                                min='0'
                                onChange={e => setStakeAmount(e.target.value)}
                            />
                        </div>
                        <button className="card-btn" onClick={submitStake}>Stake</button>
                    </div>

                    <div className="card-one">
                        <div className="card-icon">
                            <span role="img" aria-label="">{card.icon}</span>
                        </div>
                        <div style={{margin: '1rem 0 3rem 0'}}>
                            <h4 className="card-head">{card.title1}</h4>
                            <p className="card-text">{card.title2}</p>
                            <p className="card-text">{`${harvestBalance}.00`}</p>
                        </div>
                        <button className="card-btn" onClick={submitHarvest}>
                            Harvest
                        </button>
                    </div>
                </div>
            </SingleStakePageContainer>
        </>
    )
}

export default ErrorBoundary(SingleStakePage);