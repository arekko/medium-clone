import React, { Component } from 'react';
import Header from './components/Header/Header'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Feed from './components/Feed/Feed'
import Profile from './components/Profile/Profile'
// import Login from './components/Login/Login'
// import Signup from './components/Signup/Signup'
import ArticleView from './components/ArticleView/ArticleView'
import { connect } from 'react-redux'
import { fetchUser } from './redux/actions/authActions'
import Editor from './components/Editor/Editor'
import PrivateRoute from './components/common/PrivateRoute'
import './App.css';
import Layout from './components/Layout'
class App extends Component {

  componentDidMount = () => {
    this.props.fetchUser()
  };
  

  render() {
    const pathname = window.location.pathname

    return (
      <BrowserRouter>
        <div className="app">
          <div className="container">
          <Route path="/" exact component={Feed} />
          <Route path ="/profile" exact component={Profile} />
          <Route path="/articleview/:id" component={ArticleView} />
          <Route path="/profile/:id" component={Profile} />
          <Switch>
            <PrivateRoute path="/editor" component={Editor} />
          </Switch> 

          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
