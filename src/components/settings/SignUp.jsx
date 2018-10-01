import React, { Component } from 'react';
import { auth, db }         from '../firebase/index';
import PageNavigation       from '../PageNavigation';
import '../../css/Settings.sass'

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, passwordOne } = this.state;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
    .then(authUser => {
      // Create a user in your own accessible Firebase Database too
      db.doCreateUser(authUser.user.uid, email)
        .then(() => this.setState({ ...INITIAL_STATE }))
        .catch(error => this.setState(byPropKey('error', error)));
      })
    .catch(error => this.setState(byPropKey('error', error)));

    event.preventDefault();
  }

  render() {
    const { email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '';

    return (
      <div className='route-transition enter-left exit-bottom' key='signup-form'>
        <PageNavigation
          back={['/', 'Dashboard']}
          title='Sign Up'
          />
      <form className='login' onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
          />
        <input
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
          />
        <input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
          />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>
      <div className="signin"  onClick={this.props.setOption.bind(null, 0)}>
        Already have an account?
        <span>Sign In</span>
      </div>
    </div>
    );
  }
}

export {
  SignUpForm,
};
