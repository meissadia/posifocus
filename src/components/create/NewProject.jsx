import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/FormView.css';
import { GlobalContext } from '../App';
import PageNavigation from '../PageNavigation';
import { parseUrl } from '../../lib/Helpers';

const NewProject = props => {
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

  return (
    <GlobalContext.Consumer>
      {({ functions, location }) => {
        const url = location.pathname;
        const params = parseUrl(url);

        return (
          <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
            <PageNavigation
              back={['/priorities', 'Priorities']}
              title='New Project'
              add={[{ pathname: cancelLink(url), state: { enter: 'enter-left' } }, '< Cancel >']}

            />
            <form
              name='gform'
              className='g-form'
              onSubmit={handleNewProject.bind(null, functions.addToStateArray)}
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
              <input name="priority" value={params.priority} hidden readOnly />
              <input name="url" value={url} hidden readOnly />
              <input id='submit-button' type="submit" name="submit" value="Save" />
            </form>
          </div>
        );
      }}
    </GlobalContext.Consumer>
  );
};

export default withRouter(NewProject);
