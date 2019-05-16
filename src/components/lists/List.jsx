import React from 'react';
import Instructions from './Instructions';
import ListItem from './ListItem';
import Colors, { Color } from '../../lib/Colors'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { GlobalContext } from '../App';

let enterDirection = (props) => {
  let direction = props.location
    && props.location.state
    && props.location.state.enter
  direction = direction || 'enter-right'
  return props.className + ' ' + direction;
}

class List extends React.Component {
  calcBg = (index, total) => {
    if (this.props.itemType === 'shallow') {
      return this.props.background.alpha(1).pct(.2).str();
    }

    let max = total * 1.2;
    let pct = index / max;

    let { background } = this.props
    return background
      ? background.alpha(.9).pct(pct).str()
      : (new Color(0, 0, 0, 0)).alpha(pct).str()
  }

  render() {
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

            {this.props.data.map((item, index) => (
              <CSSTransition
                timeout={250}
                classNames='list-item'
                key={`${item.id}`}
              >
                <ListItem
                  item={item}
                  index={index}
                  delete={this.props.delete}
                  edit={this.props.edit}
                  toggle={this.props.toggle}
                  link={this.props.link}
                  makeLink={this.props.makeLink}
                  location={this.props.location}
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

/**
 * HOC to reuse List logic
 * @param {Component} WrappedComponent 
 * @param {FUnction} selectData Read data from GlobalContext.state
 */
export const ListHOC = (WrappedComponent, sectionTitle) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
    };

    destroy = (destroyer, event) => {
      event.preventDefault();
      destroyer(event.target.attributes.jsvalue.value);
    };

    showEditor = (event) => {
      const id = event.target.attributes.jsvalue.value;
      this.props.history.push(`${this.props.location.pathname}/${id}/edit`);
    };

    back = () => this.props.history.pop();

    titleMapper = title => (title === 'todays' ? 'tasks' : title);

    render = () => {
      return (
        <GlobalContext.Consumer>
          {({ state, functions, location }) => {
            return (
              <WrappedComponent
                data={state[this.titleMapper(sectionTitle)]}
                destroy={this.destroy.bind(null, functions.deleteFromStateArray.bind(null, sectionTitle))}
                functions={functions}
                globalLocation={location}
                sectionTitle={sectionTitle}
                showEditor={this.showEditor}
                isNew={props => props.location.pathname.includes('new')}
                isEdit={props => props.location.pathname.includes('edit')}
                back={this.back}
                {...this.props}
              />
            )
          }}
        </GlobalContext.Consumer>
      );
    };
  };
};

export default List;
