import axiosClient from './axios';

const tokenAuth = (token: string) => {
  if (token) {
    //si existe un token, lo pasamos al header.
    axiosClient.defaults.headers.common['x-auth-token'] = token;
  } else {
    //si se cerro la sesion o vencio se borra el token
    delete axiosClient.defaults.headers.common['x-auth-token'];
  }
};

export default tokenAuth;
