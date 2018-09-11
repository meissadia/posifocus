import React from 'react';
import Toggle from 'react-toggle';
import '../css/ReactToggle.css';

export default function ToggleItem(props) {
  let value = props.item[props.target];
  if(value == null) { return null };
  return(
    <div className='toggle-item'>
      <Toggle
        id={props.target}
        name={props.item.id}
        defaultChecked={value}
        onChange={props.toggle}
        />
      <label htmlFor={props.target}>
        {props.label}
      </label>
    </div>
  )
}
