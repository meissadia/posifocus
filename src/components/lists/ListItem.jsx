import React from 'react';
import { NavLink } from 'react-router-dom';

import deleteIcon from '../../images/delete.svg';
import editIcon from '../../images/edit.svg';
import Colors, { Color } from '../../lib/Colors'

import ToggleItem from './ToggleItem';
import ListIcon from './ListIcon';

import $ from 'jquery';

const ListItem = props => {
  const {
    edit, itemType, link, location, index, section,
    makeLink, toggle, destroyer, item, totalCount
  } = props;

  const enhancedClassName = () => {
    let className = 'list-item ' + itemType;
    className += (item.done ? ' done' : '');
    className += (item.today ? ' today' : '');
    return className;
  }

  const backgroundColor = () => {
    const max = totalCount * 1.2;
    const pct = index / max;
    const background = Colors[props.section];

    if (itemType === 'shallow')
      return background.alpha(1).pct(.2).str();

    if (!background)
      return (new Color(0, 0, 0, 0)).alpha(pct).str();

    return background.alpha(.9).pct(pct).str();
  }

  const style = () => ({
    background: backgroundColor(),
  });

  const itemLink = () => link || makeLink(item, location);

  const doneAnimateHack = e => {
    e.persist();
    $(`#${section}-${item.id}`).toggleClass('done');
    setTimeout(() => toggle(e), 250);
  }

  const todayAnimateHack = e => {
    e.persist();
    const target = $(`#${section}-${item.id}`);
    if (section === 'todays') {
      target.animate({
        opacity: 0,
        height: 0
      },
        {
          duration: 250,
          complete: () => toggle(e),
        }
      );
    }
    else {
      target.toggleClass('today');
      setTimeout(() => toggle(e), 250);
    }
  }

  return (
    <li id={`${section}-${item.id}`} className={enhancedClassName()} style={style()}>
      <div className='list-item-content'>
        <ItemField target={'title'} item={item} link={itemLink()} section={section} />
        <ItemField target={'content'} item={item} />
        <ToggleItem
          target={'today'}
          item={item}
          label='Due Today?'
          toggle={todayAnimateHack}
        />
        <ToggleItem
          target={'done'}
          item={item}
          label='Done?'
          toggle={doneAnimateHack}
        />
        <DateField date={item.date} />
      </div>
      <div className='list-item-actions'>
        <ListIcon
          name='edit'
          invert={true}
          id={item.id}
          alt='Pencil'
          src={editIcon}
          onclick={edit}
        />
        <ListIcon
          name='delete'
          invert={true}
          onclick={destroyer}
          id={item.id}
          alt='Trashcan'
          src={deleteIcon}
        />
      </div>
    </li>
  )
}

const ItemField = props => {
  let value = props.item[props.target];
  if (value === null) return value;

  // Boolean field?
  if (props.boolean) {
    value = value ? 'True' : 'False';
    value = `${props.target} ${value}`;
  }

  if (!props.link)
    return <div className={props.target}>{value}</div>

  const animateExitLeft = () => {
    const el = $(`.${props.section}.route-transition`);
    el.removeClass('exit-right');
    el.addClass('exit-left');
  }

  return (
    <NavLink
      onClick={animateExitLeft}
      to={props.link} prefetch='true'>
      <div className={props.target}>
        <div className='link'>
          <div className='value'>{value}</div>
        </div>
      </div>
    </NavLink>
  );
};

const DateField = props => {
  const [month, dayOfMonth, year] = props.date.split(' ').slice(1, 4);
  const displayDate = `${month} ${dayOfMonth}, ${year}`

  return <div className='date'>{displayDate}</div>
};

export default ListItem;
