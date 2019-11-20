import React from 'react';
import { withRouter } from 'react-router-dom';
import Toggle from 'react-toggle';

import '../../styles/scss/FormView.sass';
import '../../styles/scss/ReactToggle.sass';
import withGlobalContext from '../GlobalContextHOC';
import { InputFormPageNav } from '../InputFormPageNav';

const NewTask = props => {
  const { functions, urlParams } = props;
  const handleAddTask = (add, event) => {
    event.preventDefault();
    const date = new Date();

    const new_task = {
      id: date.getTime().toString(),
      priority: document.gform.priority.value,
      project: document.gform.project.value,
      title: document.gform.title.value || document.gform.title.attributes.placeholder.value,
      today: document.gform.today.checked,
      done: false,
      date: date.toString()
    }

    add('tasks', new_task);
    props.history.push({
      pathname: cancelLink(document.gform.url.value),
      state: { enter: 'enter-left' }
    });
  }

  const cancelLink = url => url.split('/').slice(0, -1).join('/') || '/';;

  const onSubmitHandler = handleAddTask.bind(null, functions.addToStateArray);

  return (
    <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
      <InputFormPageNav pathname={cancelLink(urlParams.url)} />
      <form
        name='gform'
        className='g-form'
        onSubmit={onSubmitHandler}
      >
        <label htmlFor="title" className='center'>
          What Task Must Be Done to Complete this Project?
              </label>
        <input
          type="text"
          name="title"
          autoComplete="off"
          placeholder="Send Party Invite..."
        />
        <label className='flex row form-toggle' htmlFor="today">
          <Toggle
            id='today'
            defaultChecked={false} />
          <span>On Today's Task List?</span>
        </label>
        <input name="priority" value={urlParams.priority} hidden readOnly />
        <input name="project" value={urlParams.projects} hidden readOnly />
        <input name="url" value={urlParams.url} hidden readOnly />
        <div id='submit-button' onClick={onSubmitHandler}>Save</div>
      </form>
    </div>
  );
}

export default withRouter(withGlobalContext(NewTask));
