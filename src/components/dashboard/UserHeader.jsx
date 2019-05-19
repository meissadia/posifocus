import React from 'react';
import '../../styles/css/UserHeader.css';
import UserImage from './UserImage';
import UserText from './UserText';

/**
 * Displays User Avatar, Name, and Tagline
 */
const UserHeader = () => (
  <section id='user-header'>
    <UserImage />
    <UserText />
  </section>
)

export default UserHeader;