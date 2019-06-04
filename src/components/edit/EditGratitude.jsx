import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/FormView.css';
import { parseDate, dateInputDefault } from '../../lib/FormHelpers';
import withGlobalContext from '../GlobalContextHOC';
import { InputFormPageNav } from '../InputFormPageNav';
import calIcon from '../../images/calendar-icon.png';

/**
 * Dialog to update a Gratitude
 * @param {Object} props 
 */
const EditGratitude = props => {
  const { getSingle, updateSingle } = props.functions;
  const currentItem = getSingle('gratitudes', props.urlParams.gratitudes) || {};

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

  const onSubmitHandler = save.bind(null, currentItem.id, updateSingle);

  return (
    <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
      <InputFormPageNav pathname={cancelLink()} />
      <form
        name='gform'
        className='g-form'
        onSubmit={onSubmitHandler}
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
        <div id='notes-date-bar'>
          <label htmlFor='content'>Notes:</label>
          <label htmlFor='date-input'><img id='calIcon' src={calIcon} alt='date picker' /></label>
        </div>
        <input
          id='date-input'
          type="date"
          name="date"
          defaultValue={dateInputDefault(currentItem.date)}
        />
        <textarea
          name="content"
          className="content"
          placeholder="My kids surprised me today by..."
          defaultValue={currentItem.content}
        />
        <div id='submit-button' onClick={onSubmitHandler}>Save</div>
      </form>
    </div>
  );
};

export default withRouter(withGlobalContext(EditGratitude));
