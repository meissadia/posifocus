import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { get } from 'lodash';
import arrayMove from 'array-move';

import Instructions from './Instructions';
import ListItem from './ListItem';

import '../../styles/scss/ListViews.sass';

const List = props => {
  const {
    data, edit, instructions, itemType, link,
    location, makeLink, section, toggle,
  } = props;

  const typedItemList = 'item-list ' + itemType;
  const totalCount = data.length;

  const dummy = () => false; // Simplifies makeLink functionality

  /**
  * Transition Animation Direction can be controlled through Location's state.
  * `props.location.state.enter`
  */
  const withEnterDirection = classname => {
    const direction = get(props, 'location.state.enter', 'enter-right');
    return [section, props.className, classname, direction].join(' ');
  }

  const SortableItem = SortableElement(({ item, index }) => (
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
    </CSSTransition >
  ));

  const SortableList = SortableContainer(({ data }) => (
    <ul id='list' className={typedItemList} >
      <TransitionGroup>
        {data.map((item, index) => (
          <SortableItem key={item.id} item={item} index={index} />
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

  ));

  const sortEnd = ({ oldIndex, newIndex }) => {
    const mappedSection = section === 'todays' ? 'tasks' : section;

    props.update({
      [mappedSection]: arrayMove(data, oldIndex, newIndex),
    })
  }

  return (
    <div className={withEnterDirection('list-wrapper')}>
      {props.children} {/* Page Navigation */}
      < SortableList
        data={data}
        onSortEnd={sortEnd}
        pressDelay={100}
        lockAxis='y'
        helperClass='sortable-helper'
      />
    </div>
  )

  // return (
  //   <div className={withEnterDirection('list-wrapper')}>
  //     {props.children} {/* Page Navigation */}
  //     <ul id='list' className={typedItemList} >
  //       <TransitionGroup>
  //         {data.map((item, index) => (
  //           <CSSTransition
  //             timeout={250}
  //             classNames='list-item'
  //             key={`${item.id}`}
  //           >
  //             <ListItem
  //               item={item}
  //               index={index}
  //               destroyer={props.delete}
  //               edit={edit}
  //               toggle={toggle}
  //               link={link}
  //               makeLink={makeLink || dummy}
  //               location={location}
  //               section={section}
  //               totalCount={totalCount}
  //               itemType={itemType}
  //             />
  //           </CSSTransition>
  //         ))}
  //         <CSSTransition
  //           timeout={250}
  //           classNames='list-item'
  //           key='instructions'
  //         >
  //           <Instructions
  //             section={section}
  //             src={instructions.icon}
  //             display={instructions.display}
  //           />
  //         </CSSTransition>
  //       </TransitionGroup>
  //     </ul>
  //   </div>
  // )
}

export default List;
