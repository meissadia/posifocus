import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { get } from 'lodash';

import Instructions from './Instructions';
import ListItem from './ListItem';

class List extends React.Component {
  /**
  * Transition Animation Direction can be controlled through Location's state.
  * `this.props.location.state.enter`
  */
  enterDirection = () => {
    const direction = get(this.props, 'location.state.enter', 'enter-right');
    return [this.props.className, direction].join(' ');
  }

  dummy = () => false;

  render() {
    const deepListItem = 'item-list ' + this.props.itemType;
    const totalCount = this.props.data.length;
    const itemType = this.props.itemType;

    return (
      <div className={'list-wrapper ' + this.enterDirection()}>
        {this.props.children} {/* Page Navigation */}
        <ul id='list' className={deepListItem} >
          <TransitionGroup>

            {this.props.data.map((item, index) => (
              <CSSTransition
                timeout={250}
                classNames='list-item'
                key={`${item.id}`}
              >
                <ListItem
                  item={item}
                  index={index}
                  destroyer={this.props.delete}
                  edit={this.props.edit}
                  toggle={this.props.toggle}
                  link={this.props.link}
                  makeLink={this.props.makeLink || this.dummy}
                  location={this.props.location}
                  match={this.props.match}
                  section={this.props.section}
                  totalCount={totalCount}
                  itemType={itemType}
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
