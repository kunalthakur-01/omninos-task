import React, { useState } from 'react';

export const contextManage = React.createContext({
    isLogin: false,
    userData: {},
    login: () => {},
    logout: () => {},
});

export const ContextProvider = props => {

    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState({});

    const login = (data) => {
        setIsLogin(true);
        setUserData(data);
    }
    
    const logout = () => {
        setIsLogin(false);
        setUserData(null);
    }

    return (
        <contextManage.Provider value={ { userData, isLogin, login, logout} }>
            {props.children}
        </contextManage.Provider>
    )
}