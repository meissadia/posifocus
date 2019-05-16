import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/FormView.css';
import PageNavigation from '../PageNavigation';
import { GlobalContext } from '../App';
import { parseUrl } from '../../lib/Helpers';

const EditProject = props => {
  const section = 'projects';

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

  return (
    <GlobalContext.Consumer>
      {({ functions, location }) => {
        const urlParams = parseUrl(location.pathname);
        const { getSingle, updateSingle } = functions;
        const currentItem = getSingle(section, urlParams.projects) || {};

        return (
          <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
            <PageNavigation
              back={['/priorities', 'Priorities']}
              title='Edit Project'
              add={[{ pathname: cancelLink(currentItem), state: { enter: 'enter-bottom' } }, '< Cancel >']}

            />
            <form
              name='gform'
              className='g-form'
              onSubmit={save.bind(null, currentItem, updateSingle)}
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
              <input id='submit-button' type="submit" name="submit" value="Save" />
            </form>
          </div>
        )
      }}
    </GlobalContext.Consumer>
  );
};

export default withRouter(EditProject);
