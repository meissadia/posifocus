import React from 'react';
import Instructions from './Instructions';
import PageNavigation from './PageNavigation';
import ListItem from './ListItem';
import '../css/ListViews.css'

let Projects = (props) => {
  let showInstructions = props.data.length === 0;

  let deleteProject = (event) => {
    event.preventDefault();
    props.delete(event.target.attributes.jsvalue.value);
  }

  let navTitle = () => {
    if(props.parent) { return props.parent.title + ' Projects' }
    return 'Projects'
  }

  return (
    <div className='list-wrapper'>
      <PageNavigation
        back={['/priorities', 'Priorities']}
        title={navTitle()}
        add={[`${props.match.url}/new`, 'Add']}
        />

      <ul className='item-list'>
        <Instructions section='projects' display={showInstructions} />
        { props.data.map((item, index) => (
          <ListItem
            item={item}
            delete={deleteProject}
            link={`${props.match.url.slice(0,-1)}/${item.id}/tasks`}
            key={`${index}_${item.id}`}
            />
        ))}
      </ul>
    </div>
  )
}

export default Projects;
