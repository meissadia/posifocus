import React from 'react';

export default function ListIcon(props){
  return (
    <a
      className={props.name + ' list-icon' + invert(props)}
      href={props.href}
      >
      <img
        onClick={props.onclick}
        jsvalue={props.id}
        src={props.src || `/images/${props.name}-icon.png`}
        alt={props.alt}
        />
    </a>
  )
}

const invert = (props) => props.invert ? ' invert' : '';
