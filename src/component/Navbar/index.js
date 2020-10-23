import React, { useState, useContext } from 'react';
import { NavLink, Link } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiCloudUpload } from "react-icons/bi";
import { userContext } from "../Context";
import { NavbarContainer } from './navbar.styled.js';
import user from '../../asset/chef.jpg';
import './navbar.css';

export function Navbar({ theme }) {
    const [navOpen, setNavOpen] = useState(false);

    const web3Consumer = useContext(userContext);
    const { isLoggedIn, userData } = web3Consumer;

    const _active = {
        'padding': '.75rem',
        'background': 'var(--mainGreen)',
        'borderTopLeftRadius': '1rem',
        'borderBottomRightRadius': '1rem'
    }
    let Navlist = ['', 'Products','Blog', 'About',  'Contact'];
    Navlist = Navlist.map((item, i) => {
        return (
            <NavLink 
                key={i} 
                exact
                activeStyle={_active} 
                to={item.replace('','/').toLowerCase()}
                className='mainSpacing'
            >
                {item === '' ? 'Home' : item}
            </NavLink>
        );
    });

    return (
        <NavbarContainer className='grid navbar' theme={theme}>
            <div className="grid nav-brand">
                <Link to='/'>
                    {/* <img src={logo} alt="Edumark"/> */}
                    <h2 className='mainSpacing'>
                        Silk<span>road</span>
                    </h2>
                </Link>
            </div>
            <div className={ navOpen ? 'grid nav-list nav-list-mobile' : 'grid nav-list' }>
                <ul>{Navlist}</ul>
            </div>
            <div className="grid nav-icons">
                <Link to='/cart' className='grid'>
                    <AiOutlineShoppingCart className='icon' />
                </Link>

                <Link to={isLoggedIn ? '/products/auth/new' : '/login'}  className={isLoggedIn ? 'grid' : 'hide'}>
                    <BiCloudUpload className='icon' />
                </Link>

                <Link to={isLoggedIn ? '/products/auth/new' : '/login'} className='grid'>
                    <img 
                        src={isLoggedIn ? userData.image : user} 
                        alt="user" 
                        className={isLoggedIn ? 'online': 'offline'}
                    />
                </Link>
            </div>
            <div className="toggle">
                <FaAlignRight className='icon' onClick={() => setNavOpen(!navOpen)} />
            </div>
        </NavbarContainer>
    )
}

export default Navbar