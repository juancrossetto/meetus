import React, { FC, useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/Auth';

interface PrivateRouteProps {
  component: any;
  path: string;
}
const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, path, ...props }) => {
  const { authenticated, loading, userAuthenticated, updateUserPoints } = useContext(AuthContext);

  useEffect(() => {
    userAuthenticated();
    const interval = setInterval(() => {
      updateUserPoints();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return (
    //Si autenticado es false o null, lo manda a la ruta "/"
    //Si autenticado es true, lo manda al componente que se indica en el tag.
    <Route
      path={path}
      {...props}
      render={(props) => (!authenticated && !loading ? <Redirect to="/login" /> : <Component key={0} {...props} />)}
    />
  );
};

export default PrivateRoute;
