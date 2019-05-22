import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../styles/css/ListViews.css'
import EditTask from '../edit/EditTask';
import PageNavigation from '../PageNavigation';
import List from './List';
import ListHOC from './ListHOC';
import withGlobalContext from '../GlobalContextHOC';

const TodaysTasks = props => {
  if (props.isEdit(props)) return <EditTask todays={true} />

  const { data, functions, location, sectionTitle, showEditor, } = props;
  const { deleteFromStateArray, taskToggle, getSingle } = functions;
  const tasks = data.filter(task => task.today);

  const deleteHandler = (deleter, event) => {
    event.preventDefault();
    deleter('tasks', event.target.attributes.jsvalue.value);
  }

  return (
    <List section={sectionTitle}
      className='route-transition exit-right'
      instructions={{ display: tasks.length === 0 }}
      data={tasks}
      delete={deleteHandler.bind(null, deleteFromStateArray)}
      edit={showEditor}
      toggle={taskToggle.bind(null, getSingle)}
      location={location}
      update={props.update}
      itemType='task'
    >
      <PageNavigation
        back={['/', 'Dashboard']}
        title="Today's Tasks"
      />
    </List>
  );
}

export default withRouter(withGlobalContext(ListHOC(TodaysTasks, 'todays')));
