import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/FormView.css';
import { parseDate, dateInputDefault } from '../../lib/FormHelpers';
import withGlobalContext from '../GlobalContextHOC';
import { InputFormPageNav } from '../InputFormPageNav';
import calIcon from '../../images/calendar-icon.png';

const NewGratitude = props => {
  const { functions } = props;

  const handleNewGratitude = (add, event) => {
    event.preventDefault();
    const date = new Date();

    const new_gratitude = {
      id: date.getTime().toString(),
      title: document.gform.title.value || document.gform.title.attributes.placeholder.value,
      content: document.gform.content.value || document.gform.content.attributes.placeholder.value,
      date: parseDate(document.gform.date.value)
    }

    add('gratitudes', new_gratitude);
    props.history.push({
      pathname: cancelLink(),
      state: { enter: 'enter-left' }
    });
  }

  const cancelLink = () => '/gratitudes';

  const onSubmitHandler = handleNewGratitude.bind(null, functions.addToStateArray);

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
        />
        <div id='notes-date-bar'>
          <label htmlFor='content'>Notes:</label>
          <label htmlFor='date-input'><img id='calIcon' src={calIcon} alt='date picker' /></label>
        </div>
        <input
          id='date-input'
          type="date"
          name="date"
          defaultValue={dateInputDefault()}
        />
        <textarea
          className='content'
          name="content"
          placeholder="My kids surprised me today by..."
        />

        <div id='submit-button' onClick={onSubmitHandler}>Save</div>

      </form>
    </div>
  );
};

export default withRouter(withGlobalContext(NewGratitude));
