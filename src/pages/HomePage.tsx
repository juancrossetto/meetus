import React, { FC } from 'react';
import Layout from '../components/Layout';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <Layout>
      <h1 id="home">Home</h1>
    </Layout>
  );
};

export default HomePage;
