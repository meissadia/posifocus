import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/FormView.css';
import withGlobalContext from '../GlobalContextHOC';
import PageNavigation from '../PageNavigation';

const EditRelationship = props => {
  const section = 'relationships';
  const { functions, urlParams } = props;
  const { getSingle, updateSingle } = functions;
  const currentItem = getSingle(section, urlParams.relationships) || {};

  const save = (item, update, event) => {
    event.preventDefault();
    const title = document.gform.title;
    const edited = {
      id: item.id,
      title: title.value || title.attributes.placeholder.value,
      date: item.date
    }

    update(section, edited);
    props.history.push(cancelLink(item));
  }

  const cancelLink = () => `/${section}`;

  return (
    <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
      <PageNavigation
        back={['/', 'Dashboard']}
        title='Edit Relationship'
        add={[{ pathname: cancelLink(), state: { enter: 'enter-bottom' } }, '< Cancel >']}
      />
      <form
        name='gform'
        className='g-form'
        onSubmit={save.bind(null, currentItem, updateSingle)}
      >
        <label htmlFor="title" className='center'>
          Who Do You Want To Build A Better Relationship With?
            </label>
        <input
          type="text"
          name="title"
          autoComplete="off"
          placeholder="My Brother"
          defaultValue={currentItem.title}
        />
        <input id='submit-button' type="submit" name="submit" value="Save" />
      </form>
    </div>
  );
};

export default withRouter(withGlobalContext(EditRelationship));
