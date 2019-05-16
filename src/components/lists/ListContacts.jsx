import React from 'react';
import { withRouter } from 'react-router-dom';
import { get } from 'lodash';

import '../../styles/css/ListViews.css'
import Colors from '../../lib/Colors';
import PageNavigation from '../PageNavigation';
import NewContact from '../create/NewContact';
import EditContact from '../edit/EditContact';
import { parseUrl } from '../../lib/Helpers';
import List, { ListHOC } from './List';

const Contacts = props => {
  const urlParams = parseUrl(props.location.pathname);

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
      background={Colors[props.sectionTitle]}
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

export default withRouter(ListHOC(Contacts, 'contacts'));
