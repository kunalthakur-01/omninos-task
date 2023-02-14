import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AiOutlineShoppingCart } from 'react-icons/ai';

import './Header.css';
import { contextManage } from '../context/manage-context';

const Header = () => {
    const ctx = useContext(contextManage);

    return (
        <header className='header'>
            <nav>
                <h2>Task</h2>
                <ul>
                    {!ctx.isLogin && <li><Link to={'/login'}>Login</Link></li>}
                    {!ctx.isLogin && <li><Link to={'/signup'}>Signup</Link></li>}
                    {ctx.isLogin && <button>Sign out</button>}
                    <li><Link to={'/cart'}><AiOutlineShoppingCart className='cart_icon' /></Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
