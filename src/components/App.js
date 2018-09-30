import React, { Component } from 'react';
import { Route, Switch }    from 'react-router-dom';
import { TransitionGroup,
         CSSTransition }    from 'react-transition-group';
import * as State      from '../lib/AppState';
import AppFrame        from './AppFrame';
import AppHeader       from './AppHeader';
import NotificationBar from './notifications/NotificationBar';
import Dashboard       from './dashboard/Dashboard';
import Settings        from './settings/Settings';
import Gratitudes      from './lists/ListGratitudes';
import Priorities      from './lists/ListPriorities';
import Projects        from './lists/ListProjects';
import Tasks           from './lists/ListTasks';
import Relationships   from './lists/ListRelationships';
import Contacts        from './lists/ListContacts';
import TodaysTasks     from './lists/ListTodaysTasks';
import NewGratitude    from './create/NewGratitude';
import NewPriority     from './create/NewPriority';
import NewProject      from './create/NewProject';
import NewTask         from './create/NewTask';
import NewRelationship from './create/NewRelationship';
import NewContact      from './create/NewContact';
import SimpleStorage   from 'react-simple-storage';
import { firebase }    from './firebase';

import '../css/Reset.css';
import '../css/App.css';
import '../css/RouteTransitions.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = State.initState();
    this.initState = State.initState.bind(this);
    this.updateUserHeader = State.updateUserHeader.bind(this);
    this.resetState = State.resetState.bind(this);
    this.deleteFromStateArray = State.deleteFromStateArray.bind(this);
    this.addToStateArray = State.addToStateArray.bind(this);
    this.deleteProject = State.deleteProject.bind(this);
    this.deletePriority = State.deletePriority.bind(this);
    this.deleteRelationship = State.deleteRelationship.bind(this);
    this.taskToggle = State.taskToggle.bind(this);
    this.getSingle = State.getSingle.bind(this);
    this.getProjects = State.getProjects.bind(this);
    this.getTasks = State.getTasks.bind(this);
    this.getContacts = State.getContacts.bind(this);
    this.saveStateToStorage = State.saveStateToStorage.bind(this);
    this.setBackground = this.setBackground.bind(this);
    this.updateStateHandler = this.updateStateHandler.bind(this);
  }

  /* We need to save directly to localStorage for mobile apps */
  componentDidUpdate(){
    this.saveStateToStorage();
  }

  componentDidMount() {
    window.addEventListener('online', () => this.setOnlineStatus(true));
    window.addEventListener('offline', () => this.setOnlineStatus(false));
    this.onManifestUpdateReady();
    this.onServiceWorkerUpdate();
    this.onAuthUserChange();
  }

  onAuthUserChange(){
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
      ? this.setState({ authUser })
      : this.setState({ authUser: null });
    });
  }

  onManifestUpdateReady(){
    window.applicationCache.onupdateready = (event) => {
      console.log('Cache Manifest Update!');
      this.setState({ update: true });
    }
  }

  onServiceWorkerUpdate(){
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

  setBackground = color => {
    this.setState((prevState) => {
      let { style } = prevState;
      style = Object.assign(style, { background: color });
      return { style: style }
    });
  }

  updateStateHandler = state => this.setState({ ...state });

  render() {
    return (
      <AppFrame background={this.state.style.background}>
        {/* Sync State with localStorage */}
        <SimpleStorage parent={this}  blacklist={['update']} />
        <AppHeader />
        <NotificationBar
          online={this.state.online}
          update={this.state.update}
          autoUpdate={false}
          />

        {/* Wrapper for Route Transition Animations */}
        <Route render={({ location }) => {
            return (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  classNames='route-transition'
                  timeout={250}
                  >
                  <Switch location={location}>
                    <Route exact path='/(index.html)?' render={() => (
                        <Dashboard
                          userHeader={this.state.userHeader}
                          updateUserHeader={this.updateUserHeader}
                          gratitudeCount={this.state.gratitudes.length}
                          projectCount={this.state.projects.length}
                          taskCount={this.state.tasks.length}
                          doneTaskCount={this.state.tasks.filter((t) => (t.done)).length}
                          contacts={this.state.contacts}
                          setBackground={this.setBackground}
                          />
                      )}
                      />
                    <Route path='/settings' render={()=> (
                        <Settings
                          state={this.state}
                          updateState={this.updateStateHandler}
                          setBackground={this.setBackground}
                          resetAppState={this.resetState}
                          />
                      )}
                      />
                    <Route exact path='/gratitudes' render={ () => (
                        <Gratitudes
                          data={this.state.gratitudes}
                          delete={this.deleteFromStateArray}
                          location={location}
                          setBackground={this.setBackground}
                          />
                      )}
                      />
                    <Route exact path='/priorities' render={() => (
                        <Priorities
                          data={this.state.priorities}
                          delete={this.deletePriority}
                          location={location}
                          setBackground={this.setBackground}
                          />
                      )}
                      />
                    <Route exact path='/relationships' render={() => (
                        <Relationships
                          data={this.state.relationships}
                          delete={this.deleteRelationship}
                          location={location}
                          setBackground={this.setBackground}
                          />
                      )}
                      />
                    <Route exact path='/tasks/today' render={() => (
                        <TodaysTasks
                          data={this.state.tasks.filter((task) => (task.today))}
                          delete={this.deleteFromStateArray}
                          toggle={this.taskToggle}
                          location={location}
                          setBackground={this.setBackground}
                          />
                      )}
                      />
                    <Route exact path='/priority/:priority_id/projects'
                      render={({match}) => (
                        <Projects
                          getProjects={this.getProjects}
                          getSingle={this.getSingle}
                          delete={this.deleteProject}
                          match={match}
                          location={location}
                          setBackground={this.setBackground}
                          />
                      )}
                      />
                    <Route exact path='/relationship/:relationship_id/contacts'
                      render={ ({match}) => (
                        <Contacts
                          getSingle={this.getSingle}
                          getContacts={this.getContacts}
                          delete={this.deleteFromStateArray}
                          match={match}
                          location={location}
                          setBackground={this.setBackground}
                          />
                      )}
                      />
                    <Route exact path='/priority/:priority_id/project/:project_id/tasks/new'
                      render={({ match }) => (
                        <NewTask
                          addHandler={this.addToStateArray}
                          match={match}
                          setBackground={this.setBackground}
                          />
                      )}
                      />
                    <Route exact path='/relationship/:relationship_id/contacts/new'
                      render={({ match }) => (
                        <NewContact
                          addHandler={this.addToStateArray}
                          match={match}
                          setBackground={this.setBackground}
                          />
                      )}
                      />
                    <Route exact path='/priority/:priority_id/projects/new'
                      render={({ match }) => (
                        <NewProject
                          addHandler={this.addToStateArray}
                          match={match}
                          setBackground={this.setBackground}
                          />
                      )}
                      />
                    <Route exact path='/priority/:priority_id/project/:project_id/tasks'
                      render={({match}) => (
                        <Tasks
                          getSingle={this.getSingle}
                          getTasks={this.getTasks}
                          delete={this.deleteFromStateArray}
                          toggle={this.taskToggle}
                          match={match}
                          location={location}
                          setBackground={this.setBackground}
                          />
                      )}
                      />
                    <Route exact path='/priorities/new'
                      render={({ match }) => (
                        <NewPriority
                          addHandler={this.addToStateArray}
                          setBackground={this.setBackground}
                          />
                      )}
                      />
                    <Route exact path='/gratitudes/new'
                      render={({ match }) => (
                        <NewGratitude
                          addHandler={this.addToStateArray}
                          setBackground={this.setBackground}
                          />
                      )}
                      />
                    <Route exact path='/relationships/new'
                      render={({ match }) => (
                        <NewRelationship
                          addHandler={this.addToStateArray}
                          setBackground={this.setBackground}
                          />
                      )}
                      />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )
          }
        }
        />
    </AppFrame>
  );
}
}


export default App;
