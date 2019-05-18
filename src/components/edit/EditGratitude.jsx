import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/FormView.css';
import { parseDate, dateInputDefault } from '../../lib/FormHelpers';
import withGlobalContext from '../GlobalContextHOC';
import PageNavigation from '../PageNavigation';

/**
 * Dialog to update a Gratitude
 * @param {Object} props 
 */
const EditGratitude = props => {
  const { getSingle, updateSingle } = props.functions;
  const currentItem = getSingle('gratitudes', props.gid) || {};
  /**
   * Update state with changes
   * @param {String} itemId 
   * @param {Function} update 
   * @param {Event} event 
   */
  const save = (itemId, update, event) => {
    event.preventDefault();
    const { title, content, date } = document.gform;
    const edited = {
      id: itemId,
      title: title.value || title.attributes.placeholder.value,
      content: content.value || content.attributes.placeholder.value,
      date: parseDate(date.value)
    };

    update('gratitudes', edited);
    props.history.push({
      pathname: cancelLink(),
      state: { enter: 'enter-left' }
    });
  };

  const cancelLink = () => '/gratitudes';

  return (
    <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
      <PageNavigation
        back={['/', 'Dashboard']}
        title='Edit Gratitude'
        add={[{ pathname: cancelLink(), state: { enter: 'enter-bottom' } }, '< Cancel >']}
      />
      <form
        name='gform'
        className='g-form'
        onSubmit={save.bind(null, currentItem.id, updateSingle)}
      >
        <label htmlFor="title" className='center'>
          What Are You Grateful For Today?
              </label>
        <input
          type="text"
          name="title"
          autoComplete="off"
          placeholder="Family / Clean Water / etc..."
          defaultValue={currentItem.title}
        />
        <label htmlFor='content'>Notes:</label>
        <textarea
          name="content"
          placeholder="My kids surprised me today by..."
          defaultValue={currentItem.content}
        />
        <label htmlFor='date-input'>Date:</label>
        <input
          id='date-input'
          type="date"
          name="date"
          defaultValue={dateInputDefault(currentItem.date)}
        />
        <input id='submit-button' type="submit" name="submit" value="Save" />
      </form>
    </div>
  );
};

export default withRouter(withGlobalContext(EditGratitude));
