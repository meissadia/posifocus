import React          from 'react';
import PageNavigation from '../PageNavigation';
import List           from './List';
import Colors         from '../../lib/Colors';
import { withRouter } from 'react-router-dom';
import '../../styles/css/ListViews.css'

function Gratitudes(props) {
  let sectionTitle = 'gratitudes'

  let showInstructions = props.data.length === 0;
  let deleteHandler = (event) => {
    props.delete(sectionTitle, event.target.attributes.jsvalue.value);
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
      delete={deleteHandler}
      edit={editHandler}
      location={props.location}
      background={Colors[sectionTitle]}
      itemType='shallow'
      >
      <PageNavigation
        back={['/', 'Dashboard']}
        title='Gratitudes'
        add={['/gratitudes/new']}
        />
    </List>
  )
}

export default withRouter(Gratitudes);
