import React          from 'react';
import PageNavigation from '../PageNavigation';
import List           from './List';
import Colors         from '../../lib/Colors';
import { withRouter } from 'react-router-dom';
import '../../styles/css/ListViews.css'

let Projects = (props) => {
  let sectionTitle = 'projects'

  let deleteProject = (event) => {
    event.preventDefault();
    props.delete(event.target.attributes.jsvalue.value);
  }

  let editHandler = (event) => {
    let id = event.target.attributes.jsvalue.value;
    let url = `/${sectionTitle}/${id}/edit`;
    props.history.push(url);
  }

  let navTitle = (parent) => {
    if(parent) { return parent.title + ' Projects' }
    return 'Projects'
  }

  let match = props.match;
  let data = props.getProjects(match.params.priority_id);
  let parent = props.getSingle('priorities', match.params.priority_id);
  let showInstructions = data.length === 0;

  return (
    <List section='projects'
      className='route-transition exit-right'
      instructions={{ display: showInstructions }}
      data={data}
      delete={deleteProject}
      edit={editHandler}
      makeLink={(item, match) => (`${match.url.slice(0,-1)}/${item.id}/tasks`)}
      match={match}
      location={props.location}
      background={Colors[sectionTitle]}
      itemType='deep'
      >
      <PageNavigation
        back={['/priorities', 'Priorities']}
        title={navTitle(parent)}
        add={[`${match.url}/new`]}
        />
    </List>
  )
}

export default withRouter(Projects);
