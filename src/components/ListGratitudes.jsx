import React          from 'react';
import PageNavigation from './PageNavigation';
import List           from './List';
import '../css/ListViews.css'

function Gratitudes(props) {

  let showInstructions = props.data.length === 0;
  let deleteGratitude = (event) => {
    event.preventDefault();
    props.delete('gratitudes', event.target.attributes.jsvalue.value);
  }

  return (
    <List section='gratitudes'
      className='route-transition exit-right'
      instructions={{
        display: showInstructions,
        icon: '/images/gratitudes-instructions-tableview.png' }}
        data={props.data}
        delete={deleteGratitude}
        location={props.location}
        >
        <PageNavigation
          back={['/', 'Dashboard']}
          title='Gratitudes'
          add={['/gratitudes/new']}
          />
      </List>
    )
  }

  export default Gratitudes;
