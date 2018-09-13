import React from 'react';
import Instructions   from './Instructions';
import ListItem       from './ListItem';

const List = (props) => (
  <div className='list-wrapper'>
    {props.children} {/* Page Navigation */}
    <ul className='item-list'>
      <Instructions
        section={props.section}
        src={props.instructions.icon}
        display={props.instructions.display} />
      { props.data.map((item, index) => (
        <ListItem
          item={item}
          delete={props.delete}
          toggle={props.toggle}
          key={`${index}_${item.id}`}
          link={props.link}
          makeLink={props.makeLink}
          match={props.match}
          />
      ))}
    </ul>
  </div>
)

export default List;
