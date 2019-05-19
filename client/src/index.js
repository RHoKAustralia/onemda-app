import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter as Router } from 'react-router-dom'

const cache = new InMemoryCache()

const token = localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null

const headers = token ? {
  Authorization: token
} : {}

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000/graphql',
  headers
})

const client = new ApolloClient({
  cache,
  link: httpLink,
})

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token')
  }
})

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
