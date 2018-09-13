import React          from 'react';
import Instructions   from './Instructions';
import PageNavigation from './PageNavigation';
import ListItem       from './ListItem';
import { Route }  from 'react-router-dom';
import '../css/ListViews.css'

let Contacts = (props) => {
  let deleteContact = (event) => {
    event.preventDefault();
    props.delete('contacts', event.target.attributes.jsvalue.value);
  }

  let navTitle = (parent) => {
    if(parent) { return parent.title }
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
          <div className='list-wrapper'>
            <PageNavigation
              back={['/relationships', 'Relationships']}
              title={navTitle(relationship)}
              add={[addLink(match)]}
              />
            <ul className='item-list'>
              <Instructions section='contacts' display={showInstructions} />
              { contacts.map((item, index) => (
                <ListItem
                  item={item}
                  delete={deleteContact}
                  key={`${index}_${item.id}`}
                  />
              ))}
            </ul>
          </div>
        )
      }} />
    )
  }


  export default Contacts;
