import React from 'react';

let Instructions = (props) => {
  return (
    <li>
      <img
        className='instructions'
        src={`/images/${props.section}-instructions-tableview.png`}
        alt='Instructions' />
    </li>
  )
}

export default Instructions;
