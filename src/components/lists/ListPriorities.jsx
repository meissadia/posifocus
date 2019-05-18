import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/ListViews.css'
import PageNavigation from '../PageNavigation';
import List from './List';
import ListHOC from './ListHOC';
import withGlobalContext from '../GlobalContextHOC';
import NewPriority from '../../components/create/NewPriority';
import EditPriority from '../../components/edit/EditPriority';

const Priorities = props => {
  const getId = () => props.location.pathname.split('/')[2];

  if (props.isNew(props)) return <NewPriority />
  if (props.isEdit(props)) return <EditPriority pid={getId()} />

  return (
    <List section={props.sectionTitle}
      className='route-transition exit-right'
      instructions={{ display: props.data.length === 0 }}
      data={props.data}
      delete={props.destroy.bind(props.functions.deletePriority)}
      edit={props.showEditor}
      makeLink={item => `/priority/${item.id}/projects`}
      location={props.location}
      itemType='deep'
    >
      <PageNavigation
        back={['/', 'Dashboard']}
        title='Priorities'
        add={[`/${props.sectionTitle}/new`]}
      />
    </List>
  );
}

export default withRouter(
  withGlobalContext(
    ListHOC(Priorities, 'priorities')
  )
);
