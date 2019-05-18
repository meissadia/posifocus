import React from 'react';
import { withRouter } from 'react-router-dom';
import Toggle from 'react-toggle';

import '../../styles/css/FormView.css';
import '../../styles/css/ReactToggle.css';
import PageNavigation from '../PageNavigation';
import withGlobalContext from '../GlobalContextHOC';

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

  const backLink = url => url.split('/').slice(0, -3).join('/') + 's';

  return (
    <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
      <PageNavigation
        back={[backLink(urlParams.url), 'Projects']}
        title='New Task'
        add={[{ pathname: cancelLink(urlParams.url), state: { enter: 'enter-left' } }, '< Cancel >']}
      />
      <form
        name='gform'
        className='g-form'
        onSubmit={handleAddTask.bind(null, functions.addToStateArray)}
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
        <input id='submit-button' type="submit" name="submit" value="Save" />
      </form>
    </div>
  );
}

export default withRouter(withGlobalContext(NewTask));
