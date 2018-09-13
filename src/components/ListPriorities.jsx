import React          from 'react';
import { Route }      from 'react-router-dom';
import PageNavigation from './PageNavigation';
import Instructions   from './Instructions';
import List           from './List';
import ListItem       from './ListItem';
import bgimage from '../images/priorities-instructions-tableview.png';
import '../css/ListViews.css'

function Priorities(props) {
  let showInstructions = props.data.length === 0;
  
  let deletePriority = (event) => {
    event.preventDefault();
    props.delete(event.target.attributes.jsvalue.value);
  }

  return (
    <Route exact path='/priorities' render={() => (
      <List section='relationships'
        instructions={{display: showInstructions, icon: bgimage}}
        data={props.data}
        delete={deletePriority}
        makeLink={(item, match) => (`/priority/${item.id}/projects`)}
        >
        <PageNavigation
          back={['/', 'Dashboard']}
          title='Priorities'
          add={['/priorities/new']}
          />
      </List>
      )}/>
    )
  }

  export default Priorities;
