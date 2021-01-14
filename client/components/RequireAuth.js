import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import { currentUser } from '../gql/queries'

export default (WrappedComponent) => {
  class RequireAuthInner extends Component {
    componentWillUpdate(nextProps) {
      if (!nextProps.data.user && !nextProps.data.loading) {
        hashHistory.push('/login');
      }
    }

    render() {
      return <WrappedComponent { ...this.props } />
    }
  }

  return graphql(currentUser)(RequireAuthInner)
};
