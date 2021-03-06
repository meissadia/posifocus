import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SimpleStorage from 'react-simple-storage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import * as State from '../lib/AppState';

import '../lib/Helpers';
import '../styles/css/App.css';
import '../styles/css/RouteTransitions.css';
import { parseUrl } from '../lib/Helpers';
import { firebase } from './firebase';
import { Path } from './Path';
import { GlobalContext } from './GlobalContextHOC';
import AppFrame from './AppFrame';
import Contacts from './lists/ListContacts';
import Dashboard from './dashboard/Dashboard';
import Gratitudes from './lists/ListGratitudes';
import NotificationBar from './notifications/NotificationBar';
import OrderableList from './experiments/OrderableList'
import Priorities from './lists/ListPriorities';
import Projects from './lists/ListProjects';
import Relationships from './lists/ListRelationships';
import Settings from './settings/Settings';
import Tasks from './lists/ListTasks';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = State.initState();
    this.saveStateToStorage = State.saveStateToStorage.bind(this);
    this.removeAuthListener = null;  // Firebase Log-in/out
  }

  componentDidUpdate() {
    /* We need to save directly to localStorage for mobile apps */
    this.saveStateToStorage();
  }

  componentDidMount() {
    // Offline Notification
    window.addEventListener('online', () => this.setOnlineStatus(true));
    window.addEventListener('offline', () => this.setOnlineStatus(false));

    this.onServiceWorkerUpdate(); // Update Available
    this.removeAuthListener = this.onAuthUserChange();
  }

  componentWillUnmount() {
    window.removeEventListener('online');
    window.removeEventListener('offline');
    window.removeEventListener('isUpdateAvailable');
    this.removeAuthListener();
  }

  /**
   * Update and return the GlobalContext data
   * @param updateState.state App State
   * @param updateState.functions Callbacks to manage App state 
   */
  updatedGlobalContext = (updateState = {}) => {
    return {
      state: this.state,
      functions: {
        addToStateArray: State.addToStateArray.bind(this),
        deleteFromStateArray: State.deleteFromStateArray.bind(this),
        deletePriority: State.deletePriority.bind(this),
        deleteProject: State.deleteProject.bind(this),
        deleteRelationship: State.deleteRelationship.bind(this),
        getContacts: State.getContacts.bind(this),
        getProjects: State.getProjects.bind(this),
        getSingle: State.getSingle.bind(this),
        getTasks: State.getTasks.bind(this),
        resetAppState: State.resetState.bind(this),
        taskToggle: State.taskToggle.bind(this),
        updateSingle: State.updateSingle.bind(this),
        updateStateHandler: State.updateStateHandler.bind(this),
        updateUserHeader: State.updateUserHeader.bind(this),
      },
      ...updateState
    }
  }

  onAuthUserChange() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  onServiceWorkerUpdate() {
    if (!window['isUpdateAvailable']) return;
    window['isUpdateAvailable'].then(isAvailable => {
      console.log('ServiceWorker, update available?: ' + (isAvailable ? 'Yes.' : 'No.'));
      this.setState({ update: isAvailable });
    });
  }

  setOnlineStatus = isOnline => this.setState({ online: isOnline });

  render() {
    return (
      <AppFrame background={this.state.style.background}>
        {/* Sync State with localStorage */}
        <SimpleStorage parent={this} blacklist={['update']} />
        <NotificationBar
          online={this.state.online}
          update={this.state.update}
          autoUpdate={true}
        />

        {/************ Route Transition Animation Wrapper ************/}
        <Route render={args => (
          <TransitionGroup>
            <CSSTransition
              key={args.location.key}
              classNames='route-transition'
              timeout={250}
            >
              <GlobalContext.Provider value={
                this.updatedGlobalContext({
                  location: args.location,
                  urlParams: parseUrl(args.location.pathname),
                  args
                })}
              >
                <Switch location={args.location}>
                  <Route exact path={Path.Dashboard} component={Dashboard} />
                  <Route path={Path.Settings} component={Settings} />
                  <Route path={Path.Gratitudes} component={Gratitudes} />
                  <Route path={Path.Priorities} component={Priorities} />
                  <Route path={Path.Relationships} component={Relationships} />
                  <Route path={Path.Tasks} component={Tasks} />
                  <Route path={Path.Projects} component={Projects} />
                  <Route path={Path.Contacts} component={Contacts} />
                  {/*************** Test OrderableList Route ***************/}
                  <Route exact path={Path.OrderableList} component={OrderableList} />

                </Switch>
              </GlobalContext.Provider>
            </CSSTransition>
          </TransitionGroup>
        )}
        /> {/* End Route Transition Animation Wrapper */}
      </AppFrame>
    ); // End return()
  } // End render()
} // End App Component


export default App;
