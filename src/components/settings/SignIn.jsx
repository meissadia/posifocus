import React,
       { Component }  from 'react';
import { auth }       from '../firebase/index';
import PageNavigation from '../PageNavigation';
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

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div className='route-transition enter-left exit-bottom' key='signin-form'>
        <PageNavigation
          back={['/', 'Dashboard']}
          title='Sign In'
          />
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
      <div className="signup" onClick={this.props.setOption.bind(null, 1)}>
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
