import React from 'react';
import '../../styles/css/StatBar.css';
import { GlobalContext } from '../App';

const calcStats = state => {
  const gratitudeCount = state.gratitudes.length;
  const doneTaskCount = state.tasks.filter((t) => (t.done)).length;
  const lastContact = daysSinceContact(state.contacts);

  return [gratitudeCount, doneTaskCount, lastContact];
}

const StatBlock = (props) => (
  <div>
    <ul className='stat-block'>
      <li className='stat-block-line'><span>{props.count}</span></li>
      <li className='stat-block-line'>{props.line1}</li>
      <li className='stat-block-line'>{props.line2}</li>
    </ul>
  </div>
)

/**
 * Display User Statistics
 */
const StatBar = () => (
  <GlobalContext.Consumer>
    {({ state }) => {
      const [ gratitudeCount, doneTaskCount, lastContact ] = calcStats(state);
      return (
        <section className='stat-bar'>
          <StatBlock
            count={gratitudeCount}
            line1='GRATITUDES'
            line2='LISTED' />
          <StatBlock
            count={doneTaskCount}
            line1='TASKS'
            line2='COMPLETED' />
          <StatBlock
            count={lastContact}
            line1='DAYS SINCE'
            line2='LAST CONTACT' />
        </section>
      )
    }}
  </GlobalContext.Consumer>
);

/**
/* Adapted from:
/* https://www.htmlgoodies.com/html5/javascript/calculating-the-difference-between-two-dates-in-javascript.html
**/
Date.daysBetween = function (date1, date2) {
  var one_day_ms = 1000 * 60 * 60 * 24;
  var difference_ms = date2.getTime() - date1.getTime();
  return Math.round(difference_ms / one_day_ms); // Convert back to days and return
}

let daysSinceContact = (contacts) => {
  let date = new Date(0);
  let originalTime = date.getTime();
  contacts.forEach((contact) => {
    let c_date = new Date(contact.date.split('(')[0]);
    if (c_date.getTime() > date.getTime()) {
      date = c_date;
    }
  })
  if (date.getTime() === originalTime) { return '∞' };
  let now = new Date();
  let diff = Date.daysBetween(date, now);
  return diff;
}


StatBar.contextType = GlobalContext;

export default StatBar;