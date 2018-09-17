import React          from 'react';
import PageNavigation from './PageNavigation';
import List           from './List';
import '../css/ListViews.css'

let Contacts = (props) => {

  let deleteContact = (event) => {
    event.preventDefault();
    props.delete('contacts', event.target.attributes.jsvalue.value);
  }

  let navTitle = (parent) => {
    if(parent) { return parent.title + ' Contacts' }
    return 'Contacts'
  }

  let addLink = (match) => {
    return match.url + '/new'
  }

  let relationship = props.getSingle('relationships', props.match.params.relationship_id);
  let contacts = props.getContacts(relationship);
  let showInstructions = contacts.length === 0;

  return (
    <List section='contacts'
      className='route-transition enter-right exit-right'
      instructions={{
        display: showInstructions,
        icon: '/images/contacts-instructions-tableview.png' }}
        data={contacts}
        delete={deleteContact}
        toggle={props.toggle}
        match={props.match}
        >
        <PageNavigation
          back={['/relationships', 'Relationships']}
          title={navTitle(relationship)}
          add={[addLink(props.match)]}
          />
      </List>
    )
  }

  export default Contacts;
