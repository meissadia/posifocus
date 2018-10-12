import React          from 'react';
import PageNavigation from '../PageNavigation';
import List           from './List';
import Colors         from '../../lib/Colors';
import { withRouter } from 'react-router-dom';
import '../../styles/css/ListViews.css'

let Relationships = (props) => {
  let sectionTitle = 'relationships';
  let showInstructions = props.data.length === 0;

  var deleteRelationship = (event) => {
    event.preventDefault();
    props.delete(event.target.attributes.jsvalue.value);
  }

  let editHandler = (event) => {
    let id = event.target.attributes.jsvalue.value;
    let url = `/${sectionTitle}/${id}/edit`;
    props.history.push(url);
  }

  return (
    <List section={sectionTitle}
      className='route-transition exit-right'
      instructions={{ display: showInstructions }}
      data={props.data}
      delete={deleteRelationship}
      edit={editHandler}
      makeLink={(item) => (`/relationship/${item.id}/contacts`)}
      location={props.location}
      background={Colors[sectionTitle]}
      itemType='deep'
      >
      <PageNavigation
        back={['/', 'Dashboard']}
        title='Relationships'
        add={['/relationships/new']}
        />
    </List>
  )
}

export default withRouter(Relationships);
