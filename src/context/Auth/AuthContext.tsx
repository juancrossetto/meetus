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
  updatePoints: () => {},
  updateUserPoints: () => {},
  setMessage: () => {},
  sendEmail: () => {},
  getDailyQuestions: () => null,
  getHistoryTrades: () => null,
};

export const AuthContext = createContext<AuthContextState>(contextDefaultValues);

const AuthProvider: FC = ({ children }) => {
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
      setMessage({ msg: `Felicitaciones ${data.name}, te registraste correctamente`, category: 'success' });
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error: any) {
      const alert = {
        msg: error.response.data.errores ? error.response.data.errores[0].msg : error.response.data.msg,
        category: 'error',
      };

      handleError(alert);
    }
  };

  const updatePoints = async (points: number) => {
    try {
      setLoading(true);
      const resp = await axiosClient.post(`/users/updatePoints/${user._id}`, { points });
      if (resp && resp.data) {
        setAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(resp.data.user));
        // get user authenticated
        userAuthenticated();
      }

      setLoading(false);
    } catch (error: any) {
      const alert = {
        msg: 'Error al actualizar puntos de usuario',
        category: 'error',
      };

      handleError(alert);
    }
  };

  const updateUserPoints = async () => {
    try {
      const usr = localStorage.getItem('user');
      if (usr) {
        let userUpdated = JSON.parse(usr);
        const resp = await axiosClient.get(`/users/getPoints/${userUpdated._id}`);
        if (usr && resp && resp.data) {
          userUpdated.points = resp.data.points;
          localStorage.setItem('user', JSON.stringify(userUpdated));
        }
        //  else {
        //   setAuthenticated(null);
        // }
      }
    } catch (error: any) {
      console.log('Error al obtener puntos de usuario', error);
      const alert = {
        msg: 'Error al obtener puntos de usuario',
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
      if (usr) {
        // setUser(usr);
        setUser(JSON.parse(usr));
      } else {
        const resp = await axiosClient.get('/auth');
        setUser(resp.data.user);
        localStorage.setItem('user', JSON.stringify(resp.data.user));
        // const userMock: User = {
        //   name: 'Bob',
        //   surName: 'Esponja',
        //   address: 'Calle Falsa 123',
        //   city: 'Fondo del Mar',
        //   country: 'Atlantida',
        //   dni: '98547312',
        //   email: 'bob@gmail.com',
        //   phoneNumber: '1515151516',
        //   points: 450000,
        //   image:
        //     'data:image/png;base64,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',
        // };
        // setUser(userMock);
        // localStorage.setItem('user', JSON.stringify(userMock));
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

  const sendEmail = async (email: Email) => {
    try {
      setLoading(true);
      const resp = await axiosClient.post('/email', email);
      if (resp) {
        setLoading(false);
        return resp.data;
      }
    } catch (error: any) {
      console.log('Error al enviar mail', error);
      const alert = {
        msg: 'Error al obtener mail',
        category: 'error',
      };

      handleError(alert);
      setLoading(false);
    }
  };

  const getDailyQuestions = async () => {
    try {
      const resp = await axiosClient.get<DailyQuestion[]>('/dailyQuestion');
      if (resp) {
        return resp.data;
      }
    } catch (error: any) {
      console.log('Error al obtener preguntas diarias', error);
      const alert = {
        msg: 'Error al obtener preguntas diarias',
        category: 'error',
      };

      handleError(alert);
    }
  };

  const getHistoryTrades = async () => {
    try {
      const usr = localStorage.getItem('user');
      if (usr) {
        let userUpdated = JSON.parse(usr);
        const resp = await axiosClient.get<DailyQuestion[]>(`/trade/${userUpdated._id}`);
        if (resp) {
          return resp.data;
        }
      }
    } catch (error: any) {
      console.log('Error al obtener historial de canjes', error);
      const alert = {
        msg: 'Error al obtener historial de canjes',
        category: 'error',
      };

      handleError(alert);
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
        updatePoints,
        updateUserPoints,
        setMessage,
        sendEmail,
        getDailyQuestions,
        getHistoryTrades,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
