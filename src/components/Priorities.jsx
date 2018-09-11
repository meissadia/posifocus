import React          from 'react';
import Instructions   from './Instructions';
import PageNavigation from './PageNavigation';
import ListItem       from './ListItem';
import '../css/ListViews.css'

function Priorities(props) {
  let deletePriority = (event) => {
    event.preventDefault();
    props.delete(event.target.attributes.jsvalue.value);
  }

  return (
    <div className='list-wrapper'>
      <PageNavigation
        back={['/', 'Dashboard']}
        title='Priorities'
        add={['/priorities/new']}
        />

      <ul className='item-list'>
        <Instructions section='priorities' display={props.data.length === 0} />
        { props.data.map((item, index) => (
          <ListItem
            item={item}
            delete={deletePriority}
            link={`/priority/${item.id}/projects`}
            key={`${index}_${item.id}`}
            />
        ))}
      </ul>
    </div>
  )
}


export default Priorities;
