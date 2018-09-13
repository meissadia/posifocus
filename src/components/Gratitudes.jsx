import React          from 'react';
import Instructions   from './Instructions';
import PageNavigation from './PageNavigation';
import ListItem       from './ListItem';
import { Route }      from 'react-router-dom';
import instructions   from '../images/gratitudes-instructions-tableview.png';


import '../css/ListViews.css'

function Gratitudes(props) {
  let deleteGratitude = (event) => {
    event.preventDefault();
    props.delete('gratitudes', event.target.attributes.jsvalue.value);
  }

  return (
    <Route exact path='/gratitudes' render={ () => (
        <div className='list-wrapper'>
          <PageNavigation
            back={['/', 'Dashboard']}
            title='Gratitudes'
            add={['/gratitudes/new']}
            />
          <ul className='item-list'>
            <Instructions section='gratitudes' src={instructions} display={props.data.length === 0} />
            { props.data.map((item, index) => (
              <ListItem
                item={item}
                delete={deleteGratitude}
                key={`${index}_${item.id}`}
                />
            ))}
          </ul>
        </div>
      )
    }
    />
  )
}


export default Gratitudes;
