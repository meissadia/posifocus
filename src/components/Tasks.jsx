import React          from 'react';
import Instructions   from './Instructions';
import PageNavigation from './PageNavigation';
import ListItem       from './ListItem';
import { Route }  from 'react-router-dom';

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

          <div className='list-wrapper'>
            <PageNavigation
              back={[navBackLink(match), navBackText(priority)]}
              title={navTitle(project)}
              add={[`${match.url}/new`]}
              />

            <ul className='item-list'>
              <Instructions section='priorities' display={showInstructions} />
              { tasks.map((item, index) => (
                <ListItem
                  item={item}
                  delete={deleteTask}
                  toggle={props.toggle}
                  key={`${index}_${item.id}`}
                  />
              ))}
            </ul>
          </div>
        )
  }} />)
}


export default Tasks;
