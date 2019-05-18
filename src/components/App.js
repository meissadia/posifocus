import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SimpleStorage from 'react-simple-storage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import * as State from '../lib/AppState';

import '../lib/Helpers';
import '../styles/css/App.css';
import '../styles/css/RouteTransitions.css';

import { firebase } from './firebase';
import { Path } from './Path';
import AppFrame from './AppFrame';
import AppHeader from './AppHeader';
import Contacts from './lists/ListContacts';
import Dashboard from './dashboard/Dashboard';
import Gratitudes from './lists/ListGratitudes';
import NotificationBar from './notifications/NotificationBar';
import OrderableList from './OrderableList';
import Priorities from './lists/ListPriorities';
import Projects from './lists/ListProjects';
import Relationships from './lists/ListRelationships';
import Settings from './settings/Settings';
import Tasks from './lists/ListTasks';
import { parseUrl } from '../lib/Helpers';

export const GlobalContext = React.createContext({
  state: {},
  functions: {}
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = State.initState();
    this.saveStateToStorage = State.saveStateToStorage.bind(this);
  }

  componentDidUpdate() {
    /* We need to save directly to localStorage for mobile apps */
    this.saveStateToStorage();
  }

  componentDidMount() {
    // Offline Notification
    window.addEventListener('online', () => this.setOnlineStatus(true));
    window.addEventListener('offline', () => this.setOnlineStatus(false));
    // Update Available
    this.onServiceWorkerUpdate();
    // Firebase Log-in/out
    this.onAuthUserChange();
  }

  /**
   * Update and return the GlobalContext data
   * @param updateState.state App State
   * @param updateState.functions Callbacks to manage App state 
   */
  updatedGlobalContext = (updateState = {}) => {
    this.contextState = {
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

    return this.contextState;
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

  componentWillUnmount() {
    window.removeEventListener('online');
    window.removeEventListener('offline');
  }

  setOnlineStatus = isOnline => this.setState({ online: isOnline });

  render() {
    return (
      <AppFrame background={this.state.style.background}>
        {/* Sync State with localStorage */}
        <SimpleStorage parent={this} blacklist={['update']} />
        <AppHeader />
        <NotificationBar
          online={this.state.online}
          update={this.state.update}
          autoUpdate={false}
        />

        {/************ Route Transition Animation Wrapper ************/}
        <Route render={({ location }) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              classNames='route-transition'
              timeout={250}
            >
              <Switch location={location}>
                <GlobalContext.Provider
                  value={this.updatedGlobalContext({
                    location,
                    urlParams: parseUrl(location.pathname),
                  })}
                >
                  {/*************** Test OrderableList Route ***************/}
                  <Route exact path={Path.OrderableList} component={OrderableList} />
                  {/* Component design notes:
                    • Create a Test<OrderableList|T> component that reads test data 
                      from an external source but will utilize name matched prop data
                      when present.
                  */}

                  <Route exact path={Path.Dashboard} component={Dashboard} />
                  <Route path={Path.Settings} component={Settings} />
                  <Route path={Path.Gratitudes} component={Gratitudes} />
                  <Route path={Path.Priorities} component={Priorities} />
                  <Route path={Path.Relationships} component={Relationships} />
                  <Route path={Path.Tasks} component={Tasks} />
                  <Route path={Path.Projects} component={Projects} />
                  <Route path={Path.Contacts} component={Contacts} />
                </GlobalContext.Provider>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
        /> {/* End Route Transition Animation Wrapper */}
      </AppFrame>
    ); // End return()
  } // End render()
} // End App Component


export default App;
