import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/FormView.css';
import { parseDate, dateInputDefault } from '../../lib/FormHelpers';
import PageNavigation from '../PageNavigation';
import { withGlobalContext } from '../GlobalContextHOC';

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
  const backLink = url => url.split('/').slice(0, -3).join('/') + 's';


  return (
    <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
      <PageNavigation
        back={[backLink(urlParams.url), 'Relationships']}
        title='New Contact'
        add={[{ pathname: cancelLink(urlParams.url), state: { enter: 'enter-left' } }, '< Cancel >']}
      />
      <form
        name='gform'
        className='g-form'
        onSubmit={handleAddContact.bind(null, functions.addToStateArray)}
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
        <label htmlFor='content'>Notes:</label>
        <textarea
          name="content"
          placeholder="Making plans to meet up this weekend.."
        />
        <label htmlFor='date-input'>Date:</label>
        <input
          id='date-input'
          type="date"
          name="date"
          defaultValue={dateInputDefault()}
        />
        <input name="relationship" value={urlParams.relationship} hidden readOnly />
        <input name="url" value={urlParams.url} hidden readOnly />
        <input id='submit-button' type="submit" name="submit" value="Save" />
      </form>
    </div>
  )
};

export default withRouter(withGlobalContext(NewContact));
