import React       from 'react';
import { NavLink } from 'react-router-dom';
import ListIcon    from './ListIcon';
import ToggleItem  from './ToggleItem';
import editIcon    from '../../images/edit.svg';
import deleteIcon  from '../../images/delete.svg';

function ListItem(props) {
  let item = props.item;
  let match = props.match
  let cname = 'list-item ' + props.itemType;
  if(props.item.done) { cname += ' done'};
  if(props.item.today) { cname += ' today'};
  let item_link = props.link || (props.makeLink && props.makeLink(item, match));
  return (
    <li className={cname} style={style(props)}>
      <div className='list-item-content'>
        <ItemField target={'title'} item={item} link={item_link}/>
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
        <DateField date={item.date} />
      </div>
      <div className='list-item-actions'>
        <ListIcon name='edit' invert={true} href='#' id={item.id} alt='Pencil' src={editIcon} onclick={(event) => {event.preventDefault()}}/>
        <ListIcon name='delete' invert={true} onclick={props.delete} id={item.id} alt='Trashcan' src={deleteIcon}/>
      </div>
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

  if(props.link) {
    value = (
      <div className='link'>
        <div className='value'>{value}</div>
      </div>
    );
  }

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

function style(props){
  return {
    background: props.bgColor,
  }
}

export default ListItem;
