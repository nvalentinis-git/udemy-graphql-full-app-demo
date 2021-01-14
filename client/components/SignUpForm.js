import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { hashHistory } from 'react-router';

import AuthForm from './AuthForm';

import { currentUser } from '../gql/queries'
import { signup } from '../gql/mutations';

class SignUpForm extends Component {
  // This method is declared unsafe by React
  componentWillUpdate(nextProps, nextState, nextContext) {
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard');
    }
  }

  onSignup({ email, password }) {
    return this.props.mutate({
      variables: {
        email,
        password
      },
      refetchQueries: [{ query: currentUser }]
    })
  }

  render() {
    return (
      <div>
        <h3>Sing Up</h3>
        <AuthForm
          onSubmit={this.onSignup.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(currentUser)(
  graphql(signup)(SignUpForm)
);
