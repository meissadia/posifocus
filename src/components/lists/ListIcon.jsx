import React from 'react';

export default function ListIcon(props){
  return (
    <a
      className={props.name + ' list-icon' + invert(props)}
      onClick={props.onclick}
      href={props.href}
      >
      <img
        jsvalue={props.id}
        src={props.src || `/images/${props.name}-icon.png`}
        alt={props.alt}
        />
    </a>
  )
}

const invert = (props) => props.invert ? ' invert' : '';
