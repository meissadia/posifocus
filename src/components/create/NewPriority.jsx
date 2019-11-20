import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../styles/scss/FormView.sass';
import withGlobalContext from '../GlobalContextHOC';
import { InputFormPageNav } from '../InputFormPageNav';

const NewPriority = props => {
  const { functions } = props;

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

  const onSubmitHandler = handleAddPriority.bind(null, functions.addToStateArray);

  return (
    <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
      <InputFormPageNav pathname={cancelLink()} />
      <form
        name='gform'
        className='g-form'
        onSubmit={onSubmitHandler}
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
        <div id='submit-button' onClick={onSubmitHandler}>Save</div>
      </form>
    </div>
  );
}

export default withRouter(withGlobalContext(NewPriority));
