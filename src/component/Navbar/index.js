import React, { useState, useContext } from 'react';
import { NavLink, Link } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";
import { userContext } from "../Context";
import { NavbarContainer } from './navbar.styled.js';
import './Navbar.css';

export function Navbar({ theme }) {
    const [navOpen, setNavOpen] = useState(false);

    const userConsumer = useContext(userContext);
    const { connectWallet, user } = userConsumer;

    const _active = {
        'padding': '.75rem',
        'background': '#d16c00',
        'borderTopLeftRadius': '1rem',
        'borderBottomRightRadius': '1rem'
    }

    let Navlist = ['', 'Farm', 'Exchange'];
    Navlist = Navlist.map((item, i) => {
        return (
            <NavLink 
                key={i} 
                exact
                activeStyle={_active} 
                to={item.replace('','/').toLowerCase()}
                className='mainSpacing'
            >
                {
                item === '' ? 'Home' : item }
            </NavLink>
        );
    });

    return (
        <NavbarContainer className='grid navbar' theme={theme}>
            <div className="grid nav-brand">
                <Link to='/'>
                    <h2 className='mainSpacing'>
                        Sushi<span>Swap</span>
                    </h2>
                </Link>
            </div>
            <div className={ navOpen ? 'grid nav-list nav-list-mobile' : 'grid nav-list' }>
                <ul>{Navlist}</ul>
            </div>
            <div className="grid nav-icons">
                <button onClick={connectWallet}>
                    {user ? 'My Wallet' : 'Unlock Wallet'}
                </button>
            </div>
            <div className="toggle">
                <FaAlignRight className='icon' onClick={() => setNavOpen(!navOpen)} />
            </div>
        </NavbarContainer>
    )
}

export default Navbar