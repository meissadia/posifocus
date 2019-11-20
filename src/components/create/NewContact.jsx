import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/scss/FormView.sass';
import { parseDate, dateInputDefault } from '../../lib/FormHelpers';
import { withGlobalContext } from '../GlobalContextHOC';
import { InputFormPageNav } from '../InputFormPageNav';
import calIcon from '../../images/calendar-icon.png'

const NewContact = props => {
  const { functions, urlParams } = props;

  const handleAddContact = (add, event) => {
    event.preventDefault();
    const date = new Date();

    const new_contact = {
      id: date.getTime().toString(),
      relationship: document.gform.relationship.value,
      title: document.gform.title.value || document.gform.title.attributes.placeholder.value,
      content: document.gform.content.value || document.gform.content.attributes.placeholder.value,
      date: parseDate(document.gform.date.value)
    }

    add('contacts', new_contact);
    props.history.push(cancelLink(document.gform.url.value));
  }

  const cancelLink = url => url.split('/').slice(0, -1).join('/') || '/';;

  const onSubmitHandler = handleAddContact.bind(null, functions.addToStateArray);

  return (
    <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
      <InputFormPageNav pathname={cancelLink(urlParams.url)} />
      <form
        name='gform'
        className='g-form'
        onSubmit={onSubmitHandler}
      >
        <label htmlFor="title" className='center'>
          What was the Last Contact you had with this Person?
              </label>
        <input
          type="text"
          name="title"
          autoComplete="off"
          placeholder="Call/Text/Email/Lunch..."
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
          className="content"
          name="content"
          placeholder="Making plans to meet up this weekend.."
        />
        <input name="relationship" value={urlParams.relationship} hidden readOnly />
        <input name="url" value={urlParams.url} hidden readOnly />
        <div id='submit-button' onClick={onSubmitHandler}>Save</div>
      </form>
    </div>
  )
};

export default withRouter(withGlobalContext(NewContact));
