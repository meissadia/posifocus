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
    this.addContact = this.addContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.addProject = this.addProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
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
    var new_state = this.state[stateKey] &&
    this.state[stateKey].filter((element) => {
      if(element.id == targetId) { return false };
      return true;
    });
    if(new_state){
      this.setState({ [stateKey]: new_state });
    }
  }

  addToStateArray(stateKey, value){
    var new_state = this.state[stateKey];
    new_state.unshift(value);
    if(new_state){
      this.setState({ [stateKey]: new_state });
    }
  }

  addContact(relationship_id, contact){
    if (this.state.contacts){
      this.setState({ contacts: [contact].concat(this.state.contacts) });
      return true;
    }

    this.setState({ contacts: [contact] });
    return true;
  }

  deleteContact(contact){
    let new_contacts = this.state.contacts.filter(
      (con) => (con.id == contact.id)
    );

    this.setState({ contacts: new_contacts });
  }

  addProject(priority_id, project){
    if (this.state.projects){
      this.setState({ projects: [project].concat(this.state.projects) });
      return true;
    }

    this.setState({ projects: [project] });
    return true;
  }

  deleteProject(project_id){
    let new_projects = this.state.projects.filter(
      (proj) => (proj.id !== project_id)
    );

    this.setState({ projects: new_projects });
  }

  addTask(project_id, task){
    if (this.state.tasks){
      this.setState({ tasks: [task].concat(this.state.tasks) });
      return true;
    }

    this.setState({ tasks: [task] });
    return true;
  }

  deleteTask(task_id){
    let new_tasks = this.state.tasks.filter(
      (task) => (task.id !== task_id)
    );

    this.setState({ tasks: new_tasks });
  }

  getPriority(priority){
    return this.state.priorities.filter((e) => (e.id == priority))[0];
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
                delete={this.deleteFromStateArray}
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
                addHandler={this.addProject}
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
                  delete={this.deleteTask}
                  />
              )
            }}
            />

          <Route path='/priority/:priority_id/project/:project_id/tasks/new' render={({match}) => {
              let project = this.getSingle('projects', match.params.project_id);
              return (
                <NewTask
                  project={match.params.project_id}
                  addHandler={this.addTask}
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
              addHandler={this.addContact}
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
