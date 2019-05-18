import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/ListViews.css'
import PageNavigation from '../PageNavigation';
import List, { ListHOC } from './List';
import NewRelationship from '../../components/create/NewRelationship';
import EditRelationship from '../../components/edit/EditRelationship';

const Relationships = props => {
  const getId = () => props.location.pathname.split('/')[2];

  if (props.isNew(props)) return <NewRelationship />
  if (props.isEdit(props)) return <EditRelationship rid={getId()} />

  return (
    <List section={props.sectionTitle}
      className='route-transition exit-right'
      instructions={{ display: props.data.length === 0 }}
      data={props.data}
      delete={props.destroy}
      edit={props.showEditor}
      makeLink={item => (`/relationship/${item.id}/contacts`)}
      location={props.location}
      itemType='deep'
    >
      <PageNavigation
        back={['/', 'Dashboard']}
        title='Relationships'
        add={['/relationships/new']}
      />
    </List>
  );
};

export default withRouter(ListHOC(Relationships, 'relationships'));
