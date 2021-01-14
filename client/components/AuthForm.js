import React, { Component } from 'react';

class AuthForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errors: [],
    }
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.onSubmit({
      email: this.state.email,
      password: this.state.password
    })
      .then(() => {
        this.setState({
          email: '',
          password: '',
          errors: [],
        })
      })
      .catch((error) => {
        const errorArray = error.graphQLErrors.map( error => error.message );

        console.log(errorArray)

        this.setState({ errors: errorArray })
      })
  }

  renderErrors() {
    return this.state.errors.map(error => {
      return (
        <li key={error}>{error}</li>
      );
    })
  }

  render() {
    return (
      <div className="row">
        <form onSubmit={this.onSubmit.bind(this)} className="col s4">
          <div className="input-field">
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={e => this.setState( { password: e.target.value })}
            />
          </div>
          <ul className="errors">
            {this.renderErrors()}
          </ul>
          <button className="btn">Submit</button>
        </form>
      </div>
    )
  }
}

export default AuthForm;
