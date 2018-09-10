import React from 'react';

const UserImage = (props) => {
  return (
    <div className='flex column user-image-wrapper'>
      <label htmlFor='fileInput'>
        <img
          id='userImage'
          className='user-image'
          src={props.image || '/images/blank-user.png'}
          alt="User Avatar" />
      </label>
      <input
        id='fileInput'
        type="file"
        name="fileInput"
        ref={props.fileRef}
        onChange={props.fileHandler}
        hidden />
    </div>
  )
}

export default UserImage;
