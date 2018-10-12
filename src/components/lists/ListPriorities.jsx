import React          from 'react';
import PageNavigation from '../PageNavigation';
import List           from './List';
import Colors         from '../../lib/Colors';
import { withRouter } from 'react-router-dom';
import '../../styles/css/ListViews.css'

function Priorities(props) {
  let sectionTitle = 'priorities';
  let showInstructions = props.data.length === 0;

  let deletePriority = (event) => {
    event.preventDefault();
    props.delete(event.target.attributes.jsvalue.value);
  }

  let edit = (event) => {
    let id = event.target.attributes.jsvalue.value;
    let url = `/${sectionTitle}/${id}/edit`;
    console.log(url);
    props.history.push(url);
  }

  return (
    <List section={sectionTitle}
      className='route-transition exit-right'
      instructions={{ display: showInstructions }}
      data={props.data}
      delete={deletePriority}
      edit={edit}
      makeLink={(item, match) => (`/priority/${item.id}/projects`)}
      location={props.location}
      background={Colors[sectionTitle]}
      itemType='deep'
      >
      <PageNavigation
        back={['/', 'Dashboard']}
        title='Priorities'
        add={[`/${sectionTitle}/new`]}
        />
    </List>
  )
}

export default withRouter(Priorities);
