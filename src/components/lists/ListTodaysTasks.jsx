import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../styles/css/ListViews.css'
import Colors from '../../lib/Colors';
import EditTask from '../edit/EditTask';
import PageNavigation from '../PageNavigation';
import List, { ListHOC } from './List';

const TodaysTasks = props => {

  if (props.isEdit(props)) return <EditTask todays={true} />

  const deleteHandler = (deleter, event) => {
    event.preventDefault();
    deleter('tasks', event.target.attributes.jsvalue.value);
  }

  const { deleteFromStateArray, taskToggle, getSingle } = props.functions;
  const tasks = props.data.filter(task => task.today);

  return (
    <List section={props.sectionTitle}
      className='route-transition exit-right'
      instructions={{ display: tasks.length === 0 }}
      data={tasks}
      delete={deleteHandler.bind(null, deleteFromStateArray)}
      edit={props.showEditor}
      toggle={taskToggle.bind(null, getSingle)}
      location={props.location}
      background={Colors.todays}
      itemType='task'
    >
      <PageNavigation
        back={['/', 'Dashboard']}
        title="Today's Tasks"
      />
    </List>
  );
}

export default withRouter(ListHOC(TodaysTasks, 'todays'));
