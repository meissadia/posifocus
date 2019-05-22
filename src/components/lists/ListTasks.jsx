import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/ListViews.css'
import { parseUrl, addVars } from '../../lib/Helpers';
import TodaysTasks from '../lists/ListTodaysTasks';
import NewTask from '../create/NewTask';
import EditTask from '../edit/EditTask';
import withGlobalContext from '../GlobalContextHOC';
import PageNavigation from '../PageNavigation';
import ListHOC from './ListHOC';
import List from './List';

const Tasks = props => {

  const { isToday, isNew, isEdit } = props;
  const params = parseUrl(props.location.pathname);

  if (isToday(props)) return <TodaysTasks />;
  if (isNew(props)) return <NewTask />;
  if (isEdit(props)) return <EditTask />;

  const navTitle = project => (project ? `${project.title} Tasks` : 'Tasks');

  const navBackText = priority => (priority ? priority.title : 'Projects');

  const navBackLink = () => addVars(`/priority/:priority/projects`, params);

  /* Override props.showEditor */
  function showEditor(event) {
    const id = event.target.attributes.jsvalue.value;
    const url = addVars(`/tasks/${id}/priority/:priority/projects/:projects/edit`, params)
    props.history.push(url);
  };

  const { sectionTitle, destroy, functions, location, urlParams } = props;
  const { getTasks, getSingle, taskToggle, deleteFromStateArray } = functions;

  const project = getSingle('projects', urlParams.projects);
  const priority = project && getSingle('priorities', project.priority)
  const tasks = getTasks(urlParams.projects);

  return (
    <List section={sectionTitle}
      className='route-transition exit-right'
      data={tasks}
      instructions={{ display: tasks.length === 0 }}
      delete={destroy.bind(deleteFromStateArray)}
      edit={showEditor}
      toggle={taskToggle.bind(null, getSingle)}
      location={location}
      update={props.update}
      itemType='task'
    >
      <PageNavigation
        back={[navBackLink(location), navBackText(priority)]}
        title={navTitle(project)}
        add={[`${location.pathname}/new`]}
      />
    </List>
  );
}

export default withRouter(withGlobalContext(ListHOC(Tasks, 'tasks')));
