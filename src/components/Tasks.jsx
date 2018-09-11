import React          from 'react';
import Instructions   from './Instructions';
import PageNavigation from './PageNavigation';
import ListItem       from './ListItem';
import '../css/ListViews.css'

let Tasks = (props) => {
  let showInstructions = props.data.length === 0;

  var deleteTask = (event) => {
    event.preventDefault();
    props.delete('tasks', event.target.attributes.jsvalue.value);
  }

  let navTitle = () => {
    let val = 'Tasks';
    if(props.project) { return props.project.title + ' Tasks' }
    return val;
  }

  let navBackText = () => {
    if(props.priority) { return props.priority.title }
    return 'Projects'
  }

  let navBackLink = () => {
    return props.match.url.split('/').slice(0,-2).join('/') + 's'
  }

  return (
    <div className='list-wrapper'>
      <PageNavigation
        back={[navBackLink(), navBackText()]}
        title={navTitle()}
        add={[`${props.match.url}/new`]}
        />

      <ul className='item-list'>
        <Instructions section='priorities' display={showInstructions} />
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


export default Tasks;
