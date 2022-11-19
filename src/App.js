import axios from 'axios';
import React from 'react'
import './App.css'

import AdminRoute from './AdminRoute'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainContent from './layout/admin/MainContent'
import Home from './components/frontend/Home'
import Login from './components/frontend/auth/Login'
import Register from './components/frontend/auth/Register'
import { Redirect } from 'react-router-dom';
import P403 from './components/errors/P403';
import P404 from './components/errors/P404';
import Contact from './components/frontend/Contact';
import PublicRoute from './PublicRoute';

axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://localhost:8000/"
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'


axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('auth_token')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
  }
)

function App() {
  return (
    <div>
      <Router>
        <Switch>
          {/* <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} /> */}
          <AdminRoute path="/admin" name="Admin" />
          <PublicRoute path="/" name="Home" />
          {/* <Route path="/admin" name ="Admin" render={(props) => <MainContent {...props}/> } /> */}
        </Switch>
      </Router>

    </div>
  );
}

export default App;
