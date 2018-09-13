import React          from 'react';
import { Route }      from 'react-router-dom';
import PageNavigation from './PageNavigation';

import List           from './List';

import bgimage        from '../images/relationships-instructions-tableview.png';
import '../css/ListViews.css'

let Relationships = (props) => {
  let showInstructions = props.data.length === 0;

  var deleteRelationship = (event) => {
    event.preventDefault();
    props.delete(event.target.attributes.jsvalue.value);
  }

  return (
    <Route exact path='/relationships' render={() => (
        <List section='relationships'
          instructions={{display: showInstructions, icon: bgimage}}
          data={props.data}
          delete={deleteRelationship}
          makeLink={(item) => (`/relationship/${item.id}/contacts`)}
          >
          <PageNavigation
            back={['/', 'Dashboard']}
            title='Relationships'
            add={['/relationships/new']}
            />
        </List>
      )} />
    )
  }

  export default Relationships;
