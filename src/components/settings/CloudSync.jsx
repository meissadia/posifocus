import React from 'react';
import { auth } from '../firebase/index';
import { SignInForm } from './SignIn';
import { SignUpForm } from './SignUp';
import uploadIcon     from '../../images/upload.svg';
import downloadIcon   from '../../images/cloud-download.svg';
import logoutIcon     from '../../images/logout.svg';


const SIGNIN = 0;
const SIGNUP = 1;

class CloudSync extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: SIGNIN,
    }
    this.byKey = this.byKey.bind(this);
  }

  show(route) {
    return this.state.show === route;
  }

  byKey(key, value) {
    this.setState({ [key]: value });
    return true;
  }

  render() {
    return(
      <div className='cloud-sync'>
        { this.show(SIGNIN) && !this.props.state.authUser &&
          <SignInForm byKey={this.byKey.bind(null, 'show', SIGNUP)} />
        }
        { this.show(SIGNUP) && !this.props.state.authUser &&
          <SignUpForm byKey={this.byKey.bind(null, 'show', SIGNIN)} />
        }
        { !!this.props.state.authUser &&
          <CloudSettings {...this.props} byKey={this.byKey}/>
        }
      </div>
    )
  }
}

let CloudSettings = (props) => {
  let {authUser} = props.state;
  let verifyAndSignOut = (event) => {
    if(window.confirm('Are you sure you want to Sign Out?')){
      auth.doSignOut();
      props.byKey('show', SIGNIN);
      props.resetSettingsState();
    }
  }
  return(
    <div className="options">
      <h1 className='title'>CloudSync</h1>
      <div
        onClick={props.syncToCloud.bind(null, props.state)}
        className="sync-button">
        <h1>Sync to Cloud</h1>
        <img className='icon invert' src={uploadIcon} alt='Arrow up into cloud' />
        <p>Save your content to Cloud storage.</p>
        <p className='warn'></p>
      </div>
      <div
        onClick={props.syncFromCloud.bind(null, authUser.uid, props.updateState)}
        className="sync-button">
        <h1>Download from Cloud</h1>
        <img className='icon invert' src={downloadIcon} alt='Arrow down into inbox' />
        <p>Restore your content from Cloud storage.</p>
      </div>
      <div
        onClick={verifyAndSignOut}
        className="sync-button">
        <h1>Sign Out</h1>
        <img className='icon invert' src={logoutIcon} alt='Arrow exiting door' />
        <p>Disconnect Cloud Backup.</p>
      </div>
    </div>
  )
}

export default CloudSync;
