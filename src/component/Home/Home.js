import React from 'react';
import { Navbar } from '../Navbar';
import sushiChefLogo from "../../asset/chef.jpg";
import { HomeContainer } from "./home.styled";

function Home() {
    return (
        <HomeContainer className='grid'>
            <Navbar />
            <div className="grid sushiChef">
                <div className="logo">
                    <img src={sushiChefLogo} alt=""/>
                </div>
                <h1>MasterChef is Ready</h1>
                <h3>
                    Stake SushiSwah3 LP tokens to claim your very own yummy SUSHI!
                </h3>
            </div>

            <div className="grid container">
                <section className="grid section-icon">
                    {/* eslint-disable-next-line */}
                    <span>🍣</span>
                    <div className="grid token">
                        <p>Your SUSHI Balance</p>
                        <h3>Locked</h3>
                    </div>
                    <div className="grid result">
                        <p>pending harvesting</p>
                        <p id='right'>0.000 SUSHI</p>
                    </div>
                </section>
                <section className="grid">
                    Hello
                </section>
            </div>
        </HomeContainer>
    )                                                                       
}

export default Home
