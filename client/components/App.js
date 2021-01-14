import React from 'react'
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Route, hashHistory, IndexRoute, Router } from 'react-router';

import Main from "./Main";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Dashboard from "./Dashboard";
import RequireAuth from "./RequireAuth";

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
})

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <Router path="login" component={LoginForm} />
          <Router path="signup" component={SignUpForm} />
          <Router path="dashboard" component={RequireAuth(Dashboard)} />
        </Route>
      </Router>
    </ApolloProvider>
  )
}

export default App;
