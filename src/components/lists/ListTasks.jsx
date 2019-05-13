import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/ListViews.css'
import Colors from '../../lib/Colors';
import PageNavigation from '../PageNavigation';
import { GlobalContext } from '../App';
import List from './List';

const Tasks = (props) => {
  const section = 'tasks';

  const deleteTask = (deleter, event) => {
    event.preventDefault();
    deleter(section, event.target.attributes.jsvalue.value);
  }

  const editHandler = (event) => {
    const id = event.target.attributes.jsvalue.value;
    const url = `/${section}/${id}/edit`;
    props.history.push(url);
  }

  const navTitle = (project) => {
    const val = 'Tasks';
    if (project) { return project.title + ' Tasks' }
    return val;
  }

  const navBackText = (priority) => {
    if (priority) { return priority.title }
    return 'Projects'
  }

  const navBackLink = (match) => {
    return match.url.split('/').slice(0, -2).join('/') + 's'
  }

  return (
    <GlobalContext.Consumer>
      {({ functions }) => {
        const { url, params } = props.match;
        const {getTasks, getSingle, taskToggle, deleteFromStateArray} = functions;
        const project = getSingle('projects', params.project_id);
        const priority = project && getSingle('priorities', project.priority)
        const tasks = getTasks(props.match.params.project_id);

        return (
          <List section={section}
            className='route-transition exit-right'
            data={tasks}
            instructions={{ display: tasks.length === 0 }}
            delete={deleteTask.bind(null, deleteFromStateArray)}
            edit={editHandler}
            toggle={taskToggle}
            match={props.match}
            location={props.location}
            background={Colors[section]}
            itemType='task'
          >
            <PageNavigation
              back={[navBackLink(props.match), navBackText(priority)]}
              title={navTitle(project)}
              add={[`${url}/new`]}
            />
          </List>
        );
      }}
    </GlobalContext.Consumer>
  )
}

export default withRouter(Tasks);
