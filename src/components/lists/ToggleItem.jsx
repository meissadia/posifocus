import React  from 'react';
import Toggle from 'react-toggle';
import '../../css/ReactToggle.sass';

export default function ToggleItem(props) {
  let value = props.item[props.target];
  if(value == null) { return null };
  let key = props.target + '_' + props.item.id;
  return(
    <div className='toggle-item'>
      <Toggle
        id={key}
        name={props.item.id}
        defaultChecked={value}
        onChange={props.toggle}
        />
      <label htmlFor={key}>
        {props.label}
      </label>
    </div>
  )
}
