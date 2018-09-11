import React       from 'react';
import { NavLink } from 'react-router-dom';
import DeleteIcon  from './DeleteIcon';
import Toggle      from 'react-toggle';
import '../css/ReactToggle.css';

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
      <DeleteIcon delete={props.delete} id={item.id} />
      <DateField date={item.date} />
    </li>
  )
}

function ToggleItem(props) {
  let value = props.item[props.target];
  if(value == null) { return null };
  return(
    <div className='toggle-item'>
      <Toggle
        id={props.target}
        name={props.item.id}
        defaultChecked={value}
        onChange={props.toggle} />
      <label htmlFor={props.target}>
        {props.label}
      </label>
    </div>
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
