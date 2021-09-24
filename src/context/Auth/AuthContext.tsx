import React, { createContext, FC, useState } from 'react';

import axiosClient from '../../config/axios';
import tokenAuth from '../../config/token';
import { AuthContextState } from './types';

const contextDefaultValues: AuthContextState = {
  token: localStorage.getItem('token'),
  authenticated: false,
  user: null,
  message: null,
  loading: false,
  registerUser: () => {},
  userAuthenticated: () => {},
  login: () => {},
  closeSession: () => {},
  changePassword: () => {},
};

export const AuthContext = createContext<AuthContextState>(contextDefaultValues);

const DogsProvider: FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(contextDefaultValues.token);
  const [authenticated, setAuthenticated] = useState<boolean | null>(contextDefaultValues.authenticated);
  const [message, setMessage] = useState<Message | null>(contextDefaultValues.message);
  const [loading, setLoading] = useState<boolean>(contextDefaultValues.loading);
  const [user, setUser] = useState<any>(contextDefaultValues.user);

  const registerUser = async (data: any) => {
    try {
      setLoading(true);
      const resp = await axiosClient.post(`/users`, data);
      setAuthenticated(true);
      setMessage(null);
      localStorage.setItem('token', resp.data);
      // get user authenticated
      userAuthenticated();
      setLoading(false);
    } catch (error: any) {
      const alert = {
        msg: error.response.data.errores ? error.response.data.errores[0].msg : error.response.data.msg,
        category: 'error',
      };

      handleError(alert);
    }
  };

  const userAuthenticated = async () => {
    setAuthenticated(true);
    setLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      tokenAuth(token);
    }
    try {
      const usr = localStorage.getItem('user');
      if (user) {
        setUser(usr);
      } else {
        const resp = await axiosClient.get('/auth');
        setUser(resp.data.user);
        localStorage.setItem('user', JSON.stringify(resp.data.user));
      }

      setLoading(false);
    } catch (error: any) {
      handleError(null);
    }
  };

  // When user logged In
  const login = async (data: User) => {
    try {
      setLoading(true);
      const resp = await axiosClient.post('/auth', data);
      localStorage.setItem('token', resp.data.token);
      setLoading(false);
      setMessage(null);
      setAuthenticated(true);

      // get user
      userAuthenticated();
    } catch (error: any) {
      const alert = {
        msg: error.response.data.msg,
        category: 'error',
      };
      handleError(alert);
    }
  };

  // User Close session
  const closeSession = () => {
    handleError(null);
  };

  const changePassword = async (data: any) => {
    try {
      setLoading(true);
      await axiosClient.put('/auth/changePassword', data);

      if (data.resetPassword) {
        setLoading(false);
      } else {
        setMessage({ msg: 'Cambio de contraseña exitoso', category: 'success' });
        setLoading(false);
      }
      return true;
    } catch (error: any) {
      const alert = {
        msg: error.response.data.msg,
        category: 'error',
      };
      handleError(alert);
      return false;
    }
  };

  const handleError = (msg?: Message | null) => {
    setToken(null);
    setUser(null);

    setAuthenticated(null);
    if (msg) {
      setMessage(msg);
    }
    setLoading(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        authenticated,
        user,
        message,
        loading,
        registerUser,
        userAuthenticated,
        login,
        closeSession,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default DogsProvider;
