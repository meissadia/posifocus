import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/FormView.css';
import PageNavigation from '../PageNavigation';
import { GlobalContext } from '../App';

const EditPriority = props => {
  const section = 'priorities';

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

  return (
    <GlobalContext.Consumer>
      {({ functions }) => {
        const { getSingle, updateSingle } = functions;
        const currentItem = getSingle('priorities', props.match.params.id) || {};

        return (
          <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
            <PageNavigation
              back={['/', 'Dashboard']}
              title='Edit Priority'
              add={[{ pathname: cancelLink(), state: { enter: 'enter-bottom' } }, '< Cancel >']}
            />
            <form
              name='gform'
              className='g-form'
              onSubmit={save.bind(null, currentItem, updateSingle)}
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
              <input id='submit-button' type="submit" name="submit" value="Save" />
            </form>
          </div>
        )
      }}
    </GlobalContext.Consumer>
  )
}

export default withRouter(EditPriority);