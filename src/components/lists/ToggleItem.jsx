import React  from 'react';
import Toggle from 'react-toggle';
import '../../styles/css/ReactToggle.css';

export default function ToggleItem(props) {
  let value = props.item[props.target];
  if(value == null) { return null };
  let key = props.target + '_' + props.item.id;
  return(
    <div className='toggle-item'>
      <label htmlFor={key}>
        {props.label}
      </label>
      <Toggle
        id={key}
        name={props.item.id}
        defaultChecked={value}
        onChange={props.toggle}
        />
    </div>
  )
}
