import React, {Fragment} from 'react';
import AppOffline       from './AppOffline';
import UpdateAvailable  from './UpdateAvailable';
import '../../css/Notifications.css';

const NotificationBar = props => (
  <Fragment>
    <AppOffline online={props.online} />
    <UpdateAvailable online={props.online} update={props.update} />
  </Fragment>
)

export default NotificationBar;
