import React from 'react';
import blankUser from '../../images/blank-user.png';
import withGlobalContext from '../GlobalContextHOC';

const UserImage = props => {
  const { functions, state } = props;
  const fileReference = React.createRef();

  /**
  /* Validates file size is under a size, given in Kilobytes.
  /* @param {Number} bytes Filesize in bytes
  /* @param {Number} limit Max Filesize allowed in bytes
  **/
  const fileSizeOk = (bytes, limit = 3000) => {
    let kbs = Math.round(bytes / 1024);
    if (kbs < limit) { return true; };

    window && window.alert(
      "\nMax File Size: 3000 KB" +
      "\nYour File: " + kbs + " KB" +
      "\n\nPlease select a smaller image!"
    );
    return false;
  }

  /**
  /* Validates size of, and loads, user avatar.
  **/
  const handleFileChange = (updateUserHeader, event) => {
    event.preventDefault();
    let file = fileReference.current.files[0]
    if (fileSizeOk(file.size)) {
      var fr = new FileReader();
      fr.onload = () => { updateUserHeader('user_image', fr.result) }
      fr.readAsDataURL(file);
    }
  }

  const { user_image } = state.userHeader;
  const update = functions.updateUserHeader;

  return (
    <div className='flex column user-image-wrapper'>
      <label htmlFor='fileInput'>
        <img
          id='userImage'
          className='user-image'
          src={user_image || blankUser}
          alt="User Avatar" />
      </label>
      <input
        id='fileInput'
        type="file"
        name="fileInput"
        ref={fileReference}
        onChange={handleFileChange.bind(null, update)}
        accept='image/*'
        hidden />
    </div>
  )
}

export default withGlobalContext(UserImage);
