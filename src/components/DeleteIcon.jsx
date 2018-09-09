import React from 'react';

export default function DeleteIcon(props){
  return (
    <a className='delete' onClick={props.delete} >
      <img
        jsvalue={props.id}
        src="/images/delete-icon.png"
        alt="Trashcan"
        />
    </a>
  )
}
