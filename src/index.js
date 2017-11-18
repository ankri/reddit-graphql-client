import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Typography from 'typography';
import sutroTheme from 'typography-theme-sutro';
import 'whatwg-fetch';
import 'typeface-open-sans';
import 'typeface-merriweather';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
});

const typography = new Typography(sutroTheme);
typography.injectStyles();

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
