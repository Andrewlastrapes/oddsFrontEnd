import React from 'react';
import './App.css';
import Dashboard from "./Dashboard";
import Register from "./Register";
import Login from "./Login";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./store";


function App() {
  return (
    <div className="app"> 
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={Register} />
        <Route path="/login/" component={Login} />
        <Route path="/dashboard/" component={Dashboard} />
       </Router>
      </Provider>
    </div>
  );
}

export default App;
