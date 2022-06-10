import axios from 'axios';
import React from 'react'
import AppRouter from './routes';
axios.defaults.withCredentials=true
axios.defaults.headers.post['Content-Type']='application/json'
axios.defaults.headers.post['Accept']='application/json'
axios.defaults.baseURL="http://localhost:8000/"
function App() {
  return (
    <AppRouter/>
  );
}

export default App;
