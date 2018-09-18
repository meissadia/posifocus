import React from 'react';

const UserText = (props) => {
  var defaultTagline = 'Catchphrase, Slogan, or Inspirational Quote';
  var defaultUsername = 'FirstName LastName';

  return (
    <div className='flex column user-text'>
      <input
        className='user-name'
        type="text"
        name="user_name"
        value={props.name}
        placeholder={defaultUsername}
        onChange={props.inputHandler} />
      <textarea
        cols='30'
        rows='3'
        className='user-tagline'
        name="user_tagline"
        value={props.tagline}
        placeholder={defaultTagline}
        onChange={props.inputHandler} />
      </div>
    )
  }

  export default UserText;
