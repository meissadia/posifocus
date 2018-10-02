import React, { Component }  from 'react';
import { auth }              from '../firebase/index';
import '../../styles/css/Settings.css'

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    auth.doSignInWithEmailAndPassword(email, password)
    .then(userAccount => {
      this.setState({ ...INITIAL_STATE });
    })
    .catch(error => {
      this.setState(byPropKey('error', error));
    });

    event.preventDefault();
  }

  render() {
    const { email, password, error } = this.state;
    const { byKey } = this.props;

    const isInvalid =
    password === '' ||
    email === '';

    return (
      <div className='form' key='signin-form'>
        <h1 className='title'>CloudSync</h1>
        <form className='login' onSubmit={this.onSubmit}>
          <input
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
            />
          <input
            value={password}
            onChange={event => this.setState(byPropKey('password', event.target.value))}
            type="password"
            placeholder="Password"
            />
          <button disabled={isInvalid} type="submit">
            Sign In
          </button>

          { error && <p>{error.message}</p> }
        </form>
        <div className="signup" onClick={byKey}>
          Don't have an account?
          <span>Sign Up</span>
        </div>
      </div>
    );
  }
}


export {
  SignInForm,
};
