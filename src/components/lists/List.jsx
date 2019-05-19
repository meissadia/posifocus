import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { get } from 'lodash';

import Instructions from './Instructions';
import ListItem from './ListItem';

const List = props => {
  const {
    data, edit, instructions, itemType, link,
    location, makeLink, section, toggle,
  } = props;

  const deepListItem = 'item-list ' + itemType;
  const totalCount = data.length;

  const dummy = () => false; // Simplifies makeLink functionality

  /**
  * Transition Animation Direction can be controlled through Location's state.
  * `props.location.state.enter`
  */
  const withEnterDirection = classname => {
    const direction = get(props, 'location.state.enter', 'enter-right');
    return [classname, props.className, direction].join(' ');
  }

  return (
    <div className={withEnterDirection('list-wrapper')}>
      {props.children} {/* Page Navigation */}
      <ul id='list' className={deepListItem} >
        <TransitionGroup>
          {data.map((item, index) => (
            <CSSTransition
              timeout={250}
              classNames='list-item'
              key={`${item.id}`}
            >
              <ListItem
                item={item}
                index={index}
                destroyer={props.delete}
                edit={edit}
                toggle={toggle}
                link={link}
                makeLink={makeLink || dummy}
                location={location}
                section={section}
                totalCount={totalCount}
                itemType={itemType}
              />
            </CSSTransition>
          ))}
          <CSSTransition
            timeout={250}
            classNames='list-item'
            key='instructions'
          >
            <Instructions
              section={section}
              src={instructions.icon}
              display={instructions.display}
            />
          </CSSTransition>
        </TransitionGroup>
      </ul>
    </div>
  )
}

export default List;
