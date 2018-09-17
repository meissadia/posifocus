import React        from 'react';
import UserHeader   from './UserHeader';
import StatBar      from './StatBar';
import MainMenu     from './MainMenu';
import Version      from './Version'

export default function Dashboard(props){
  return (
    <div className='route-transition enter-left exit-left'>
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
      <Version />
    </div>
  )
}
