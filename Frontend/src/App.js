import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './Components/MainPage/MainPage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Appointment from './Components/Appointment/Appointment';
import 'bootstrap/dist/css/bootstrap.min.css';
import LabAppointment from './Components/LabAppointment/LabAppointment';
import Dashboard from './Components/Dashboard/Dashboard';
import Profile from './Components/Profile/Profile';
import Settings from './Components/Settings/Settings';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/AdminPanel/Login';
import AdminFeedback from "./Components/AdminPanel/AdminFeedback/AdminFeedback"

function App() {
  return (
    <div className='smooth-scroll'>
      <Router>
        <Switch>
          <Route exact path="/">
            <MainPage></MainPage>
          </Route>
          {/* <Route exact path="/">
            <Appointment></Appointment>
          </Route> */}
          <Route exact path="/admin/appointment">
            <LabAppointment></LabAppointment>
          </Route>
          <Route  path="/dashboard">
            <Dashboard></Dashboard>
          </Route>               
          <Route exact path="/admin/feedback">
            <AdminFeedback></AdminFeedback>
          </Route>
          <Route exact path="/admin/profile">
            <Profile></Profile>
          </Route>
          <Route exact path="/admin/settings">
            <Settings></Settings>
          </Route>
          <Route exact path="/admin">
            <Login></Login>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
