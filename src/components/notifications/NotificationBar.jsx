import React, {Fragment} from 'react';
import AppOffline       from './AppOffline';
import UpdateAvailable  from './UpdateAvailable';
import '../../styles/css/Notifications.css';

const NotificationBar = props => (
  <Fragment>
    <AppOffline online={props.online} />
    <UpdateAvailable
      online={props.online}
      update={props.update}
      autoUpdate={props.autoUpdate}/>
  </Fragment>
)

export default NotificationBar;
