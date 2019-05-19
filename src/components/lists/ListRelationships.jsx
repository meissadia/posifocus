import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/ListViews.css'
import PageNavigation from '../PageNavigation';
import withGlobalContext from '../GlobalContextHOC';
import List from './List';
import ListHOC from './ListHOC';

import NewRelationship from '../../components/create/NewRelationship';
import EditRelationship from '../../components/edit/EditRelationship';

const Relationships = props => {
  const { isNew, isEdit } = props;

  if (isNew(props)) return <NewRelationship />
  if (isEdit(props)) return <EditRelationship />

  const { sectionTitle, data, destroy, showEditor, location, } = props;
  return (
    <List section={sectionTitle}
      className='route-transition exit-right'
      instructions={{ display: data.length === 0 }}
      data={data}
      delete={destroy}
      edit={showEditor}
      makeLink={item => (`/relationship/${item.id}/contacts`)}
      location={location}
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

export default withRouter(withGlobalContext(ListHOC(Relationships, 'relationships')));
