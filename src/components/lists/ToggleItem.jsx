import React from 'react';
import Toggle from 'react-toggle';
import '../../styles/scss/ReactToggle.sass';

const ToggleItem = props => {
  const { item, target, toggle, label } = props;
  const value = item[target];
  const key = target + '_' + item.id;

  /**
   *  Check for `undefined`, instead of `!value` 
   *  since value can equal `false`. 
   **/
  if (value === undefined) return null;

  return (
    <div className='toggle-item'>
      <label htmlFor={key}>
        {label}
      </label>
      <Toggle
        id={key}
        name={item.id}
        defaultChecked={value}
        onChange={toggle}
      />
    </div>
  );
};

export default ToggleItem;
