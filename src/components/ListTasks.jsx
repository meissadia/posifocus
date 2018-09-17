import React          from 'react';
import PageNavigation from './PageNavigation';
import List           from './List';
import '../css/ListViews.css'

let Tasks = (props) => {

  var deleteTask = (event) => {
    event.preventDefault();
    props.delete('tasks', event.target.attributes.jsvalue.value);
  }

  let navTitle = (project) => {
    let val = 'Tasks';
    if(project) { return project.title + ' Tasks' }
    return val;
  }

  let navBackText = (priority) => {
    if(priority) { return priority.title }
    return 'Projects'
  }

  let navBackLink = (match) => {
    return match.url.split('/').slice(0,-2).join('/') + 's'
  }

  let match = props.match;
  let url = match.url;
  let params = match.params;
  let project = props.getSingle('projects', params.project_id);
  let priority = project && props.getSingle('priorities', project.priority)
  let tasks = props.getTasks(params.project_id);
  let showInstructions = tasks.length === 0;

  return (
    <List section='tasks'
      className='route-transition enter-right exit-right'
      data={tasks}
      instructions={{
        display: showInstructions,
        icon: '/images/tasks-instructions-tableview.png' }}
        delete={deleteTask}
        toggle={props.toggle}
        match={match}
        >
        <PageNavigation
          back={[navBackLink(match), navBackText(priority)]}
          title={navTitle(project)}
          add={[`${url}/new`]}
          />
      </List>
    )
  }

  export default Tasks;
