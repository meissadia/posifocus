import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/ListViews.css'
import PageNavigation from '../PageNavigation';
import NewProject from '../create/NewProject';
import EditProject from '../edit/EditProject';
import List from './List';
import ListHOC from './ListHOC';
import withGlobalContext from '../GlobalContextHOC';

const Projects = props => {
  const { isNew, isEdit, urlParams } = props;

  if (isNew(props)) return <NewProject />;
  if (isEdit(props)) return <EditProject />;

  const navTitle = (parent) => {
    if (!parent || !parent.title) return 'Projects';
    return `${parent.title} Projects`;
  }

  const { deleteProject, getSingle, getProjects } = props.functions;
  const projects = getProjects(urlParams.priority);
  const parent = getSingle('priorities', urlParams.priority);

  return (
    <List section={props.sectionTitle}
      className='route-transition exit-right'
      instructions={{ display: projects.length === 0 }}
      data={projects}
      delete={props.destroy.bind(deleteProject)}
      edit={props.showEditor}
      makeLink={(item, location) => `/tasks${location.pathname}/${item.id}`}
      match={props.match}
      location={props.location}
      itemType='deep'
    >
      <PageNavigation
        back={['/priorities', 'Priorities']}
        title={navTitle(parent)}
        add={[`${props.location.pathname}/new`]}
      />
    </List>
  )
}

export default withRouter(withGlobalContext(ListHOC(Projects, 'projects')));
