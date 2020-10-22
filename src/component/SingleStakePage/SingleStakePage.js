import React, { useContext } from 'react';
import { ErrorBoundary } from "../ErrorBoundary";
import { userContext } from '../Context';
import Navbar from '../Navbar';
import '../Menu/Menu.css';
import './singleStakePage.css';

const SingleStakePage = ({ match, history }) => {
    const userConsumer = useContext(userContext);
    const { getSlug } = userConsumer;

    const card = getSlug(match.params.id);
    if(!card) return history.push('/menu');

    const { icon, title1, title2, title3 } = card;

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
                        <div className="card-icon">
                            <span role="img" aria-label="">{icon}</span>
                        </div>
                        <div style={{margin: '1rem 0 3rem 0'}}>
                            <h4 className="card-head">{title1}</h4>
                            <p className="card-text">{title2}</p>
                            <p className="card-text">{title3}</p>
                        </div>
                        <button className="card-btn">
                            <a href="/">Select</a>
                        </button>
                        <div className="card-footer">
                            <span>APY</span>
                            <span>{card.apy}%</span>
                        </div>
                    </div>

                    <div className="card-one">
                        <div className="card-icon">
                            <span role="img" aria-label="">{icon}</span>
                        </div>
                        <div style={{margin: '1rem 0 3rem 0'}}>
                            <h4 className="card-head">{title1}</h4>
                            <p className="card-text">{title2}</p>
                            <p className="card-text">{title3}</p>
                        </div>
                        <button className="card-btn">
                            <a href="/">Select</a>
                        </button>
                        <div className="card-footer">
                            <span>APY</span>
                            <span>{card.apy}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ErrorBoundary(SingleStakePage);