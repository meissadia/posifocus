import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/scss/FormView.sass';
import withGlobalContext from '../GlobalContextHOC';
import { InputFormPageNav } from '../InputFormPageNav';

const EditPriority = props => {
  const section = 'priorities';
  const { getSingle, updateSingle } = props.functions;
  const currentItem = getSingle('priorities', props.urlParams.priorities) || {};

  const save = (item, update, event) => {
    event.preventDefault();
    const title = document.gform.title;
    const edited = {
      id: item.id,
      title: title.value || title.attributes.placeholder.value,
      date: item.date
    }

    update(section, edited);
    props.history.push({
      pathname: cancelLink(),
      state: { enter: 'enter-left' }
    });
  }

  const cancelLink = () => `/${section}`;

  const onSubmitHandler = save.bind(null, currentItem, updateSingle);

  return (
    <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
      <InputFormPageNav pathname={cancelLink()} />
      <form
        name='gform'
        className='g-form'
        onSubmit={onSubmitHandler}
      >
        <label htmlFor="title" className='center'>
          What's Most Important to You?
              </label>
        <input
          type="text"
          name="title"
          autoComplete="off"
          placeholder="Family, Friends, Faith"
          defaultValue={currentItem.title}
        />

        <div id='submit-button' onClick={onSubmitHandler}>Save</div>
      </form>
    </div>
  )
}

export default withRouter(withGlobalContext(EditPriority));
