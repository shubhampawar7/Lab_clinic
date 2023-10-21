import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './Components/MainPage/MainPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,


} from "react-router-dom";
import Appointment from './Components/Appointment/Appointment';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLabAppointment from './Components/AdminLabAppointment/AdminLabAppointment';
import Dashboard from './Components/Dashboard/Dashboard';
import AdminProfile from './Components/AdminProfile/AdminProfile';
import Settings from './Components/Settings/Settings';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/AdminPanel/Login';
import AdminFeedback from "./Components/AdminPanel/AdminFeedback/AdminFeedback";
import Protected from './Components/Protected';

function App() {
  useState(true);


  return (
    <div className='smooth-scroll'>
      <Router>
        <Switch>
          <Route exact path="/">
            <MainPage></MainPage>
          </Route>
          <Route exact path="/admin">
            <Login></Login>
          </Route>
          <Protected
            exact
            path='/admin/dashboard'
            component={Dashboard}
          />
          <Protected
            exact
            path="/admin/appointment"
            component={AdminLabAppointment}
          />
          <Protected
            exact
            path="/admin/feedback"
            component={AdminFeedback}
          />
          <Protected
            exact
            path="/admin/profile"
            component={AdminProfile}
          />

          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
