import React from 'react';
import blankUser from '../../images/blank-user.png';

const UserImage = (props) => {
  return (
    <div className='flex column user-image-wrapper'>
      <label htmlFor='fileInput'>
        <img
          id='userImage'
          className='user-image'
          src={props.image || blankUser}
          alt="User Avatar" />
      </label>
      <input
        id='fileInput'
        type="file"
        name="fileInput"
        ref={props.fileRef}
        onChange={props.fileHandler}
        accept='image/*'
        hidden />
    </div>
  )
}

export default UserImage;