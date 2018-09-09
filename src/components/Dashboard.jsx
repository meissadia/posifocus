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
        gratitudeCount={props.gratitudes.length}
        contacts={props.contacts}
        tasks={props.tasks}
        />
      <MainMenu
        reset={props.resetState}
        projects={props.projects}
        tasks={props.tasks}
        />
    </div>
  )
}
