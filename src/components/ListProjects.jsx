import React          from 'react';
import { Route }      from 'react-router-dom';
import PageNavigation from './PageNavigation';
import List           from './List';
import bgimage from '../images/projects-instructions-tableview.png';
import '../css/ListViews.css'

let Projects = (props) => {

  let deleteProject = (event) => {
    event.preventDefault();
    props.delete(event.target.attributes.jsvalue.value);
  }

  let navTitle = (parent) => {
    if(parent) { return parent.title + ' Projects' }
    return 'Projects'
  }

  return (
    <Route exact path='/priority/:priority_id/projects' render={({match}) => {
        let data = props.getProjects(match.params.priority_id);
        let parent = props.getSingle('priorities', match.params.priority_id);
        let showInstructions = data.length === 0;

        return (
          <List section='projects'
            instructions={{display: showInstructions, icon: bgimage}}
            data={data}
            delete={deleteProject}
            makeLink={(item, match) => (`${match.url.slice(0,-1)}/${item.id}/tasks`)}
            match={match}
            >
            <PageNavigation
              back={['/priorities', 'Priorities']}
              title={navTitle(parent)}
              add={[`${match.url}/new`]}
              />
          </List>
        )
      }} />
    )
  }

  export default Projects;
