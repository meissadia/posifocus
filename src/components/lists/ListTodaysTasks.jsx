import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../styles/css/ListViews.css'
import Colors from '../../lib/Colors';
import { GlobalContext } from '../App';
import PageNavigation from '../PageNavigation';
import List from './List';

const TodaysTasks = (props) => {
  const section = 'todays';

  const deleteHandler = (deleter, event) => {
    event.preventDefault();
    deleter('tasks', event.target.attributes.jsvalue.value);
  }

  const editHandler = (event) => {
    const id = event.target.attributes.jsvalue.value;
    const url = `/${section}/${id}/edit`;
    props.history.push(url);
  }

  return (
    <GlobalContext.Consumer>
      {({ state, functions }) => {
        const { deleteFromStateArray, taskToggle } = functions;
        const tasks = state.tasks.filter(task => task.today);

        return (
          <List section={section}
            className='route-transition exit-right'
            instructions={{ display: tasks.length === 0 }}
            data={tasks}
            delete={deleteHandler.bind(null, deleteFromStateArray)}
            edit={editHandler}
            toggle={taskToggle}
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
      }}
    </GlobalContext.Consumer>
  )
}

export default withRouter(TodaysTasks);
