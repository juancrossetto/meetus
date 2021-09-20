import React, { FC } from 'react';
import Layout from '../components/Layout';

interface SettingsPageProps {}

const SettingsPage: FC<SettingsPageProps> = () => {
  return (
    <Layout>
      <p>Configuración</p>
    </Layout>
  );
};

export default SettingsPage;
