// import React, { useState } from 'react';
// import { HttpLogin } from '../apis/auth-apis';
// import useAuth from '../hooks/auth-hook';

// import './Login.css';

// const Login = () => {
//     const { sendRequest, data, error, status } = useAuth(HttpLogin);

//     const [ inputEmail, setInputEmail ] = useState();
//     const [ inputPassword, setInputPassword ] = useState();

//     const emailHandler = (e) => {
//         setInputPassword(e.target.value);
//     };
//     const passwordHandler = (e) => {
//         setInputPassword(e.target.value);
//     };

//     const loginFormHandler = (e) => {
//         e.preventDefault();
//         sendRequest({ email: inputEmail, password: inputPassword });
//     }

//     return (
//         <form onSubmit={loginFormHandler} className='login_form'>
//             <div className="input_field">
//                 <label htmlFor="email">Email</label>
//                 <input onChange={emailHandler} type="text" value={inputEmail} placeholder='enter your email' />
//             </div>
//             <div className="input_field">
//                 <label htmlFor="password">password</label>
//                 <input onChange={passwordHandler} type="password" value={inputPassword} placeholder='enter password' />
//             </div>
//             <button type='submit'>Login</button>
//         </form>
//     )
// }

// export default Login










import React from 'react';
import { useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css';
import useAuth from '../hooks/auth-hook';
import { HttpLogin } from '../apis/auth-apis';
import { contextManage } from '../context/manage-context';
import LoadingSpinner from './UI/LoadingSpinner';


const Login = () => {
    const { sendRequest, data, error, status } = useAuth(HttpLogin);
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const ctx = useContext(contextManage);

    const loginFormSubmitHandler = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        sendRequest({ email, password });

        emailRef.current.value = '';
        passwordRef.current.value = '';
    }

    useEffect(() => {
        if (status === "completed" && !error) {
            navigate('/');
        }
    }, [status, error, navigate]);

    useEffect(() => {
        if (data) ctx.login(data);
    }, [data, ctx]);

    if(status === 'pending'){
        return (
            <div className='centered'>
                <LoadingSpinner />  
            </div>
        )
    }

    return (
        <section className='login-section'>
            <form onSubmit={loginFormSubmitHandler}>
                <div className="form-input">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" ref={emailRef} placeholder='test@test.com' required />
                </div>
                <div className="form-input">
                    <label htmlFor="password">Password</label>
                    <input type="password" ref={passwordRef} placeholder='password' required />
                </div>
                <button type='submit' className='login-form-btn'>Login</button>
            </form>
        </section>
    )
};

export default Login;
