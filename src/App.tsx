import React, { useContext } from 'react';
import { Route, Switch } from 'react-router';
import SettingsPage from './pages/SettingsPage';
import HomePage from './pages/HomePage';

import RewardsPage from './pages/RewardsPage';
import PrivateRoute from './components/PrivateRoute';
import DailyQuestionPage from './pages/DailyQuestionPage';
import LoginPage from './pages/LoginPage';
import RoomsPage from './pages/RoomsPage';
import TriviaPage from './pages/TriviaPage';
import TradingHistoryPage from './pages/TradingHistoryPage';
import RegisterPage from './pages/RegisterPage';
import ForgetPasswordPage from './pages/ForgetPassword';
import { AuthContext } from './context/Auth';
import AdministrationPage from './pages/AdministrationPage';

function App() {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  return (
    <Switch>
      {['rrhh', 'all'].includes(user?.role ?? '') && <PrivateRoute component={AdministrationPage} path="/administration" />}
      {['user', 'all'].includes(user?.role ?? '') && <PrivateRoute component={TradingHistoryPage} path="/trading-history" />}
      <PrivateRoute component={SettingsPage} path="/settings" />
      {['user', 'all'].includes(user?.role ?? '') && <PrivateRoute component={RewardsPage} path="/rewards" />}
      {['user', 'all'].includes(user?.role ?? '') && <PrivateRoute component={DailyQuestionPage} path="/daily-question" />}
      {['user', 'all'].includes(user?.role ?? '') && <PrivateRoute component={TriviaPage} path="/trivia" />}
      {['user', 'all'].includes(user?.role ?? '') && <PrivateRoute component={RoomsPage} path="/rooms" />}
      <Route exact component={RegisterPage} path="/register" />
      <Route exact component={ForgetPasswordPage} path="/recover-password" />
      <Route exact component={LoginPage} path="/login" />
      <PrivateRoute component={HomePage} path="/login" />
      <PrivateRoute component={HomePage} path="/" />

      {/* <Redirect exact to="/" /> */}
    </Switch>
  );
}

export default App;
