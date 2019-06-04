import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/FormView.css';
import withGlobalContext from '../GlobalContextHOC';
import { InputFormPageNav } from '../InputFormPageNav';

const NewProject = props => {
  const { functions, urlParams } = props;

  const handleNewProject = (add, event) => {
    event.preventDefault();
    const date = new Date();

    const new_project = {
      id: date.getTime().toString(),
      priority: document.gform.priority.value,
      title: document.gform.title.value || document.gform.title.attributes.placeholder.value,
      date: date.toString()
    }

    if (add('projects', new_project)) {
      props.history.push({
        pathname: cancelLink(document.gform.url.value),
        state: { enter: 'enter-left' }
      });
    } else {
      alert('Error adding contact!');
    }
  }

  const cancelLink = url => url.slice(0, -4) || '/';

  const onSubmitHandler = handleNewProject.bind(null, functions.addToStateArray);

  return (
    <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
      <InputFormPageNav pathname={cancelLink(urlParams.url)} />
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
        />
        <input name="priority" value={urlParams.priority} hidden readOnly />
        <input name="url" value={urlParams.url} hidden readOnly />
        <div id='submit-button' onClick={onSubmitHandler}>Save</div>
      </form>
    </div>
  )
};

export default withRouter(withGlobalContext(NewProject));
