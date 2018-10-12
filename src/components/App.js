import React, { Component } from 'react';
import { Route, Switch }    from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import AppFrame        from './AppFrame';
import AppHeader       from './AppHeader';
import NotificationBar from './notifications/NotificationBar';
import Dashboard       from './dashboard/Dashboard';
import Settings        from './settings/Settings';
import Credits         from './settings/Credits';
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
import EditGratitude    from './edit/EditGratitude';
import EditPriority     from './edit/EditPriority';
import EditProject      from './edit/EditProject';
import EditTask         from './edit/EditTask';
import EditContact      from './edit/EditContact';
import EditRelationship from './edit/EditRelationship';

import '../lib/Helpers';
import * as State      from '../lib/AppState';
import { firebase }    from './firebase';
import SimpleStorage   from 'react-simple-storage';

import '../styles/css/App.css';
import '../styles/css/RouteTransitions.css';

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
    this.updateStateHandler = this.updateStateHandler.bind(this);
    this.updateSingle = State.updateSingle.bind(this);
  }

  componentDidUpdate(){
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

  onAuthUserChange(){
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
      ? this.setState({ authUser })
      : this.setState({ authUser: null });
    });
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

        {/************ Route Transition Animation Wrapper ************/}
        <Route render={({ location }) => (
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                classNames='route-transition'
                timeout={250}
                >
                <Switch location={location}>
                  {/********************************************************/}
                  {/******************* Dashboard Routes *******************/}
                  {/********************************************************/}
                  <Route exact path='/(index.html)?' render={() => (
                      <Dashboard
                        userHeader={this.state.userHeader}
                        updateUserHeader={this.updateUserHeader}
                        gratitudeCount={this.state.gratitudes.length}
                        projectCount={this.state.projects.length}
                        taskCount={this.state.tasks.length}
                        doneTaskCount={this.state.tasks.filter((t) => (t.done)).length}
                        contacts={this.state.contacts}
                        />
                    )}
                    />

                  {/********************************************************/}
                  {/******************** Setting Routes ********************/}
                  {/********************************************************/}
                  <Route exact path='/settings' render={()=> (
                      <Settings
                        state={this.state}
                        updateState={this.updateStateHandler}
                        resetAppState={this.resetState}
                        />
                    )}
                    />
                  <Route exact path='/settings/credits' component={Credits} />

                  {/********************************************************/}
                  {/******************* Gratitude Routes *******************/}
                  {/********************************************************/}
                  <Route exact path='/gratitudes' render={() => (
                      <Gratitudes
                        data={this.state.gratitudes}
                        delete={this.deleteFromStateArray}
                        location={location}
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
                  <Route exact path='/gratitudes/:id/edit'
                    render={() => (
                      <EditGratitude
                        getSingle={this.getSingle}
                        updateSingle={this.updateSingle}
                        />
                    )}
                    />

                  {/*******************************************************/}
                  {/******************* Priority Routes *******************/}
                  {/*******************************************************/}
                  <Route exact path='/priorities' render={() => (
                      <Priorities
                        data={this.state.priorities}
                        delete={this.deletePriority}
                        location={location}
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
                  <Route exact path='/priorities/:id/edit'
                    render={() => (
                      <EditPriority
                        getSingle={this.getSingle}
                        updateSingle={this.updateSingle}
                        />
                    )}
                    />

                  {/*******************************************************/}
                  {/***************** Relationship Routes *****************/}
                  {/*******************************************************/}
                  <Route exact path='/relationships' render={() => (
                      <Relationships
                        data={this.state.relationships}
                        delete={this.deleteRelationship}
                        location={location}
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
                  <Route exact path='/relationships/:id/edit'
                    render={({ match }) => (
                      <EditRelationship
                        getSingle={this.getSingle}
                        updateSingle={this.updateSingle}
                        />
                    )}
                    />

                  {/*******************************************************/}
                  {/********************* Task Routes *********************/}
                  {/*******************************************************/}
                  <Route exact path='/tasks/today' render={() => (
                      <TodaysTasks
                        data={this.state.tasks.filter((task) => (task.today))}
                        delete={this.deleteFromStateArray}
                        toggle={this.taskToggle}
                        location={location}
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
                  <Route exact path='/tasks/:id/edit'
                    render={() => (
                      <EditTask
                        getSingle={this.getSingle}
                        updateSingle={this.updateSingle}
                        />
                    )}
                    />
                  <Route exact path='/todays/:id/edit'
                    render={() => (
                      <EditTask
                        getSingle={this.getSingle}
                        updateSingle={this.updateSingle}
                        todays={true}
                        />
                    )}
                    />

                  {/********************************************************/}
                  {/******************** Project Routes ********************/}
                  {/********************************************************/}
                  <Route exact path='/priority/:priority_id/projects'
                    render={({match}) => (
                      <Projects
                        getProjects={this.getProjects}
                        getSingle={this.getSingle}
                        delete={this.deleteProject}
                        match={match}
                        location={location}
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
                  <Route exact path='/projects/:id/edit'
                    render={() => (
                      <EditProject
                        getSingle={this.getSingle}
                        updateSingle={this.updateSingle}
                        />
                    )}
                    />

                  {/********************************************************/}
                  {/******************** Contact Routes ********************/}
                  {/********************************************************/}
                  <Route exact path='/relationship/:relationship_id/contacts'
                    render={ ({match}) => (
                      <Contacts
                        getSingle={this.getSingle}
                        getContacts={this.getContacts}
                        delete={this.deleteFromStateArray}
                        match={match}
                        location={location}
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
                  <Route exact path='/contacts/:id/edit'
                    render={() => (
                      <EditContact
                        getSingle={this.getSingle}
                        updateSingle={this.updateSingle}
                        />
                    )}
                    />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )
        }
        /> {/* End Route Transition Animation Wrapper */}
      </AppFrame>
    )
  } // End render()
} // End App Component


export default App;
