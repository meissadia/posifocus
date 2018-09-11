import React          from 'react';
import Instructions   from './Instructions';
import PageNavigation from './PageNavigation';
import ListItem       from './ListItem';
import '../css/ListViews.css'

let Contacts = (props) => {
  let showInstructions = props.data.length === 0;

  let deleteContact = (event) => {
    event.preventDefault();
    props.delete('contacts', event.target.attributes.jsvalue.value);
  }

  let navTitle = () => {
    if(props.parent) { return props.parent.title }
    return 'Contacts'
  }

  let addLink = () => {
    return props.match.url + '/new'
  }

  return (
    <div className='list-wrapper'>
      <PageNavigation
        back={['/relationships', 'Relationships']}
        title={navTitle()}
        add={[addLink()]}
        />

      <ul className='item-list'>
        <Instructions section='contacts' display={showInstructions} />
        { props.data.map((item, index) => (
          <ListItem
            item={item}
            delete={deleteContact}
            key={`${index}_${item.id}`}
            />
        ))}
      </ul>
    </div>
  )
}


export default Contacts;
