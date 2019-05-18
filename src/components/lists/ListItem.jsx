import React from 'react';
import { NavLink } from 'react-router-dom';
import ListIcon from './ListIcon';
import ToggleItem from './ToggleItem';
import editIcon from '../../images/edit.svg';
import deleteIcon from '../../images/delete.svg';
import Colors, { Color } from '../../lib/Colors'

const ListItem = props => {
  const {
    done, edit, itemType, link, location, index,
    makeLink, today, toggle, destroyer, item, totalCount
  } = props;

  const enhancedClassName = () => {
    let className = 'list-item ' + itemType;
    className += (done ? ' done' : '');
    className += (today ? ' today' : '');
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

  return (
    <li className={enhancedClassName()} style={style()}>
      <div className='list-item-content'>
        <ItemField target={'title'} item={item} link={itemLink()} />
        <ItemField target={'content'} item={item} />
        <ToggleItem
          target={'today'}
          item={item}
          label='Due Today?'
          toggle={toggle}
        />
        <ToggleItem
          target={'done'}
          item={item}
          label='Done?'
          toggle={toggle}
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
  if (value === null) return null;

  // Boolean field?
  if (props.boolean) {
    value = value ? 'True' : 'False';
    value = `${props.target} ${value}`;
  }

  if (!props.link)
    return <div className={props.target}>{value}</div>

  return (
    <NavLink to={props.link} prefetch='true'>
      <div className={props.target}>
        <div className='link'>
          <div className='value'>{value}</div>
        </div>
      </div>
    </NavLink>
  );
};

ItemField.displayName = 'ItemField';

const DateField = props => {
  const [month, dayOfMonth, year] = props.date.split(' ').slice(1, 4);
  const displayDate = `${month} ${dayOfMonth}, ${year}`

  return <div className='date'>{displayDate}</div>
};

DateField.displayName = 'DateField';

export default ListItem;
