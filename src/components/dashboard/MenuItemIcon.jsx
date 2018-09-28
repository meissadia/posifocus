import React from 'react';

export default function MenuItemIcon(props){
  if(!props.icon) { return null };
  let cname = 'menu-item-icon';
  if(props.invert){ cname += ' invert'}
  return (
    <img
      className={cname}
      src={props.icon}
      alt={props.title + ' Icon'}
      />
  )
}
