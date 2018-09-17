import React, { Component }  from 'react';
import {
  TransitionGroup,
  CSSTransition
} from 'react-transition-group';
import { Route, Switch }       from 'react-router-dom';
import * as State      from './lib/AppState';
import AppFrame        from './components/AppFrame';
import Dashboard       from './components/Dashboard';
import Gratitudes      from './components/ListGratitudes';
import Priorities      from './components/ListPriorities';
import Projects        from './components/ListProjects';
import Tasks           from './components/ListTasks';
import Relationships   from './components/ListRelationships';
import Contacts        from './components/ListContacts';
import TodaysTasks     from './components/ListTodaysTasks';
import NewGratitude    from './components/NewGratitude';
import NewPriority     from './components/NewPriority';
import NewProject      from './components/NewProject';
import NewTask         from './components/NewTask';
import NewRelationship from './components/NewRelationship';
import NewContact      from './components/NewContact';
import NotificationBar from './components/notifications/NotificationBar';
import SimpleStorage    from 'react-simple-storage';

import './css/App.css';
import './css/RouteTransitions.css';

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

  render() {
    return (
      <AppFrame>

        {/* Sync State with localStorage */}
        <SimpleStorage parent={this}  blacklist={['update']} />

        <NotificationBar
          online={this.state.online}
          update={this.state.update}
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
                          resetState={this.resetState}
                          />
                      )}
                      />
                    <Route exact path='/gratitudes' render={ () => (
                        <Gratitudes
                          data={this.state.gratitudes}
                          delete={this.deleteFromStateArray}
                          />
                      )}
                      />
                    <Route exact path='/priorities' render={() => (
                        <Priorities
                          data={this.state.priorities}
                          delete={this.deletePriority}
                          />
                      )}
                      />
                    <Route exact path='/relationships' render={() => (
                        <Relationships
                          data={this.state.relationships}
                          delete={this.deleteRelationship}
                          />
                      )}
                      />
                    <Route exact path='/tasks/today' render={() => (
                        <TodaysTasks
                          data={this.state.tasks.filter((task) => (task.today))}
                          delete={this.deleteFromStateArray}
                          toggle={this.taskToggle}
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
                          />
                      )}
                      />
                    <Route exact path='/priority/:priority_id/project/:project_id/tasks/new'
                      render={({ match }) => (
                        <NewTask
                          addHandler={this.addToStateArray}
                          match={match}
                          />
                      )}
                      />
                    <Route exact path='/relationship/:relationship_id/contacts/new'
                      render={({ match }) => (
                        <NewContact
                          addHandler={this.addToStateArray}
                          match={match}
                          />
                      )}
                      />
                    <Route exact path='/priority/:priority_id/projects/new'
                      render={({ match }) => (
                        <NewProject
                          addHandler={this.addToStateArray}
                          match={match}
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
                          />
                      )}
                      />
                    <Route exact path='/priorities/new'
                      render={({ match }) => (
                        <NewPriority
                          addHandler={this.addToStateArray}
                          />
                      )}
                      />
                    <Route exact path='/gratitudes/new'
                      render={({ match }) => (
                        <NewGratitude
                          addHandler={this.addToStateArray}
                          />
                      )}
                      />
                    <Route exact path='/relationships/new'
                      render={({ match }) => (
                        <NewRelationship
                          addHandler={this.addToStateArray}
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
