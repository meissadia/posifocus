import React from 'react';

export default function MenuItemIcon(props){
  if(!props.icon) { return null };
  return (
    <img
      className='menu-item-icon'
      src={props.icon}
      alt={props.title + ' Icon'}
      />
  )
}
