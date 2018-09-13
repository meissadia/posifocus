import React          from 'react';
import Instructions   from './Instructions';
import PageNavigation from './PageNavigation';
import ListItem       from './ListItem';
import { Route }  from 'react-router-dom';
import inst_icon from '../images/projects-instructions-tableview.png';

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
          <div className='list-wrapper'>
            <PageNavigation
              back={['/priorities', 'Priorities']}
              title={navTitle(parent)}
              add={[`${match.url}/new`]}
              />
            <ul className='item-list'>
              <Instructions section='projects' src={inst_icon} display={showInstructions} />
              { data.map((item, index) => (
                <ListItem
                  item={item}
                  delete={deleteProject}
                  link={`${match.url.slice(0,-1)}/${item.id}/tasks`}
                  key={`${index}_${item.id}`}
                  />
              ))}
            </ul>
          </div>
        )
      }} />
    )
  }

  export default Projects;
