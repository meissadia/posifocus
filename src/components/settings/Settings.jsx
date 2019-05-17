import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth, db } from '../firebase/index';

import refreshIcon from '../../images/reload.svg';
import creditsIcon from '../../images/credits.svg';
import '../../styles/css/Settings.css';

import { GlobalContext } from '../App';
import PageNavigation from '../PageNavigation';
import CloudSync from './CloudSync';
import Credits from './Credits';

const enterDirection = (props) => {
  const direction = props.location
    && props.location.state
    && props.location.state.enter

  return direction || 'enter-right'
}

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    this.syncToCloud = this.syncToCloud.bind(this);
    this.syncFromCloud = this.syncFromCloud.bind(this);
    this.resetSettingsState = this.resetSettingsState.bind(this);
  }

  initState = () => ({
    error: null,
    result: null,
  })

  resetSettingsState() {
    this.setState(this.initState());
  }

  syncToCloud = (state, event) => {
    const msg = "This will overwrite all Cloud data!\n\nContinue?";
    const online = window.navigator.onLine;
    if (!online) {
      this.setState({ error: 'Cannot access Cloud features offline!', result: null });
      return;
    }
    if (window.confirm(msg)) {
      const { authUser, ...others } = state;
      db.doUpdateUser(authUser.uid, others)
        .then(result => this.setState({ result: 'Saved!', error: null }))
        .catch(error => this.setState({ error, result: null }));
    }
  }

  syncFromCloud = (uid, updateAppState, event) => {
    const msg = "This will overwrite all Local data!\n\nContinue?";
    const online = window.navigator.onLine;
    if (!online) {
      this.setState({ error: 'Cannot access Cloud features offline!', result: null });
      return;
    }
    if (window.confirm(msg)) {
      db.doGetUser(uid)
        .then(snapshot => {
          const state = snapshot.val() && snapshot.val().state;
          if (state) {
            updateAppState(state);
            this.setState({ result: 'App data restored!', error: null });
          } else {
            this.setState({ error: 'No backup data found!', result: null });
          }
        })
        .catch(error => {
          console.log('error');
          console.log(error);
          this.setState({ error, result: null });
        })
    }
  }

  render() {
    if (this.props.location.pathname.includes('credits')) return <Credits />
    return (
      <GlobalContext.Consumer>
        {({ state, functions }) => {
          const { updateStateHandler, resetAppState } = functions;
          const { authUser } = state;
          const { error, result } = this.state;

          return (
            <div className={"settings route-transition exit-right " + enterDirection(this.props)}>
              <Result msg={error} type='error' />
              <Result msg={result} type='success' />
              <PageNavigation
                back={['/', 'Dashboard']}
                title='Settings'
                addNonLink={authUser && authUser.email}
              />
              <CloudSync
                state={state}
                updateState={updateStateHandler}
                syncToCloud={this.syncToCloud}
                syncFromCloud={this.syncFromCloud}
                resetSettingsState={this.resetSettingsState}
                resetAppState={resetAppState}
              />
              <div className='local-options'>
                <div className='options'>
                  <h1 className='title'>Device</h1>
                  <div
                    onClick={verifyAppReset.bind(null, resetAppState, this.resetSettingsState)}
                    className="option-link">
                    <h1>Reset Local Data</h1>
                    <img className='icon invert' src={refreshIcon} alt='Cycle of Arrows' />
                    <p>Deletes all locally stored content.</p>
                  </div>
                  <div
                    className="option-link">
                    <Link to='/settings/credits'>
                      <h1>Resource Credits</h1>
                      <img className='icon invert' src={creditsIcon} alt='Cycle of Arrows' />
                      <p>Thanks!</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </GlobalContext.Consumer>
    );
  }
}

const verifyAppReset = (resetAppState, resetSettingsState) => {
  const reset_more = resetAppState();
  if (reset_more) {
    resetSettingsState();
    auth.doSignOut();
  }
}

// Display message
const Result = props => props.msg
  && <p className={'result ' + props.type}>{props.msg}</p>

export default withRouter(Settings);
