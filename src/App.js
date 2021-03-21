import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Destination from './components/Destination/Destination';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RideItem from './RideItem/RideItem';

export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState( {} );
  console.log( loggedInUser )
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/destination">
            <Destination></Destination>
          </PrivateRoute>
          <PrivateRoute path='/ride/:name'>
            <RideItem></RideItem>
          </PrivateRoute>

        </Switch>
      </Router>

    </UserContext.Provider>
  );
}

export default App;
