import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import 'papercss/dist/paper.css';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import Router from './Router';

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router />
  </ApolloProvider>,
  document.getElementById('root')
);
