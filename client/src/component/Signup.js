// import React, { useState } from 'react';
// import { HttpSignup } from '../apis/auth-apis';
// import useAuth from '../hooks/auth-hook';

// import './Signup.css';

// const Signup = () => {
//     const { sendRequest, data, error, status } = useAuth(HttpSignup);

//     const [inputUser, setInputUser] = useState();
//     const [inputEmail, setInputEmail] = useState();
//     const [inputPassword, setInputPassword] = useState();

//     const UserHandler = (e) => {
//         setInputUser(e.target.value);
//     };
//     const emailHandler = (e) => {
//         setInputEmail(e.target.value);
//     };
//     const passwordHandler = (e) => {
//         setInputPassword(e.target.value);
//     };

//     const signupFormHandler = (e) => {
//         e.preventDefault();
//         sendRequest({ name: inputUser, email: inputEmail, password: inputPassword });
//     };

//     return (
//         <form onSubmit={signupFormHandler} className='Signup'>
//             <div className="input_field">
//                 <label htmlFor="name">name</label>
//                 <input value={inputUser} type="text" placeholder='enter your name' />
//             </div>
//             <div className="input_field">
//                 <label htmlFor="email">Email</label>
//                 <input value={inputEmail} type="text" placeholder='enter your email' />
//             </div>
//             <div className="input_field">
//                 <label htmlFor="password">password</label>
//                 <input value={inputPassword} type="password" placeholder='enter password' />
//             </div>
//             <button type='submit'>Signup</button>
//         </form>
//     )
// }

// export default Signup










import React, { useRef, useEffect, useContext } from 'react';

import './Signup.css';
import useAuth from '../hooks/auth-hook';
import { HttpSignup } from '../apis/auth-apis';


import { useNavigate } from 'react-router-dom';
import { contextManage } from '../context/manage-context';
import LoadingSpinner from './UI/LoadingSpinner';


const Signup = () => {

    const { sendRequest, data, error, status } = useAuth(HttpSignup);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const ctx = useContext(contextManage);

    const navigate = useNavigate();

    const signupFormSubmitHandler = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        sendRequest({ name, email, password });

        nameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
    };

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
        <section className='signup-section'>
            <form onSubmit={signupFormSubmitHandler}>
                <div className="form-input">
                    <label htmlFor="name">Name</label>
                    <input type="text" ref={nameRef} placeholder='Enter your name' required />
                </div>
                <div className="form-input">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" ref={emailRef} placeholder='test@test.com' required />
                </div>
                <div className="form-input">
                    <label htmlFor="password">Password</label>
                    <input type="password" ref={passwordRef} placeholder='password' required />
                </div>
                <button type='submit' className='signup-form-btn'>Signup</button>
            </form>
        </section >
    )
}

export default Signup;
