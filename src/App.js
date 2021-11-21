import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Login from "./components/Login";
import Signup from "./components/Signup";

import { auth } from "./firebase";
import React, { useState, useContext } from "react";
import AuthContext from "./store/auth-contex";
import { AddExpense } from "./components/expense/AddExpense";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ExpenseList } from "./components/expense/ExpenseList";
import { Navigation } from "./components/Navigation";
function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (

    <div className="App">
      <Router>
      {isLoggedIn && <Navigation/>}
        <Switch>

          <Route exact path="/">
            {isLoggedIn && <AddExpense/>}
            {!isLoggedIn && <Login />}
          </Route>
          <Route exact path="/sign" component={Signup} />
          <Route exact path="/expenselist">
            {isLoggedIn && <ExpenseList/> }
            </Route> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
