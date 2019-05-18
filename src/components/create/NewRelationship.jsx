import React from 'react';
import { withRouter } from 'react-router-dom';
import PageNavigation from '../PageNavigation';
import '../../styles/css/FormView.css';
import withGlobalContext from '../GlobalContextHOC';

const NewRelationship = props => {
  const { functions } = props;

  const handleAddRelationship = (add, event) => {
    event.preventDefault();
    const date = new Date();

    const new_relationship = {
      id: date.getTime().toString(),
      title: document.gform.title.value || document.gform.title.attributes.placeholder.value,
      date: date.toString()
    }

    add('relationships', new_relationship);
    props.history.push({ pathname: cancelLink(), state: { enter: 'enter-left' } });
  }

  const cancelLink = () => '/relationships';

  return (
    <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
      <PageNavigation
        back={['/', 'Dashboard']}
        title='New Relationship'
        add={[{ pathname: cancelLink(), state: { enter: 'enter-left' } }, '< Cancel >']}
      />
      <form
        name='gform'
        className='g-form'
        onSubmit={handleAddRelationship.bind(null, functions.addToStateArray)}
      >
        <label htmlFor="title" className='center'>
          Who Do You Want To Build A Better Relationship With?
              </label>
        <input
          type="text"
          name="title"
          autoComplete="off"
          placeholder="My Brother"
        />
        <input id='submit-button' type="submit" name="submit" value="Save" />
      </form>
    </div>
  );
}

export default withRouter(withGlobalContext(NewRelationship));
