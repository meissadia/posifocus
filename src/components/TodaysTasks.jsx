import React from 'react';
import Instructions from './Instructions';
import PageNavigation from './PageNavigation';
import ListItem from './ListItem';
import '../css/ListViews.css'

let TodaysTasks = (props) => {
  let showInstructions = props.data.length === 0;

  var deleteTask = (event) => {
    event.preventDefault();
    props.delete('tasks', event.target.attributes.jsvalue.value);
  }

  return (
    <div className='list-wrapper'>
      <PageNavigation
        back={['/', 'Dashboard']}
        title="Today's Tasks"
        />

      <ul className='item-list'>
        <Instructions section='contacts' display={showInstructions} />
        { props.data.filter((task) => (task.today)).map((item, index) => (
          <ListItem
            item={item}
            delete={deleteTask}
            key={`${index}_${item.id}`}
            />
        ))}
      </ul>
    </div>
  )
}


export default TodaysTasks;
