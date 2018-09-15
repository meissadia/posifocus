import React          from 'react';
import { Route }      from 'react-router-dom';
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
    <Route exact path='/gratitudes' render={ () => (
        <List section='gratitudes'
          instructions={{
            display: showInstructions,
            icon: '/images/gratitudes-instructions-tableview.png' }}
          data={props.data}
          delete={deleteGratitude}
          >
          <PageNavigation
            back={['/', 'Dashboard']}
            title='Gratitudes'
            add={['/gratitudes/new']}
            />
        </List>
      )
    }
    />
  )
}

export default Gratitudes;