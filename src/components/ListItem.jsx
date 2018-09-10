import React       from 'react';
import { NavLink } from 'react-router-dom';
import DeleteIcon  from './DeleteIcon';

function ListItem(props) {
  let item = props.item;
  return (
    <li className='list-item' >
      <ItemField target={'title'} item={item} link={props.link}/>
      <ItemField target={'content'} item={item} />
      <ItemField target={'today'} item={item} boolean={true}/>
      <ItemField target={'done'} item={item} boolean={true}/>
      <DeleteIcon delete={props.delete} id={item.id} />
      <DateField date={item.date} />
    </li>
  )
}

function ItemField(props){
  let value = props.item[props.target];
  if(value == null) { return null };
  if(props.boolean){
    value = value ? 'True' : 'False';
    value = `${props.target} ${value}`;
  }
  if(props.link) {
    value = value.toString() + " >" }

  let item = <div className={props.target}>{value}</div>

  if(props.link){
    /* Generate NavLink if a URL is given */
    return <NavLink to={props.link}>{item}</NavLink>
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
