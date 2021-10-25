import React from 'react';
import {
  // Route,
  Switch,
} from 'react-router';
import SettingsPage from './pages/SettingsPage';
import HomePage from './pages/HomePage';

import RewardsPage from './pages/RewardsPage';
import PrivateRoute from './components/PrivateRoute';
import DailyQuestionPage from './pages/DailyQuestionPage';
// import LoginPage from './pages/LoginPage';
import RoomsPage from './pages/RoomsPage';
import TriviaPage from './pages/TriviaPage';
// import RegisterPage from './pages/RegisterPage';
// import ForgetPasswordPage from './pages/ForgetPassword';

function App() {
  return (
    <Switch>
      <PrivateRoute component={SettingsPage} path="/settings" />
      <PrivateRoute component={RewardsPage} path="/rewards" />
      <PrivateRoute component={DailyQuestionPage} path="/daily-question" />
      <PrivateRoute component={TriviaPage} path="/trivia" />
      <PrivateRoute component={RoomsPage} path="/rooms" />
      {/* <Route exact component={RegisterPage} path="/register" />
      <Route exact component={ForgetPasswordPage} path="/recover-password" />
      <Route exact component={LoginPage} path="/login" /> */}
      <PrivateRoute component={HomePage} path="/login" />
      <PrivateRoute component={HomePage} path="/" />
      {/* <Redirect exact to="/" /> */}
    </Switch>
  );
}

export default App;
