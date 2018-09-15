import React          from 'react';
import { Route }      from 'react-router-dom';
import PageNavigation from './PageNavigation';
import List           from './List';
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
        instructions={{
          display: showInstructions,
          icon: '/images/priorities-instructions-tableview.png' }}
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
