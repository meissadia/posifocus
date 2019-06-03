import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../styles/css/FormView.css';
import { parseDate, dateInputDefault } from '../../lib/FormHelpers';
import withGlobalContext from '../GlobalContextHOC';
import { InputFormPageNav } from '../InputFormPageNav';

const EditContact = props => {
  const section = 'contacts';
  const { functions, urlParams } = props;
  const { getSingle, updateSingle } = functions;
  const currentItem = getSingle(section, urlParams.contacts) || {};

  const save = (item, update, event) => {
    event.preventDefault();

    const { title, content, date } = document.gform;
    const edited = {
      id: item.id,
      relationship: item.relationship,
      title: title.value || title.attributes.placeholder.value,
      content: content.value || content.attributes.placeholder.value,
      date: parseDate(date.value)
    }

    update(section, edited);
    props.history.push(cancelLink(item));
  }

  const cancelLink = item => `/relationship/${item.relationship}/contacts`;

  return (
    <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
      <InputFormPageNav pathname={cancelLink(currentItem)} />
      <form
        name='gform'
        className='g-form'
        onSubmit={save.bind(null, currentItem, updateSingle)}
      >
        <label htmlFor="title" className='center'>
          What was the Last Contact you had with this Person?
        </label>
        <input
          type="text"
          name="title"
          autoComplete="off"
          placeholder="Call/Text/Email/Lunch..."
          defaultValue={currentItem.title}
        />
        <label htmlFor='content'>Notes:</label>
        <textarea
          name="content"
          placeholder="Making plans to meet up this weekend.."
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

}

export default withRouter(withGlobalContext(EditContact));
