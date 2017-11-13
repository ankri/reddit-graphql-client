import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'whatwg-fetch';
import Typography from 'typography';
import sutroTheme from 'typography-theme-sutro';
import 'typeface-open-sans';
import 'typeface-merriweather';

const typography = new Typography(sutroTheme);
typography.injectStyles();

ReactDOM.render(<App />, document.getElementById('root'));
