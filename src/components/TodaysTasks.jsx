import React          from 'react';
import Instructions   from './Instructions';
import PageNavigation from './PageNavigation';
import ListItem       from './ListItem';
import '../css/ListViews.css'

let TodaysTasks = (props) => {
  // let tasks = props.data.filter((task) => (task.today));

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
        <Instructions section='tasks' display={props.data.length === 0} />
        { props.data.map((item, index) => (
          <ListItem
            item={item}
            delete={deleteTask}
            toggle={props.toggle}
            key={`${index}_${item.id}`}
            />
        ))}
      </ul>
    </div>
  )
}


export default TodaysTasks;
