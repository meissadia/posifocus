import React          from 'react';
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
    <List section='relationships'
      className='route-transition exit-right'
      instructions={{
        display: showInstructions,
        icon: '/images/priorities-instructions-tableview.png' }}
        data={props.data}
        delete={deletePriority}
        makeLink={(item, match) => (`/priority/${item.id}/projects`)}
        location={props.location}
        bgList='rgba(16, 156, 227, 0.8)'
        >
        <PageNavigation
          back={['/', 'Dashboard']}
          title='Priorities'
          add={['/priorities/new']}
          />
      </List>
    )
  }

  export default Priorities;
