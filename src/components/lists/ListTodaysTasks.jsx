import React          from 'react';
import PageNavigation from '../PageNavigation';
import List           from './List';
import Colors         from '../../lib/Colors';
import '../../css/ListViews.css'

let TodaysTasks = (props) => {
  let showInstructions = props.data.length === 0;

  let deleteTask = (event) => {
    event.preventDefault();
    props.delete('tasks', event.target.attributes.jsvalue.value);
  }

  return (
    <List section='todays'
      className='route-transition exit-right'
      instructions={{
        display: showInstructions,
        icon: '/images/tasks-instructions-tableview.png' }}
        data={props.data}
        delete={deleteTask}
        toggle={props.toggle}
        location={props.location}
        background={Colors.todays}
        setBackground={props.setBackground}
        itemType='task'
        >
        <PageNavigation
          back={['/', 'Dashboard']}
          title="Today's Tasks"
          />
      </List>
    )
  }

  export default TodaysTasks;
