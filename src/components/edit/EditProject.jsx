import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/scss/FormView.sass';
import withGlobalContext from '../GlobalContextHOC';
import { InputFormPageNav } from '../InputFormPageNav';

const EditProject = props => {
  const section = 'projects';
  const { functions, urlParams } = props;
  const { getSingle, updateSingle } = functions;
  const currentItem = getSingle(section, urlParams.projects) || {};

  const save = (item, update, event) => {
    event.preventDefault();
    const title = document.gform.title;
    const edited = {
      id: item.id,
      priority: item.priority,
      title: title.value || title.attributes.placeholder.value,
      date: item.date
    }

    update(section, edited);
    props.history.push({
      pathname: cancelLink(item),
      state: { enter: 'enter-left' }
    });
  }

  const cancelLink = item => `/priority/${item.priority}/projects`;

  const onSubmitHandler = save.bind(null, currentItem, updateSingle);

  return (
    <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
      <InputFormPageNav pathname={cancelLink(currentItem)} />
      <form
        name='gform'
        className='g-form'
        onSubmit={onSubmitHandler}
      >
        <label htmlFor="title" className='center'>
          What Project Will Contribute Most to this Priority?
          </label>
        <input
          type="text"
          name="title"
          autoComplete="off"
          placeholder="Backyard BBQ/New Diet/Vacation..."
          defaultValue={currentItem.title}
        />

        <div id='submit-button' onClick={onSubmitHandler}>Save</div>
      </form>
    </div>
  )
};

export default withRouter(withGlobalContext(EditProject));
