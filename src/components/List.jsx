import React from 'react';
import Instructions   from './Instructions';
import ListItem       from './ListItem';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const List = (props) => (
  <div className={'list-wrapper ' + props.className}>
    {props.children} {/* Page Navigation */}
    <ul className='item-list'>
      <TransitionGroup>
        { props.data.map((item, index) => (
          <CSSTransition
            timeout={500}
            classNames='list-item'
            key={`${item.id}`}
            >
            <ListItem
              item={item}
              delete={props.delete}
              toggle={props.toggle}
              link={props.link}
              makeLink={props.makeLink}
              match={props.match}
              />
          </CSSTransition>
        ))}
        <CSSTransition
          timeout={500}
          classNames='list-item'
          key='instructions'
          >
          <Instructions
            section={props.section}
            src={props.instructions.icon}
            display={props.instructions.display}
            />
        </CSSTransition>
      </TransitionGroup>
    </ul>
  </div>
)

export default List;
