import React, { Component }     from 'react';
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
import NetworkIndicator from './components/NetworkIndicator';
import SimpleStorage   from 'react-simple-storage';

import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = State.initState();
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
   }

   componentWillUnmount() {
     window.removeEventListener('online');
     window.removeEventListener('offline');
   }

   setOnlineStatus = isOnline => this.setState({ online: isOnline })

  render() {
    return (
      <AppFrame>
        <SimpleStorage parent={this} /> {/* Sync State with localStorage */}
          <NetworkIndicator online={this.state.online} />
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

          <Gratitudes
            data={this.state.gratitudes}
            delete={this.deleteFromStateArray}
            />

          <Priorities
            data={this.state.priorities}
            delete={this.deletePriority}
            />

          <Relationships
            data={this.state.relationships}
            delete={this.deleteRelationship}
            />

          <Projects
            getProjects={this.getProjects}
            getSingle={this.getSingle}
            delete={this.deleteProject}
            />

          <Tasks
            getSingle={this.getSingle}
            getTasks={this.getTasks}
            delete={this.deleteFromStateArray}
            toggle={this.taskToggle}
            />

          <Contacts
            getSingle={this.getSingle}
            getContacts={this.getContacts}
            delete={this.deleteFromStateArray}
            />

          <TodaysTasks
            data={this.state.tasks.filter((task) => (task.today))}
            delete={this.deleteFromStateArray}
            toggle={this.taskToggle}
            />

          <NewTask         addHandler={this.addToStateArray} />
          <NewContact      addHandler={this.addToStateArray} />
          <NewProject      addHandler={this.addToStateArray} />
          <NewPriority     addHandler={this.addToStateArray} />
          <NewGratitude    addHandler={this.addToStateArray} />
          <NewRelationship addHandler={this.addToStateArray} />

        </AppFrame>
      );
    }
  }

  export default App;
