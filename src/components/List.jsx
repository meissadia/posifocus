import React from 'react';
import Instructions   from './Instructions';
import ListItem       from './ListItem';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

let enterDirection = (props) => {
  let direction = props.location && props.location.state && props.location.state.enter
  direction = direction || 'enter-right'
  return props.className + ' ' + direction;
}

class List extends React.Component {
  componentDidMount() {
    this.props.setBackground(this.props.background);
  }

  render(){
    return (
      <div className={'list-wrapper ' + enterDirection(this.props)}>
        {this.props.children} {/* Page Navigation */}
        <ul className='item-list'>
          <TransitionGroup>
            { this.props.data.map((item, index) => (
              <CSSTransition
                timeout={250}
                classNames='list-item'
                key={`${item.id}`}
                >
                <ListItem
                  item={item}
                  index={index}
                  delete={this.props.delete}
                  toggle={this.props.toggle}
                  link={this.props.link}
                  makeLink={this.props.makeLink}
                  match={this.props.match}
                  bgColor={this.props.bgItem}
                  />
              </CSSTransition>
            ))}
            <CSSTransition
              timeout={250}
              classNames='list-item'
              key='instructions'
              >
              <Instructions
                section={this.props.section}
                src={this.props.instructions.icon}
                display={this.props.instructions.display}
                />
            </CSSTransition>
          </TransitionGroup>
        </ul>
      </div>
    )
  }
}

export default List;
