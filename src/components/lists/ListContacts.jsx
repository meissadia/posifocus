import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../styles/css/ListViews.css'
import Colors from '../../lib/Colors';
import { GlobalContext } from '../App';
import PageNavigation from '../PageNavigation';
import List from './List';

const Contacts = props => {
  const section = 'contacts';

  const deleteHandler = (deleter, event) => {
    event.preventDefault();
    deleter(section, event.target.attributes.jsvalue.value);
  }

  const editHandler = (event) => {
    const id = event.target.attributes.jsvalue.value;
    const url = `/${section}/${id}/edit`;
    props.history.push(url);
  }

  const navTitle = parent => {
    if (parent) return parent.title + ' Contacts';
    return 'Contacts';
  }

  const addLink = match => match.url + '/new';
  
  return (
    <GlobalContext.Consumer>
      {({ functions }) => {
        const { getSingle, getContacts, deleteFromStateArray } = functions;
        const relationship = getSingle('relationships', props.match.params.relationship_id);
        const contacts = getContacts(relationship);

        return (
          <List section={section}
            className='route-transition exit-right'
            instructions={{ display: contacts.length === 0 }}
            data={contacts}
            delete={deleteHandler.bind(null, deleteFromStateArray)}
            edit={editHandler}
            match={props.match}
            location={props.location}
            background={Colors[section]}
            itemType='shallow'
          >
            <PageNavigation
              back={['/relationships', 'Relationships']}
              title={navTitle(relationship)}
              add={[addLink(props.match)]}
            />
          </List>
        );
      }}
    </GlobalContext.Consumer>
  )
}

export default withRouter(Contacts);
