import React          from 'react';
import { Route }      from 'react-router-dom';
import PageNavigation from './PageNavigation';
import Instructions   from './Instructions';
import List           from './List';
import ListItem       from './ListItem';
import bgimage    from '../images/contacts-instructions-tableview.png';
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

  return (
    <Route exact path='/relationship/:relationship_id/contacts'
      render={ ({match}) => {
        let relationship = props.getSingle('relationships', match.params.relationship_id);
        let contacts = props.getContacts(relationship);
        let showInstructions = contacts.length === 0;

        return (
          <List section='contacts'
            instructions={{ display: showInstructions, icon: bgimage }}
            data={contacts}
            delete={deleteContact}
            toggle={props.toggle}
            match={match}
            >
            <PageNavigation
              back={['/relationships', 'Relationships']}
              title={navTitle(relationship)}
              add={[addLink(match)]}
              />
          </List>
        )
      }} />
    )
  }

  export default Contacts;
