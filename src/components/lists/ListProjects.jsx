import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../styles/css/ListViews.css'
import Colors from '../../lib/Colors';
import { GlobalContext } from '../App';
import PageNavigation from '../PageNavigation';
import List from './List';

const Projects = props => {
  const section = 'projects';
  const match = props.match;

  const deleteHandler = (deleter, event) => {
    event.preventDefault();
    deleter(event.target.attributes.jsvalue.value);
  }

  const editHandler = (event) => {
    const id = event.target.attributes.jsvalue.value;
    const url = `/${section}/${id}/edit`;
    props.history.push(url);
  }

  const navTitle = (parent) => {
    if (parent) { return parent.title + ' Projects' }
    return 'Projects'
  }

  return (
    <GlobalContext.Consumer>
      {({ functions, location }) => {
        const { deleteProject, getSingle, getProjects } = functions;
        const projects = getProjects(match.params.priority_id);
        const parent = getSingle('priorities', match.params.priority_id);

        return (
          <List section={section}
            className='route-transition exit-right'
            instructions={{ display: projects.length === 0 }}
            data={projects}
            delete={deleteHandler.bind(null, deleteProject)}
            edit={editHandler}
            makeLink={(item, match) => (`${match.url.slice(0, -1)}/${item.id}/tasks`)}
            match={match}
            location={location}
            background={Colors[section]}
            itemType='deep'
          >
            <PageNavigation
              back={['/priorities', 'Priorities']}
              title={navTitle(parent)}
              add={[`${match.url}/new`]}
            />
          </List>
        )
      }}
    </GlobalContext.Consumer>
  )
}

export default withRouter(Projects);
