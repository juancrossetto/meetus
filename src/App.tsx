import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Layout from './components/Layout';
import SettingsPage from './pages/SettingsPage';
import DailyQuestionPage from './pages/DailyQuestionPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RoomsPage from './pages/RoomsPage';
import TriviaPage from './pages/TriviaPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Switch>
      <Route exact component={SettingsPage} path="/settings" />
      <Route exact component={DailyQuestionPage} path="/daily-question" />
      <Route exact component={TriviaPage} path="/trivia" />
      <Route exact component={RoomsPage} path="/rooms" />
      <Route exact component={RegisterPage} path="/register" />
      <Route exact component={LoginPage} path="/login" />
      <Route exact component={HomePage} path="/" />
      <Redirect to="/" />
    </Switch>
  );
}

export default App;
