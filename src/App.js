import React, { Component }     from 'react';
import { Route }       from 'react-router-dom';
import * as State      from './lib/AppState';
import AppFrame        from './components/AppFrame';
import Dashboard       from './components/Dashboard';
import Gratitudes      from './components/Gratitudes';
import Priorities      from './components/Priorities';
import Projects        from './components/Projects';
import Tasks           from './components/Tasks';
import Relationships   from './components/Relationships';
import Contacts        from './components/Contacts';
import TodaysTasks     from './components/TodaysTasks';
import NewGratitude    from './components/NewGratitude';
import NewPriority     from './components/NewPriority';
import NewProject      from './components/NewProject';
import NewTask         from './components/NewTask';
import NewRelationship from './components/NewRelationship';
import NewContact      from './components/NewContact';
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

  render() {
    return (
      <AppFrame logo="/images/posifocus-logo.png" altText="Posifocus Logo">
        {/* Sync State with localStorage */}
        <SimpleStorage parent={this} />

        <Route exact path='/' render={ ({match}) => {
            console.log(match);
            return (
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
            )}}
            />

          <Route exact path='/gratitudes' render={() => (
              <Gratitudes
                data={this.state.gratitudes}
                delete={this.deleteFromStateArray}
                />
            )}
            />

          <Route path='/gratitudes/new' render={() => (
              <NewGratitude addHandler={this.addToStateArray} />
            )}
            />

          <Route exact path='/priorities' render={() => (
              <Priorities
                data={this.state.priorities}
                delete={this.deletePriority}
                />
            )}
            />

          <Route path='/priorities/new' render={() => (
              <NewPriority addHandler={this.addToStateArray} />
            )}
            />

          <Route exact path='/priority/:priority_id/projects'
            render={({match}) => {
              let priority = this.getSingle('priorities', match.params.priority_id);
              let projects = this.getProjects(match.params.priority_id);
              return <Projects
                data={projects}
                parent={priority}
                match={match}
                delete={this.deleteProject}
                />
            }}
            />

          <Route path='/priority/:priority_id/projects/new'
            render={ ({match}) => (
              <NewProject
                priority_id={match.params.priority_id}
                addHandler={this.addToStateArray}
                match={match}
                />
            )}
            />

          <Route exact path='/priority/:priority_id/project/:project_id/tasks'
            render={({match}) => {
              let project = this.getSingle('projects', match.params.project_id);
              let priority = project && this.getSingle('priorities', project.priority)
              let tasks = this.getTasks(match.params.project_id);

              return (
                <Tasks
                  data={tasks}
                  match={match}
                  project={project}
                  priority={priority}
                  delete={this.deleteFromStateArray}
                  toggle={this.taskToggle}
                  />
              )
            }}
            />

          <Route path='/priority/:priority_id/project/:project_id/tasks/new'
            render={({match}) => {
              return (
                <NewTask
                  project={match.params.project_id}
                  addHandler={this.addToStateArray}
                  match={match}
                  />
              )
            }}
            />

          <Route exact path='/relationships' render={() => (
              <Relationships
                data={this.state.relationships}
                delete={this.deleteRelationship}
                />
            )}
            />

          <Route exact path='/relationships/new' render={() => (
              <NewRelationship addHandler={this.addToStateArray} />
            )}
            />

          <Route exact path='/relationship/:relationship_id/contacts'
            render={ ({match}) => {
              let relationship = this.getSingle('relationships', match.params.relationship_id);
              let contacts = this.getContacts(relationship);

              return <Contacts
                parent={relationship}
                data={contacts || []}
                match={match}
                delete={this.deleteFromStateArray}
                />
            }}
            />

          <Route path='/relationship/:relationship_id/contacts/new'
            render={({match}) => (
              <NewContact
                relationship_id={match.params.relationship_id}
                addHandler={this.addToStateArray}
                />
            )}
            />

          <Route path='/tasks/today' render={() => (
              <TodaysTasks
                data={this.state.tasks.filter((task) => (task.today))}
                delete={this.deleteFromStateArray}
                toggle={this.taskToggle}
                />
            )}
            />
        </AppFrame>
      );
    }
  }

  export default App;
