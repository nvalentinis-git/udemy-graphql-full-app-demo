import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import AuthForm from './AuthForm';

import { login } from '../gql/mutations';
import { currentUser } from '../gql/queries'

class LoginForm extends Component {
  // This method is declared unsafe by React
  componentWillUpdate(nextProps, nextState, nextContext) {
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard');
    }
  }

  onLogin({ email, password }) {
    return this.props.mutate({
      variables: {
        email,
        password
      },
      refetchQueries: [{query: currentUser }]
    })
  }

  render() {
    return(
      <div>
        <h3>Login</h3>
        <AuthForm
          onSubmit={this.onLogin.bind(this)}
        />
      </div>
    )
  }
}

export default graphql(currentUser)(
  graphql(login)(LoginForm)
);
