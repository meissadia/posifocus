import React from 'react';
import Instructions   from './Instructions';
import ListItem       from './ListItem';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

let enterDirection = (props) => {
  let direction = props.location && props.location.state && props.location.state.enter
  direction = direction || 'enter-right'

  return props.className + ' ' + direction;
}

let style = (props) => {
  return {
    background: props.bgList
  }
}

let setHeader = (props) => {
  console.log('SET HEADER');
  console.log(style(props).background);
  let header = document.getElementById('header');
  header.style.background = style(props).background || 'white';
}

const List = (props) => (
  <div
    className={'list-wrapper ' + enterDirection(props)}
    style={style(props)}
    onLoad={setHeader.bind(this, props)}
    >
    {props.children} {/* Page Navigation */}
    <ul className='item-list'>
      <TransitionGroup>
        { props.data.map((item, index) => (
          <CSSTransition
            timeout={250}
            classNames='list-item'
            key={`${item.id}`}
            >
            <ListItem
              item={item}
              index={index}
              delete={props.delete}
              toggle={props.toggle}
              link={props.link}
              makeLink={props.makeLink}
              match={props.match}
              bgColor={props.bgItem}
              />
          </CSSTransition>
        ))}
        <CSSTransition
          timeout={250}
          classNames='list-item'
          key='instructions'
          >
          <Instructions
            section={props.section}
            src={props.instructions.icon}
            display={props.instructions.display}
            />
        </CSSTransition>
      </TransitionGroup>
    </ul>
  </div>
)

export default List;
