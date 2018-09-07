import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import AppFrame from './components/AppFrame';
import UserHeader from './components/UserHeader';
import StatBar from './components/StatBar';
import MainMenu from './components/MainMenu';
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
  }

  initState() {
    let date = new Date();
    let daysAgo2 = new Date();
    daysAgo2.setDate(date.getDate() - 2);
    return ({
      userHeader: {
        user_name: '',
        user_image: '',
        user_tagline: ''
      },
      gratitudes:[{
        id: date.getTime(),
        title: 'Gratitude # 1',
        content: "I'm grateful for life!",
        date: date.toString()
      },
      {
        id: date.getTime() + 2,
        title: 'Gratitude # 2',
        content: "I'm still grateful for life!",
        date: daysAgo2.toString()
      }],
      priorities: [{
        id: date.getTime(),
        title: '#1 Priority',
        projects: [{
          id:  'proj1',
          title: 'Project #1',
          tasks: [{
            id: 'task1',
            title: 'Task #1',
            today: false,
            done: false
          }]
        }]
      },
      {
        id: date.getTime() + 2,
        title: '#2 Priority',
        projects: [{
          id:  'proj2',
          title: 'Project #2',
          tasks: [{
            id: 'task2',
            title: 'Task #2',
            today: true,
            done: true
          }]
        }]
      }],
      relationships: [{
        id: date.getTime(),
        title: 'Salvador',
        contacts: [{
          id: date.getTime() + 2,
          title: 'Text',
          content: 'Birthday text to say whatup!?',
          date: daysAgo2.toString()
        }]
      }]
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
    // console.log('Deleting ID ' + targetId + ' from ' + stateKey);
    // console.log(this.state[stateKey]);
    var new_state = this.state[stateKey] &&
    this.state[stateKey].filter((element) => {
      if(element.id == targetId) { return false };
      return true;
    });
    if(new_state){
      // console.log(new_state);
      this.setState({ [stateKey]: new_state });
    }
  }

  addToStateArray(stateKey, value){
    // console.log('Adding ' + JSON.stringify(value) + ' to ' + stateKey);
    // console.log(this.state[stateKey]);
    var new_state = this.state[stateKey];
    new_state.unshift(value);
    if(new_state){
      // console.log(new_state);
      this.setState({ [stateKey]: new_state });
    }
  }

  render() {
    let header = <UserHeader data={this.state.userHeader} handler={this.updateUserHeader} />
    let statbar = <StatBar
      gratitudes={this.state.gratitudes.length}
      relationships={this.state.relationships}
      priorities={this.state.priorities}
      />
    let menu = <MainMenu reset={this.resetState} state={this.state} />

    return (
      <BrowserRouter>
        <AppFrame logo="./images/posifocus-logo.png" altText="Posifocus Logo">
          <SimpleStorage parent={this} />
          <Route exact path='/' render={ () => (header) } />
          <Route exact path='/' render={ () => (statbar) } />
          <Route exact path='/' render={ () => (menu)} />
          <Route path='/gratitudes'
            render={ () => (
              <Gratitudes
                data={this.state.gratitudes}
                handleDelete={this.deleteFromStateArray}
                />
            )}
            />
          <Route path='/priorities'
            render={ () => (
              <Priorities
                data={this.state.priorities}
                handleDelete={this.deleteFromStateArray}
                />
            )}
            />
          <Route path='/relationships'
            render={ () => (
              <Relationships
                data={this.state.relationships}
                handleDelete={this.deleteFromStateArray}
                />
            )}
            />
          <Route path='/todays_tasks'
            render={ () =>
              <TodaysTasks
                data={this.state.priorities}
                handleDelete={this.deleteFromStateArray}
                />
            }
            />
          <Route path='/contacts/:target_id' render={ ({match}) => {
              let relationship =
                this.state.relationships.filter(
                  (r) => (r.id == match.params.target_id)
                )[0];
              return (
                <Contacts
                parent={relationship}
                handleDelete={this.deleteFromStateArray}
                />
              )
            }
          }
          />
          <Route path='/new_gratitude'
            render={ () => <NewGratitude addHandler={this.addToStateArray} /> }
            />
          <Route path='/new_relationship'
            render={ () => <NewRelationship addHandler={this.addToStateArray} /> }
            />
          <Route path='/new_priority'
            render={ () => <NewPriority addHandler={this.addToStateArray} /> }
            />
          <Route exact path='/projects/:priority_id' render={({match}) => {
              let priority = this.state.priorities.filter( (element) => {
                return element.id == match.params.priority_id;
              })[0];
              let projects = priority && priority.projects;
              return <Projects data={projects || []} parent={priority}/>
            }}
            />
          <Route path='/projects/:priority_id/tasks/:project_id' render={({match}) => {
              let priority = this.state.priorities.filter( (element) => {
                return element.id == match.params.priority_id;
              })[0];
              if(priority) {
                let project = priority.projects.filter((element) => {
                  return element.id == match.params.project_id;
                })[0];
                if(project){
                  return <Tasks
                    data={project.tasks || []}
                    params={match.params}
                    project={project}
                    priority={priority} />
                }
              }

              return <Tasks data={[]} params={match.params} />

            }}
            />
        </AppFrame>
      </BrowserRouter>
    );
  }
}

export default App;
