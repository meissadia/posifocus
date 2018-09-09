import React from 'react';

let Instructions = (props) => {
  if(!props.display) { return null };
  return (
    <li>
      <img
        className='instructions'
        src={`/images/${props.section}-instructions-tableview.png`}
        alt={`${props.section} instructions`}
        />
    </li>
  )
}

export default Instructions;
