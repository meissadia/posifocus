import React from 'react';
import Instructions   from './Instructions';
import ListItem       from './ListItem';
import Colors, {Color} from '../../lib/Colors'
import {TransitionGroup, CSSTransition} from 'react-transition-group';

let enterDirection = (props) => {
  let direction = props.location
    && props.location.state
    && props.location.state.enter
  direction = direction || 'enter-right'
  return props.className + ' ' + direction;
}

class List extends React.Component {
  calcBg = (index, total) => {
    if (this.props.itemType !== 'deep') {
      return this.props.background.alpha(1).pct(.2).str() ;
    }

    let max = total * 1.2;
    let pct = index / max;

    let { background } = this.props
    return background
      ? background.alpha(.9).pct(pct).str()
      : (new Color(0,0,0,0)).alpha(pct).str()
  }

  render(){
    let deepListItem = 'item-list ' + this.props.itemType;
    let totalCount = this.props.data.length;
    let itemType = this.props.itemType;

    return (
      // Direction can be controlled through location state
      // this.props.location.state.enter
      <div className={'list-wrapper ' + enterDirection(this.props)}>
        {this.props.children} {/* Page Navigation */}
        <ul className={deepListItem} >
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
                  bgColor={this.calcBg(index, totalCount)}
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
                bgColor={Colors.shade10.str()}
                />
            </CSSTransition>
          </TransitionGroup>
        </ul>
      </div>
    )
  }
}

export default List;
