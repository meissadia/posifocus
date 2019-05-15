import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import SimpleStorage from 'react-simple-storage';

import '../styles/css/App.css';
import '../styles/css/RouteTransitions.css';
import '../lib/Helpers';
import * as State from '../lib/AppState';

import NotificationBar from './notifications/NotificationBar';
import Dashboard from './dashboard/Dashboard';
import Settings from './settings/Settings';
import Credits from './settings/Credits';
import Gratitudes from './lists/ListGratitudes';
import Priorities from './lists/ListPriorities';
import Projects from './lists/ListProjects';
import Tasks from './lists/ListTasks';
import Relationships from './lists/ListRelationships';
import Contacts from './lists/ListContacts';
import TodaysTasks from './lists/ListTodaysTasks';
import NewPriority from './create/NewPriority';
import NewProject from './create/NewProject';
import NewTask from './create/NewTask';
import NewRelationship from './create/NewRelationship';
import NewContact from './create/NewContact';
import EditPriority from './edit/EditPriority';
import EditProject from './edit/EditProject';
import EditTask from './edit/EditTask';
import EditContact from './edit/EditContact';
import EditRelationship from './edit/EditRelationship';

import { firebase } from './firebase';
import { Path } from './Path';
import AppFrame from './AppFrame';
import AppHeader from './AppHeader';

import OrderableList from './OrderableList';

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
        updateStateHandler: this.updateStateHandler,
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

  updateStateHandler = newState => this.setState({ ...newState });

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
                  value={this.updatedGlobalContext({ location })}
                >
                  {/*************** Test OrderableList Route ***************/}
                  {/* Component design notes:
                    • Create a Test<OrderableList|T> component that reads test data 
                      from an external source but will utilize name matched prop data
                      when present.
                  */}
                  <Route exact path={Path.OrderableList} component={OrderableList} />

                  {/******************* Dashboard Routes *******************/}
                  <Route exact path={Path.Dashboard} component={Dashboard} />

                  {/******************** Setting Routes ********************/}
                  <Route exact path={Path.Settings} component={Settings} />
                  <Route exact path={Path.Credits} component={Credits} />

                  {/******************* Gratitude Routes *******************/}
                  <Route path={Path.Gratitudes} component={Gratitudes} />

                  {/******************* Priority Routes *******************/}
                  <Route exact path={Path.Priorities} component={Priorities} />
                  <Route exact path={Path.NewPriority} component={NewPriority} />
                  <Route exact path={Path.EditPriority} component={EditPriority} />

                  {/***************** Relationship Routes *****************/}
                  <Route exact path={Path.Relationships} component={Relationships} />
                  <Route exact path={Path.NewRelationship} component={NewRelationship} />
                  <Route exact path={Path.EditRelationship} component={EditRelationship} />

                  {/********************* Task Routes *********************/}
                  <Route exact path={Path.TodaysTasks} component={TodaysTasks} />
                  <Route exact path={Path.Tasks} component={Tasks} />
                  <Route exact path={Path.NewTask} component={NewTask} />
                  <Route exact path={Path.EditTask} component={EditTask} />
                  <Route exact path={Path.EditTodays} render={() => <EditTask todays={true} />} />

                  {/******************** Project Routes ********************/}
                  <Route exact path={Path.Projects} component={Projects} />
                  <Route exact path={Path.NewProject} component={NewProject} />
                  <Route exact path={Path.EditProject} component={EditProject} />

                  {/******************** Contact Routes ********************/}
                  <Route exact path={Path.Contacts} component={Contacts} />
                  <Route exact path={Path.NewContact} component={NewContact} /> 
                  <Route exact path={Path.EditContact} component={EditContact} />
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
