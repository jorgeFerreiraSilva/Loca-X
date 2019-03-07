import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import App from './App';

const mountNode = document.getElementById('app');
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  mountNode
);
