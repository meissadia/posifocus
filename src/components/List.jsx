import React from 'react';
import Instructions   from './Instructions';
import ListItem       from './ListItem';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

let enterDirection = (props) => {
  let direction = props.location && props.location.state && props.location.state.enter
  direction = direction || 'enter-right'
  return props.className + ' ' + direction;
}

let calcBg = (index, total, type) => {
  if (type !== 'deep') { return null };
  let max = total * 1.2;
  let pct = index / max;
  return `rgba(0, 0, 0, ${pct})`;
}

class List extends React.Component {
  componentDidMount() {
    this.props.setBackground(this.props.section);
  }

  render(){
    let deepListItem = 'item-list ' + this.props.deepListItem;
    let totalCount = this.props.data.length;
    let itemType = this.props.itemType;

    return (
      <div className={'list-wrapper ' + enterDirection(this.props)}>
        {this.props.children} {/* Page Navigation */}
        <ul className={deepListItem}>
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
                  bgColor={calcBg(index, totalCount, itemType)}
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
