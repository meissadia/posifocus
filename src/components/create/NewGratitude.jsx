import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/FormView.css';
import { parseDate, dateInputDefault } from '../../lib/FormHelpers';
import withGlobalContext from '../GlobalContextHOC';
import { InputFormPageNav } from '../InputFormPageNav';

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

  return (
    <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
      <InputFormPageNav pathname={cancelLink()} />
      <form
        name='gform'
        className='g-form'
        onSubmit={handleNewGratitude.bind(null, functions.addToStateArray)}
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
        <label htmlFor='content'>Notes:</label>
        <textarea
          name="content"
          placeholder="My kids surprised me today by..."
        />
        <label htmlFor='date-input'>Date:</label>
        <input
          id='date-input'
          type="date"
          name="date"
          defaultValue={dateInputDefault()}
        />
        <input id='submit-button' type="submit" name="submit" value="Save" />
      </form>
    </div>
  );
};

export default withRouter(withGlobalContext(NewGratitude));
