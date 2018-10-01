import React from 'react';
import gratitudesIcon from '../../images/gratitudes-instructions-tableview.png';
import contactsIcon from '../../images/contacts-instructions-tableview.png';
import relationshipsIcon from '../../images/relationships-instructions-tableview.png';
import tasksIcon from '../../images/tasks-instructions-tableview.png';
import prioritiesIcon from '../../images/priorities-instructions-tableview.png';
import projectsIcon from '../../images/projects-instructions-tableview.png';

let Instructions = (props) => {
  if(!props.display) { return null };
  return (
    <li className='instructions' style={bgcolor(props)}>
      <img
        className='instruction-image'
        src={sectionIcon(props.section)}
        alt={`${props.section} instructions`}
        />
    </li>
  )
}

let sectionIcon = (section) => {
  switch (section) {
    case 'gratitudes':
      return gratitudesIcon;
    case 'contacts':
      return contactsIcon;
    case 'relationships':
      return relationshipsIcon;
    case 'tasks':
    case 'todays':
      return tasksIcon;
    case 'priorities':
      return prioritiesIcon;
    case 'projects':
      return projectsIcon;
    default:

  }
}

let bgcolor = (props) => ({
  background: props.bgColor
})

export default Instructions;
