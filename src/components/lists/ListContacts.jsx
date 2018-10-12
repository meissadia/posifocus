import React          from 'react';
import PageNavigation from '../PageNavigation';
import List           from './List';
import Colors         from '../../lib/Colors';
import { withRouter } from 'react-router-dom';
import '../../styles/css/ListViews.css'

let Contacts = (props) => {
  let sectionTitle = 'contacts'

  let deleteContact = (event) => {
    event.preventDefault();
    props.delete(sectionTitle, event.target.attributes.jsvalue.value);
  }

  let editHandler = (event) => {
    let id = event.target.attributes.jsvalue.value;
    let url = `/${sectionTitle}/${id}/edit`;
    props.history.push(url);
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
    <List section={sectionTitle}
      className='route-transition exit-right'
      instructions={{ display: showInstructions }}
      data={contacts}
      delete={deleteContact}
      edit={editHandler}
      toggle={props.toggle}
      match={props.match}
      location={props.location}
      background={Colors[sectionTitle]}
      itemType='shallow'
      >
      <PageNavigation
        back={['/relationships', 'Relationships']}
        title={navTitle(relationship)}
        add={[addLink(props.match)]}
        />
    </List>
  )
}

export default withRouter(Contacts);
