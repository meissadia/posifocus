import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/ListViews.css'
import Colors from '../../lib/Colors';
import PageNavigation from '../PageNavigation';
import NewProject from '../create/NewProject';
import EditProject from '../edit/EditProject';
import { parseUrl } from '../../lib/Helpers';
import List, { ListHOC } from './List';

const Projects = props => {
  const urlParams = parseUrl(props.location.pathname);

  if (props.isNew(props)) return <NewProject />;
  if (props.isEdit(props)) return <EditProject cid={urlParams.project} />;

  const navTitle = (parent) => {
    if (parent) { return parent.title + ' Projects' }
    return 'Projects'
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
      makeLink={(item, _match, location) => (`/tasks${location.pathname.slice(0, -1)}/${item.id}`)}
      match={props.match}
      location={props.location}
      background={Colors[props.sectionTitle]}
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

export default withRouter(ListHOC(Projects, 'projects'));
