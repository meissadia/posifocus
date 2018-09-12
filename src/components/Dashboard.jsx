import React      from 'react';
import UserHeader from './UserHeader';
import StatBar    from './StatBar';
import MainMenu   from './MainMenu';

export default function Dashboard(props){
  return (
    <div>
      <UserHeader
        data={props.userHeader}
        updateUserHeader={props.updateUserHeader}
        />
      <StatBar
        gratitudeCount={props.gratitudeCount}
        contacts={props.contacts}
        doneTaskCount={props.doneTaskCount}
        />
      <MainMenu
        reset={props.resetState}
        projectCount={props.projectCount}
        taskCount={props.taskCount}
        />
    </div>
  )
}
