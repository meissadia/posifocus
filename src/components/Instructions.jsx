import React from 'react';

let Instructions = (props) => {
  if(!props.display) { return null };
  return (
    <li>
      <img
        className='instructions'
        src={props.src}
        alt={`${props.section} instructions`}
        />
    </li>
  )
}

export default Instructions;
