import React          from 'react';
import { auth, db }   from '../firebase/index';
import { SignUpForm } from './SignUp';
import { SignInForm } from './SignIn';
import PageNavigation from '../PageNavigation';
import uploadIcon     from '../../images/upload.svg';
import downloadIcon   from '../../images/download.svg';
import logoutIcon     from '../../images/logout.svg';
import '../../css/Settings.css';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    this.syncToCloud = this.syncToCloud.bind(this);
    this.syncFromCloud = this.syncFromCloud.bind(this);
    this.setOption = this.setOption.bind(this);
    this.updateState = this.updateState.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount(){
    this.props.setBackground('settings');
  }

  initState = () => ({
    error: null,
    result: null,
    option: 0,
  })

  setOption(opt){
    this.setState({ option: opt });
  }

  updateState(obj) {
    this.setState({ ...obj });
  }

  resetState(){
    this.updateState(this.initState());
  }

  syncToCloud = (state, event) => {
    const msg = "This will overwrite all Cloud data!\n\nContinue?";
    let online = window.navigator.onLine;
    if(!online){
      this.setState({error: 'Cannot access Cloud features offline!', result: null});
      return;
    }
    if(window.confirm(msg)) {
      const { authUser, ...others} = state;
      db.doUpdateUser(authUser.uid, others)
      .then(result => this.setState({result: 'Saved!', error: null}))
      .catch(error => this.setState({ error, result: null }));
    }
  }

  syncFromCloud = (uid, updateAppState, event) => {
    const msg = "This will overwrite all Local data!\n\nContinue?";
    let online = window.navigator.onLine;
    if(!online){
      this.setState({error: 'Cannot access Cloud features offline!', result: null});
      return;
    }
    if(window.confirm(msg)) {
      db.doGetUser(uid)
      .then(snapshot => {
        const state = snapshot.val() && snapshot.val().state;
        if(state) {
          updateAppState(state);
          this.setState({result: 'App data restored!', error: null});
        } else {
          this.setState({error: 'No backup data found!', result: null});
        }
      })
      .catch(error =>  this.setState({error, result: null}))
    }
  }

  render(){
    const { authUser } = this.props.state;
    let main = null;
    if (authUser) {
      main =
        <CloudSync
          state={this.props.state}
          updateState={this.props.updateState}
          syncToCloud={this.syncToCloud}
          syncFromCloud={this.syncFromCloud}
          resetState={this.resetState}
          />
    } else if (this.state.option === 0) {
      main =  <SignInForm setOption={this.setOption} />
    } else {
      main =  <SignUpForm setOption={this.setOption} />
    }

    return (
      <div className="settings route-transition enter-right exit-right">
        <Result msg={this.state.error}  type='error' />
        <Result msg={this.state.result} type='success' />
        {main}
      </div>
    );
  }
}

// Render option buttons for Authorized Cloud Actions
const CloudSync = props => (
  <div className='cloud-sync'>
    <PageNavigation
      back={['/', 'Dashboard']}
      title='Settings'
      addNonLink={props.state.authUser.email}
      />
    <div className="options">
      <div
        onClick={props.syncToCloud.bind(null, props.state)}
        className="sync-button">
        <h1>Sync to Cloud</h1>
        <img className='icon' src={uploadIcon} alt='Arrow up into cloud' />
        <p>Save your content to Cloud storage.</p>
        <p className='warn'></p>
      </div>
      <div
        onClick={props.syncFromCloud.bind(null, props.state.authUser.uid, props.updateState)}
        className="sync-button">
        <h1>Download from Cloud</h1>
        <img className='icon' src={downloadIcon} alt='Arrow down into inbox' />
        <p>Restore your content from Cloud storage.</p>
      </div>
      <div
        onClick={verifyAndSignOut.bind(null, props.resetState)}
        className="sync-button">
        <h1>Sign Out</h1>
        <img className='icon' src={logoutIcon} alt='Arrow exiting door' />
        <p>Disconnect Cloud Backup.</p>
      </div>
    </div>
  </div>
)

const verifyAndSignOut = (resetState, event) =>
  window.confirm('Are you sure you want to Sign Out?')
    && auth.doSignOut()
    && resetState();

// Display message
const Result = props =>
  props.msg
    ? <p className={'result ' + props.type}>{props.msg}</p>
    : null

export default Settings;
