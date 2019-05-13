import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/ListViews.css'
import Colors from '../../lib/Colors';
import { GlobalContext } from '../App';
import PageNavigation from '../PageNavigation';
import List from './List';

const Relationships = props => {
  const sectionTitle = 'relationships';

  const deleteHandler = (deleter, event) => {
    event.preventDefault();
    deleter(event.target.attributes.jsvalue.value);
  }

  const editHandler = (event) => {
    const id = event.target.attributes.jsvalue.value;
    const url = `/${sectionTitle}/${id}/edit`;
    props.history.push(url);
  }

  return (
    <GlobalContext.Consumer>
      {({ state, functions, location }) => {
        const { deleteRelationship } = functions;
        const { relationships } = state

        return (
          <List section={sectionTitle}
            className='route-transition exit-right'
            instructions={{ display: relationships.length === 0 }}
            data={relationships}
            delete={deleteHandler.bind(null, deleteRelationship)}
            edit={editHandler}
            makeLink={(item) => (`/relationship/${item.id}/contacts`)}
            location={location}
            background={Colors[sectionTitle]}
            itemType='deep'
          >
            <PageNavigation
              back={['/', 'Dashboard']}
              title='Relationships'
              add={['/relationships/new']}
            />
          </List>
        );
      }}
      </GlobalContext.Consumer>
  );
};

export default withRouter(Relationships);
