import React, { FC, useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { AuthContext } from '../context/Auth';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const { userAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    userAuthenticated();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1 id="home">Home</h1>
    </Layout>
  );
};

export default HomePage;
