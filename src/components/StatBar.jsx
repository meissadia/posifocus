import React from 'react';
import '../css/StatBar.css';

/**
/* adapted from https://www.htmlgoodies.com/html5/javascript/calculating-the-difference-between-two-dates-in-javascript.html
**/
Date.daysBetween = function( date1, date2 ) {
  var one_day_ms=1000*60*60*24;
  var difference_ms = date2.getTime() - date1.getTime();
  return Math.round(difference_ms/one_day_ms); // Convert back to days and return
}

let doneTaskCount = (tasks) => {
  return tasks.filter((t) => (t.done)).length;
}

let daysSinceContact = (contacts) => {
  let date = new Date(0);
  let originalTime = date.getTime();
  contacts.forEach((contact) => {
    let c_date = new Date(contact.date.split('(')[0]);
    if(c_date.getTime() > date.getTime() ){
      date = c_date;
    }
  })
  if(date.getTime() == originalTime) { return '∞' };
  let now = new Date();
  let diff = Date.daysBetween(date, now);
  return diff;
}

let StatBlock = (props) => (
  <div>
    <ul className='stat-block'>
      <li className='stat-block-line'><span>{props.count}</span></li>
      <li className='stat-block-line'>{props.line1}</li>
      <li className='stat-block-line'>{props.line2}</li>
    </ul>
  </div>
)

let StatBar = (props) => {
  return (
    <section className='stat-bar'>
      <StatBlock
        count={props.gratitudeCount}
        line1='Gratitudes'
        line2='Listed' />
      <StatBlock
        count={doneTaskCount(props.tasks)}
        line1='Tasks'
        line2='Completed' />
      <StatBlock
        count={daysSinceContact(props.contacts)}
        line1='Days Since'
        line2='Last Contact' />

    </section>
  )
}


export default StatBar;
