import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { get } from 'lodash';

import { parseUrl } from '../../lib/Helpers';
import { GlobalContext } from '../App';
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

/**
 * HOC to reuse List logic
 * @param {Component} WrappedComponent 
 * @param {FUnction} selectData Read data from GlobalContext.state
 */
export const ListHOC = (WrappedComponent, sectionTitle) => {
  return class extends React.Component {
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
                urlParams={parseUrl(location.pathname)}
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
