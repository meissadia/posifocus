import React          from 'react';
import PageNavigation from '../PageNavigation';
import List           from './List';
import Colors         from '../../lib/Colors';
import { withRouter } from 'react-router-dom';
import '../../styles/css/ListViews.css'

let TodaysTasks = (props) => {
  let sectionTitle = 'todays';

  let showInstructions = props.data.length === 0;

  let deleteTask = (event) => {
    event.preventDefault();
    props.delete('tasks', event.target.attributes.jsvalue.value);
  }

  let editHandler = (event) => {
    let id = event.target.attributes.jsvalue.value;
    let url = `/${sectionTitle}/${id}/edit`;
    props.history.push(url);
  }

  return (
    <List section={sectionTitle}
      className='route-transition exit-right'
      instructions={{ display: showInstructions }}
      data={props.data}
      delete={deleteTask}
      edit={editHandler}
      toggle={props.toggle}
      location={props.location}
      background={Colors.todays}
      itemType='task'
      >
      <PageNavigation
        back={['/', 'Dashboard']}
        title="Today's Tasks"
        />
    </List>
  )
}

export default withRouter(TodaysTasks);
