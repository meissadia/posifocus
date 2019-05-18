import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/ListViews.css'
import PageNavigation from '../PageNavigation';
import NewTask from '../create/NewTask';
import EditTask from '../edit/EditTask';
import List, { ListHOC } from './List';
import TodaysTasks from '../lists/ListTodaysTasks';


const Tasks = props => {
  const { urlParams } = props;

  if (props.isToday(props))
    return <TodaysTasks />;
  if (props.isNew(props))
    return <NewTask />;
  if (props.isEdit(props))
    return <EditTask tid={urlParams.tasks} />;


  const navTitle = (project) => {
    const val = 'Tasks';
    if (project) { return project.title + ' Tasks' }
    return val;
  }

  const navBackText = (priority) => {
    if (priority) { return priority.title }
    return 'Projects'
  }

  const navBackLink = location => {
    return '/' + location.pathname.split('/').slice(2, 5).join('/')
  }

  // Override props.showEditor
  function showEditor(event) {
    const id = event.target.attributes.jsvalue.value;
    const parts = props.location.pathname.split('/');
    const url = `/${parts[1]}/${id}/${parts.slice(2).join('/')}/edit`;
    props.history.push(url);
  };


  const { getTasks, getSingle, taskToggle, deleteFromStateArray } = props.functions;
  const project = getSingle('projects', urlParams.projects);
  const priority = project && getSingle('priorities', project.priority)
  const tasks = getTasks(urlParams.projects);

  return (
    <List section={props.sectionTitle}
      className='route-transition exit-right'
      data={tasks}
      instructions={{ display: tasks.length === 0 }}
      delete={props.destroy.bind(deleteFromStateArray)}
      edit={showEditor}
      toggle={taskToggle.bind(null, getSingle)}
      match={props.match}
      location={props.location}
      itemType='task'
    >
      <PageNavigation
        back={[navBackLink(props.location), navBackText(priority)]}
        title={navTitle(project)}
        add={[`${props.location.pathname}/new`]}
      />
    </List>
  );
}

export default withRouter(ListHOC(Tasks, 'tasks'));
