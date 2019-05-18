import React from 'react';
import withGlobalContext from '../GlobalContextHOC';

/**
 * Updates and displays User's Name and Tagline
 */
const UserText = props => {
  const { state, functions } = props;
  const defaultTagline = 'Catchphrase, Slogan, or Inspirational Quote';
  const defaultUsername = 'FirstName LastName';
  const { user_name, user_tagline } = state.userHeader;
  const update = functions.updateUserHeader;

  /**
   * Notify of change via update()
   * @param {Function} update 
   * @param {Event} event 
   */
  const handleInputChange = (update, event) => {
    event.preventDefault();
    update(event.target.name, event.target.value);
  }

  return (
    <div id='userText' className='flex column user-text'>
      <input
        className='user-name'
        type="text"
        name="user_name"
        value={user_name}
        placeholder={defaultUsername}
        onChange={handleInputChange.bind(null, update)} />
      <textarea
        cols='30'
        rows='3'
        className='user-tagline'
        name="user_tagline"
        value={user_tagline}
        placeholder={defaultTagline}
        onChange={handleInputChange.bind(null, update)} />
    </div>
  );

}

export default withGlobalContext(UserText);
