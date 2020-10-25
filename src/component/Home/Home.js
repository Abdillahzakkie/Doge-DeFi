import React from 'react';
import Navbar from '../Navbar';
import { ErrorBoundary } from "../ErrorBoundary";
import logo from "../../asset/62_624227_puppy_cute_adorable_digital_cartoon_dog_animal_puppy.png";
import { HomeContainer } from "./home.styled";

function Home() {
    return (
        <HomeContainer className='grid'>
            <Navbar />
            <div className="grid sushiChef">
                <div className="logo">
                    <img src={logo} alt=""/>
                </div>
                <h4 className="select-dish">MasterChef is Ready</h4>
                <h3 className="sushi-token">Stake SushiSwah3 LP tokens to claim your very own yummy SUSHI!</h3>
            </div>

            <div className="grid container">
                <section className="grid section-icon">
                    <div className="icon">
                        <span  role="img" aria-label="">🍣</span>
                    </div>
                    <div className="grid token">
                        <p>Your SUSHI Balance</p>
                        <h1>Locked</h1>
                    </div>
                    <div className="grid result">
                        <p>pending harvesting</p>
                        <p id='right'>0.00 SUSHI</p>
                    </div>
                </section>


                <section className="grid section-icon sec-two">
                    <div className="grid token">
                        <p>Total SUSHI Supply</p>
                        <h1>Locked</h1>
                    </div>
                    <div className="grid result">
                        <p>New rewards per block</p>
                        <p id='right'>100 SUSHI</p>
                    </div>
                </section>
            </div>
        </HomeContainer>
    )                                                                       
}

export default ErrorBoundary(Home)
