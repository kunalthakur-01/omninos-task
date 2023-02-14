import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Cart.css';

import useHttp from '../hooks/auth-hook';
import { contextManage } from '../context/manage-context';
import LoadingSpinner from '../component/UI/LoadingSpinner';
import { getcart } from '../apis/HttpOtherApis';

const Cart = () => {

    const { sendRequest, data, error, status } = useHttp(getcart);
    const [cartItems, setcartItems] = useState(null);
    const ctx = useContext(contextManage);

    useEffect(() => {
        if (ctx.isLogin) {
            sendRequest(ctx.userData.userId);
        }
        else {
            setcartItems(null);
        }
    }, [ctx, sendRequest]);

    useEffect(() => {
        if (status === "completed" && !error) {
            setcartItems(data.userCart);
        }
    }, [status, error, data]);


    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        )
    };

    // console.log(cartItems);

    return (
        <section className='cart-section'>
            {cartItems && cartItems.items.length && <div className="cart">
            <h1>User's cart</h1>
                <ul>
                    {cartItems.items.map(item => <li key={item}>{item}</li>)}   
                </ul>
            </div>}

            {(!cartItems || !cartItems.items.length) && <div className='no_items_found'>
                <h2>No items!</h2>
                <Link to={'/products'}>
                    <button>Shop Now</button>
                </Link>
            </div>}
        </section>
    )
}

export default Cart;
