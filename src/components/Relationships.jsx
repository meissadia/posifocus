import React from 'react';
import Instructions from './Instructions';
import PageNavigation from './PageNavigation';
import ListItem from './ListItem';
import { Route }  from 'react-router-dom';
import relationships from '../images/relationships-instructions-tableview.png';


import '../css/ListViews.css'

let Relationships = (props) => {
  let showInstructions = props.data.length === 0;

  var deleteRelationship = (event) => {
    event.preventDefault();
    props.delete(event.target.attributes.jsvalue.value);
  }

  return (
    <Route exact path='/relationships' render={() => (
        <div className='list-wrapper'>
          <PageNavigation
            back={['/', 'Dashboard']}
            title='Relationships'
            add={['/relationships/new']}
            />
          <ul className='item-list'>
            <Instructions section='relationships' src={relationships} display={showInstructions} />
            { props.data.map((item, index) => (
              <ListItem
                item={item}
                delete={deleteRelationship}
                link={`/relationship/${item.id}/contacts`}
                key={`${index}_${item.id}`}
                />
            ))}
          </ul>
        </div>
      )} />
    )
  }


  export default Relationships;
