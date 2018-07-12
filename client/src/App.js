import React, { Component } from 'react';
import Header from './components/Header/Header'
import {BrowserRouter, Route, } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Feed from './components/Feed/Feed'
import Profile from './components/Profile/Profile'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import { connect } from 'react-redux'
import { fetchUser } from './redux/actions/authActions'
import './App.css';

class App extends Component {

  componentDidMount = () => {
    this.props.fetchUser()
  };
  

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route path="/" exact component={Feed} />
          <Route path="/feed" exact component={Feed} />
          <Route path ="/profile" component={Profile} />
          <Route path ="/login" component={Login} />
        <Route path ="/signup" component={Signup} />

        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
