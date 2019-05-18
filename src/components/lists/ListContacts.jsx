import React from 'react';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';

import '../../styles/css/ListViews.css'
import PageNavigation from '../PageNavigation';
import NewContact from '../create/NewContact';
import EditContact from '../edit/EditContact';
import List from './List';
import ListHOC from './ListHOC';
import withGlobalContext from '../GlobalContextHOC';

const Contacts = props => {
  const { urlParams } = props;

  if (props.isNew(props)) return <NewContact />;
  if (props.isEdit(props)) return <EditContact cid={urlParams.contacts} />;

  const navTitle = parent => {
    if (parent) return parent.title + ' Contacts';
    return 'Contacts';
  }

  const addLink = location => get(location, 'pathname', '') + '/new'

  const { getSingle, getContacts, deleteFromStateArray } = props.functions;
  const relationship = getSingle('relationships', urlParams.relationship);
  const contacts = getContacts(relationship);

  return (
    <List section={props.sectionTitle}
      className='route-transition exit-right'
      instructions={{ display: contacts.length === 0 }}
      data={contacts}
      delete={props.destroy.bind(deleteFromStateArray)}
      edit={props.showEditor}
      match={props.match}
      location={props.location}
      itemType='shallow'
    >
      <PageNavigation
        back={['/relationships', 'Relationships']}
        title={navTitle(relationship)}
        add={[addLink(props.location)]}
      />
    </List>
  );
}

export default withRouter(
  withGlobalContext(
    ListHOC(Contacts, 'contacts')
  )
);
