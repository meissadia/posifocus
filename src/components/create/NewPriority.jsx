import React from 'react';
import { withRouter } from 'react-router-dom';
import PageNavigation from '../PageNavigation';
import '../../styles/css/FormView.css';
import { GlobalContext } from '../App';

const NewPriority = props => {

  const handleAddPriority = (add, event) => {
    event.preventDefault();
    var date = new Date();

    var new_relationship = {
      id: date.getTime().toString(),
      title: document.gform.title.value || document.gform.title.attributes.placeholder.value,
      date: date.toString()
    }

    add('priorities', new_relationship);
    props.history.push({ pathname: cancelLink(), state: { enter: 'enter-left' } });
  }

  const cancelLink = () => '/priorities';

  return (
    <GlobalContext.Consumer>
      {({ functions }) => {
        return (
          <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
            <PageNavigation
              back={['/', 'Dashboard']}
              title='New Priority'
              add={[{ pathname: cancelLink(), state: { enter: 'enter-left' } }, '< Cancel >']}
            />
            <form
              name='gform'
              className='g-form'
              onSubmit={handleAddPriority.bind(null, functions.addToStateArray)}
            >
              <label htmlFor="title" className='center'>
                What's Most Important to You?
                </label>
              <input
                type="text"
                name="title"
                autoComplete="off"
                placeholder="Family, Friends, Faith"
              />
              <input id='submit-button' type="submit" name="submit" value="Save" />
            </form>
          </div>
        );
      }}
    </GlobalContext.Consumer>
  )
}

export default withRouter(NewPriority);
