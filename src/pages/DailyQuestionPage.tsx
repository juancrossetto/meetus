import React, { FC } from 'react';
import Layout from '../components/Layout';

interface DailyQuestionPageProps {}

const DailyQuestionPage: FC<DailyQuestionPageProps> = () => {
  return (
    <Layout>
      <p>Pregunta diaria</p>
    </Layout>
  );
};

export default DailyQuestionPage;
