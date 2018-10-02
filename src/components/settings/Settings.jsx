import React          from 'react';
import { Route }      from 'react-router';
import { auth, db }   from '../firebase/index';
import { SignUpForm } from './SignUp';
import { SignInForm } from './SignIn';
import PageNavigation from '../PageNavigation';
import Credits        from './Credits';
import uploadIcon     from '../../images/upload.svg';
import downloadIcon   from '../../images/cloud-download.svg';
import logoutIcon     from '../../images/logout.svg';
import refreshIcon    from '../../images/reload.svg';
import creditsIcon    from '../../images/credits.svg';
import '../../css/Settings.sass';

const SIGNIN = 0;
const SIGNUP = 1;
const CREDITS = 2;

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    this.syncToCloud = this.syncToCloud.bind(this);
    this.syncFromCloud = this.syncFromCloud.bind(this);
    this.setOption = this.setOption.bind(this);
    this.updateState = this.updateState.bind(this);
    this.resetSettingsState = this.resetSettingsState.bind(this);
  }

  componentDidMount(){
    // this.props.setBackground('settings');
    // console.log(this.props);
  }

  initState = () => ({
    error: null,
    result: null,
    option: SIGNIN,
  })

  setOption(opt){
    this.setState({ option: opt });
  }

  updateState(obj) {
    this.setState({ ...obj });
  }

  resetSettingsState(){
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

    if (this.state.option === CREDITS) {
      return <Credits />
    }

    return (
      <div className="settings route-transition enter-right exit-right">
        <Result msg={this.state.error}  type='error' />
        <Result msg={this.state.result} type='success' />
        <CloudSync
          state={this.props.state}
          updateState={this.props.updateState}
          syncToCloud={this.syncToCloud}
          syncFromCloud={this.syncFromCloud}
          resetSettingsState={this.resetSettingsState}
          resetAppState={this.props.resetAppState}
          setOption={this.setOption}
          />
        <div className='local-options'>
          <div className='options'>
            <h1 className='title'>Device</h1>
            <div
              onClick={verifyAppReset.bind(null, this.props.resetAppState, this.resetSettingsState)}
              className="option-link">
              <h1>Reset Local Data</h1>
              <img className='icon invert' src={refreshIcon} alt='Cycle of Arrows' />
              <p>Deletes all locally stored content.</p>
            </div>
            <div
              onClick={this.setOption.bind(null,CREDITS)}
              className="option-link">
              <h1>Resource Credits</h1>
              <img className='icon invert' src={creditsIcon} alt='Cycle of Arrows' />
              <p>Thanks!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Render option buttons for Authorized Cloud Actions
class CloudSync extends React.Component {
  constructor(props) {
    super(props);
    this.state = { option: SIGNIN }
    this.setOption = this.setOption.bind(this);
  }

  setOption(opt){
    this.setState({ option: opt });
  }

  render(){
    let { authUser } = this.props.state;
    if(!authUser) {
      if (this.state.option === SIGNIN) {
        return <SignInForm setOption={this.setOption} />
      } else if (this.state.option === SIGNUP) {
        return <SignUpForm setOption={this.setOption} />
      }
    }
    return(
      <div className='cloud-sync'>
        <PageNavigation
          back={['/', 'Dashboard']}
          title='Settings'
          addNonLink={authUser.email}
          />
        <div className="options">
          <h1 className='title'>Cloud</h1>
          <div
            onClick={this.props.syncToCloud.bind(null, this.props.state)}
            className="sync-button">
            <h1>Sync to Cloud</h1>
            <img className='icon invert' src={uploadIcon} alt='Arrow up into cloud' />
            <p>Save your content to Cloud storage.</p>
            <p className='warn'></p>
          </div>
          <div
            onClick={this.props.syncFromCloud.bind(null, authUser.uid, this.props.updateState)}
            className="sync-button">
            <h1>Download from Cloud</h1>
            <img className='icon invert' src={downloadIcon} alt='Arrow down into inbox' />
            <p>Restore your content from Cloud storage.</p>
          </div>
          <div
            onClick={verifyAndSignOut.bind(null, this.props.resetSettingsState)}
            className="sync-button">
            <h1>Sign Out</h1>
            <img className='icon invert' src={logoutIcon} alt='Arrow exiting door' />
            <p>Disconnect Cloud Backup.</p>
          </div>
        </div>
      </div>
    )

  }
}



const verifyAndSignOut = (resetSettingsState, event) =>
window.confirm('Are you sure you want to Sign Out?')
&& auth.doSignOut()
&& resetSettingsState();

const verifyAppReset = (resetAppState, resetSettingsState) => {
  let reset_more = resetAppState();
  if(reset_more) {
    resetSettingsState();
    auth.doSignOut();
  }
}

// Display message
const Result = props =>
props.msg
? <p className={'result ' + props.type}>{props.msg}</p>
: null

export default Settings;
