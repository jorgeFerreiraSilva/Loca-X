import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

let mountNode = document.getElementById('app');
ReactDOM.render(<App name="Jane" />, mountNode);
