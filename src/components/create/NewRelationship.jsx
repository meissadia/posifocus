import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../styles/css/FormView.css';
import withGlobalContext from '../GlobalContextHOC';
import { InputFormPageNav } from '../InputFormPageNav';

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

  const onSubmitHandler = handleAddRelationship.bind(null, functions.addToStateArray);

  return (
    <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
      <InputFormPageNav pathname={cancelLink()} />
      <form
        name='gform'
        className='g-form'
        onSubmit={onSubmitHandler}
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
        <div id='submit-button' onClick={onSubmitHandler}>Save</div>
      </form>
    </div>
  );
}

export default withRouter(withGlobalContext(NewRelationship));
