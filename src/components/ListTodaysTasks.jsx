import React          from 'react';
import { Route }      from 'react-router-dom';
import PageNavigation from './PageNavigation';

import List           from './List';

import bgimage        from '../images/tasks-instructions-tableview.png';
import '../css/ListViews.css'

let TodaysTasks = (props) => {
  let showInstructions = props.data.length === 0;

  let deleteTask = (event) => {
    event.preventDefault();
    props.delete('tasks', event.target.attributes.jsvalue.value);
  }

  return (
    <Route path='/tasks/today' render={() => (
      <List section='tasks'
        instructions={{display: showInstructions , icon: bgimage}}
        data={props.data}
        delete={deleteTask}
        toggle={props.toggle}
        >
        <PageNavigation
          back={['/', 'Dashboard']}
          title="Today's Tasks"
          />
      </List>
      )} />
    )
  }

  export default TodaysTasks;
