import React          from 'react';
import PageNavigation from './PageNavigation';
import List           from './List';
import '../css/ListViews.css'

let Relationships = (props) => {
  let showInstructions = props.data.length === 0;

  var deleteRelationship = (event) => {
    event.preventDefault();
    props.delete(event.target.attributes.jsvalue.value);
  }

  return (
    <List section='relationships'
      className='route-transition enter-right exit-right'
      instructions={{
        display: showInstructions,
        icon: '/images/relationships-instructions-tableview.png' }}
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
    )
  }

  export default Relationships;
