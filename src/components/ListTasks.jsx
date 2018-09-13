import React          from 'react';
import { Route }      from 'react-router-dom';
import PageNavigation from './PageNavigation';
import List           from './List';
import bgimage        from '../images/tasks-instructions-tableview.png';
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

  return (
    <Route exact path='/priority/:priority_id/project/:project_id/tasks'
      render={({match}) => {
        let project = props.getSingle('projects', match.params.project_id);
        let priority = project && props.getSingle('priorities', project.priority)
        let tasks = props.getTasks(match.params.project_id);
        let showInstructions = tasks.length === 0;

        return (
          <List section='tasks'
            data={tasks}
            instructions={{display: showInstructions, icon: bgimage}}
            delete={deleteTask}
            toggle={props.toggle}
            match={match}
            >
            <PageNavigation
              back={[navBackLink(match), navBackText(priority)]}
              title={navTitle(project)}
              add={[`${match.url}/new`]}
              />
          </List>
        )
      }} />
    )
  }

  export default Tasks;
