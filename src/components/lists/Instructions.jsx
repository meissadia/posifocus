import React, { useEffect } from 'react';
import Colors from '../../lib/Colors';
import relationshipsIcon from '../../images/relationships.svg';
import gratitudesIcon from '../../images/gratitudes@2x.png';
import prioritiesIcon from '../../images/priorities@2x.png';
import tasksIcon from '../../images/tasks.svg';
import projectsIcon from '../../images/projects.svg';
import contactsIcon from '../../images/chat.svg';

import $ from 'jquery';

const GratitudesInstructions = props => (
  <div id='instructions' className={`instructions ${props.section}`}  >
    <img src={gratitudesIcon} alt='' />
    <p className='description'>
      Gratitudes are specific things in your life that you are grateful for, along with details that will remind you of how blessed you are.
      </p>
    <h3 className='title'>
      Sample Gratitudes
    </h3>
    <ul className='examples'>
      <li>My Beautiful Wife</li>
      <li>Clean Air</li>
      <li>Great Coworkers</li>
      <li>Strong Back</li>
      <li>New Shoes</li>
    </ul>
  </div>
);

const PrioritiesInstructions = props => (
  <div id='instructions' className={`instructions ${props.section}`}  >
    <img src={prioritiesIcon} alt='' />
    <p className='description'>
      Priorities are the major aspects of your life that deserve the overwhelming majority of your focus and energy.
      </p>
    <h3 className='title'>
      Sample Priorities
    </h3>
    <ul className='examples'>
      <li>Spirituality / Faith</li>
      <li>Family</li>
      <li>Friends</li>
      <li>Health</li>
      <li>Business / Work</li>
    </ul>
  </div>
);

const ProjectsInstructions = props => (
  <div id='instructions' className={`instructions ${props.section}`}  >
    <img src={projectsIcon} alt='' />
    <p className='description'>
      Projects are collections of tasks that are directly related to this priority.
      </p>
    <h3 className='title'>
      Sample Projects
    </h3>
    <ul className='examples'>
      <li>Sunday Dinner</li>
      <li>Camping Trip</li>
      <li>Build Swingset</li>
      <li>Movie Night</li>
      <li>10-Mile Hike</li>
    </ul>
  </div>
);

const TasksInstructions = props => (
  <div id='instructions' className={`instructions ${props.section}`}  >
    <img src={tasksIcon} alt='' />
    <p className='description'>
      Tasks are specific actions that will move you towards completing this project.
      </p>
    <h3 className='title'>
      Sample Tasks
    </h3>
    <ul className='examples'>
      <li>Marinate Flank Steak</li>
      <li>Reserve Campground</li>
      <li>Purchase Lumber</li>
      <li>Order Concert Tickets</li>
      <li>Don't Forget the Trailmix!</li>
    </ul>
  </div>
);

const RelationshipsInstructions = props => (
  <div id='instructions' className={`instructions ${props.section}`}  >
    <img src={relationshipsIcon} alt='' />
    <p className='description'>
      Relationships are specific people who you want to be in closer contact with and build stronger bonds with.
      </p>
    <h3 className='title'>
      Sample Relationships
    </h3>
    <ul className='examples'>
      <li>Parents</li>
      <li>Siblings</li>
      <li>Old Friends</li>
      <li>Mentor / Mentee</li>
      <li>Business Associates</li>
    </ul>
  </div>
);

const ContactsInstructions = props => (
  <div id='instructions' className={`instructions ${props.section}`}  >
    <img src={contactsIcon} className='invert' alt='' />
    <p className='description'>
      Contacts are specific actions you took, or encounters you had, that moved your relationship forward.
      </p>
    <h3 className='title'>
      Sample Contacts
    </h3>
    <ul className='examples'>
      <li>Sent Mom Flowers</li>
      <li>Texted Brother</li>
      <li>Called Old Friend</li>
      <li>Lunch with Cousin</li>
      <li>Drinks with Coworker</li>
    </ul>
  </div>
);

const Instructions = props => {
  const { section, display, bgColor } = props;

  // FIXME: Workaround to animate Instruction on-enter
  useEffect(() => {
    $('#instructions').animate({
      opacity: 1,
      height: '100%'
    })
  })

  if (!display) return null;

  const thatThingWeWant = sectionIcon(section);
  if (!(typeof thatThingWeWant === 'string'))
    return thatThingWeWant

  return (
    <li
      className={`instructions ${section}`}
      style={{ background: bgColor }}>
      <img
        className='instruction-image'
        src={thatThingWeWant}
        alt={`${section} instructions`}
      />
    </li>
  )
}

Instructions.defaultProps = {
  bgColor: Colors.shade10.str(),
};

const sectionIcon = section => {
  switch (section) {
    case 'gratitudes':
      return <GratitudesInstructions section={section} />;
    case 'contacts':
      return <ContactsInstructions section={section} />;
    case 'relationships':
      return <RelationshipsInstructions section={section} />;
    case 'tasks':
    case 'todays':
      return <TasksInstructions section={section} />;
    case 'priorities':
      return <PrioritiesInstructions section={section} />;
    case 'projects':
      return <ProjectsInstructions section={section} />;
    default:
  }
}

export default Instructions;