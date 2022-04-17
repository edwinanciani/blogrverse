import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

export const ProvidedAuth = ({children}) =>{
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext);
}

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  const onLogin = (logged, token) => {
    localStorage.setItem('formioToken', token);
    localStorage.setItem('formioUser', JSON.stringify(logged));
    setUsername(logged.data?.username)
    setUser(logged);
    return logged;
  }

  const onRegister = (register) => {
    localStorage.setItem('formioToken', JSON.stringify(token));
    localStorage.setItem('formioUser', JSON.stringify(logged));
    setUsername(logged.data?.username)
    setUser(register);
  }

  const onLogout = () => {
    console.log('here?');
    localStorage.removeItem('formioToken');
    localStorage.removeItem('formioUser');
    setUser(null);
  }

  const getToken = () => {
    return localStorage.getToken('formioToken');
  }

  useEffect(() => {
    const token = localStorage.getItem('formioToken');
    const localUser= JSON.parse(localStorage.getItem('formioUser'));
    console.log(token);
    if(token) {
      setUsername(localUser.data.username);
      setUser(localUser);
    } else {
      setUser(null);
    }

    return () => localUser;

  }, [])

  return {
    user,
    username,
    onLogin,
    onRegister,
    onLogout,
    getToken
  }
}

export const UserContext = createContext({user: null, username: null})

export const PortfolioContext = createContext({portfolio: null, set: null})