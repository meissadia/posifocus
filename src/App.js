import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import AppFrame from './components/AppFrame';
import Dashboard from './components/Dashboard';
import Gratitudes from './components/Gratitudes';
import Priorities from './components/Priorities';
import Relationships from './components/Relationships';
import TodaysTasks from './components/TodaysTasks';
import NewGratitude from './components/NewGratitude';
import NewRelationship from './components/NewRelationship';
import NewPriority from './components/NewPriority';
import Projects from './components/Projects';
import Tasks from './components/Tasks';
import Contacts from './components/Contacts';
import NewContact from './components/NewContact';
import NewProject from './components/NewProject';
import NewTask from './components/NewTask';
import SimpleStorage from 'react-simple-storage';

import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    this.updateUserHeader = this.updateUserHeader.bind(this);
    this.resetState = this.resetState.bind(this);
    this.deleteFromStateArray = this.deleteFromStateArray.bind(this);
    this.addToStateArray = this.addToStateArray.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.deletePriority = this.deletePriority.bind(this);
  }

  initState() {
    return ({
      userHeader: {
        user_name: '',
        user_image: '',
        user_tagline: ''
      },
      gratitudes:[],
      priorities: [],
      projects: [],
      tasks: [],
      relationships: [],
      contacts: []
    })
  }

  updateUserHeader(key, value){
    let userHeader = {...this.state.userHeader};
    userHeader[key] = value;
    this.setState({ userHeader });
    return null;
  }

  resetState(event){
    event.preventDefault();
    if(window.confirm('Erase all data?'))
    this.setState(this.initState());
  }

  deleteFromStateArray(stateKey, targetId){
    let state = this.state[stateKey] || [];
    let update = state.filter((e) => (e.id !== targetId));
    this.setState({ [stateKey]: update });
  }

  addToStateArray(stateKey, value){
    var state = this.state[stateKey] || [];
    state.unshift(value);
    this.setState({ [stateKey]: state });
    return true;
  }

  deleteProject(project_id){
    let projects = this.state.projects.filter((t) => (t.id !== project_id));
    let tasks = this.state.tasks.filter((t) => (t.project !== project_id));
    this.setState({ tasks, projects });
  }

  deletePriority(priority){
    let priorities = this.state.priorities.filter((t) => (t.id !== priority));
    let projects = this.state.tasks.filter((t) => (t.priority !== priority));
    let tasks = this.state.tasks.filter((t) => (t.priority !== priority));
    this.setState({
      tasks: tasks,
      projects: projects,
      priorities: priorities
    })
  }

  getSingle(key, id){
    return this.state[key].filter((e) => (e.id == id))[0];
  }

  getProjects(priority){
    return this.state.projects.filter((e) => (e.priority == priority))
  }

  getTasks(project){
    return this.state.tasks.filter(
      (task) => (task.project == project)
    );
  }

  render() {
    return (
      <BrowserRouter>
        <AppFrame logo="/images/posifocus-logo.png" altText="Posifocus Logo">
          {/* Sync State with localStorage */}
          <SimpleStorage parent={this} />

          <Route exact path='/' render={ () => (
              <Dashboard
                userHeader={this.state.userHeader}
                updateUserHeader={this.updateUserHeader}
                gratitudes={this.state.gratitudes}
                projects={this.state.projects}
                tasks={this.state.tasks}
                contacts={this.state.contacts}
                resetState={this.resetState}
                />
            )}
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
                  />
              )
            }}
            />

          <Route path='/priority/:priority_id/project/:project_id/tasks/new' render={({match}) => {
              let project = this.getSingle('projects', match.params.project_id);
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
                delete={this.deleteFromStateArray}
                />
            )}
            />

          <Route exact path='/relationships/new' render={() => (
              <NewRelationship addHandler={this.addToStateArray} />
            )}
            />

          <Route exact path='/relationship/:relationship_id/contacts'
            render={ ({match}) => {
              let relationship = this.state.relationships.filter((r) => (
                r.id == match.params.relationship_id
              ))[0];

              let contacts = relationship && this.state.contacts.filter((c) => (
                c.relationship === relationship.id.toString()
              ))

            return <Contacts
              parent={relationship}
              data={contacts || []}
              match={match}
              delete={this.deleteFromStateArray}
              />
          }}
          />

        <Route path='/relationship/:relationship_id/contacts/new' render={({match}) => (
            <NewContact
              relationship_id={match.params.relationship_id}
              addHandler={this.addToStateArray}
              />
          )}
          />

        <Route path='/tasks/today' render={() => (
            <TodaysTasks
              data={this.state.tasks}
              delete={this.deleteFromStateArray}
              />
          )}
          />
      </AppFrame>
    </BrowserRouter>
  );
}
}

export default App;
