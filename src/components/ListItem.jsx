import React       from 'react';
import { NavLink } from 'react-router-dom';
import ListIcon    from './ListIcon';
import ToggleItem  from './ToggleItem';
import editIcon from '../images/edit-icon.png';
import deleteIcon from '../images/delete-icon.png';

function ListItem(props) {
  let item = props.item;
  let cname = 'list-item';
  if(props.item.done) { cname += ' done'};
  return (
    <li className={cname} >
      <ItemField target={'title'} item={item} link={props.link}/>
      <ItemField target={'content'} item={item} />
      <ToggleItem
        target={'today'}
        item={item}
        label='Due Today?'
        toggle={props.toggle}
        />
      <ToggleItem
        target={'done'}
        item={item}
        label='Done?'
        toggle={props.toggle}
        />
      <div className='list-item-actions'>
        <ListIcon name='edit' href='#' id={item.id} alt='Pencil' src={editIcon}/>
        <ListIcon name='delete' onclick={props.delete} id={item.id} alt='Trashcan' src={deleteIcon}/>
      </div>
      <DateField date={item.date} />
    </li>
  )
}

function ItemField(props) {
  let value = props.item[props.target];
  if(value == null) { return null };
  if(props.boolean){
    value = value ? 'True' : 'False';
    value = `${props.target} ${value}`;
  }

  if(props.link) { value = value.toString() + " >" };

  let item = <div className={props.target}>{value}</div>

  if(props.link) {
    return <NavLink to={props.link} prefetch='true'>{item}</NavLink>
  }
  return item;
}

function DateField(props) {
  let formatDate = (dateString) => (
    dateString.split(' ').slice(0,4).join(' ')
  )
  return (
    <div className='date'>
      {formatDate(props.date)}
    </div>
  )
}

export default ListItem;
