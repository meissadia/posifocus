import React, { useEffect } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import { dummy, withEnterDirection, updateSortedCollection, } from './list-services';

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

  useEffect(() => {
    window && window.scrollTo(0, 0);
  })

  const SortableItem = SortableElement(({ item, index }) => (
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
  ));

  const SortableList = SortableContainer(({ data }) => (
    <ul id='list' className={typedItemList} jsvalue={totalCount}>
      {data.map((item, index) => (
        <SortableItem key={item.id} item={item} index={index} />
      ))}
      <Instructions
        section={section}
        src={instructions.icon}
        display={instructions.display}
      />
    </ul>

  ));

  return (
    <div className={withEnterDirection(props, 'list-wrapper')}>
      {props.children} {/* Page Navigation */}
      < SortableList
        data={data}
        onSortEnd={updateSortedCollection.bind(null, props)}
        pressDelay={200}
        lockAxis='y'
        helperClass='sortable-helper'
      />
    </div>
  );
};

export default List;
