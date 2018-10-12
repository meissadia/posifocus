import React                from 'react';
import { withRouter }       from 'react-router-dom';
import PageNavigation       from '../PageNavigation';
import * as FH              from '../../lib/FormHelpers';
import '../../styles/css/FormView.css';

class NewGratitude extends React.Component {
  constructor(props){
    super(props);
    this.handleNewGratitude = this.handleNewGratitude.bind(this);
  }

  handleNewGratitude(event){
    event.preventDefault();
    var date = new Date();

    var new_gratitude = {
      id: date.getTime().toString(),
      title: document.gform.title.value || document.gform.title.attributes.placeholder.value,
      content: document.gform.content.value || document.gform.content.attributes.placeholder.value,
      date: FH.parseDate(document.gform.date.value)
    }

    this.props.addHandler('gratitudes', new_gratitude);
    this.props.history.push({
      pathname: this.cancelLink(),
      state: { enter: 'enter-left'}
    });
  }

  cancelLink(){
    return '/gratitudes'
  }

  render(){
    return (
      <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
        <PageNavigation
          back={['/', 'Dashboard']}
          title='New Gratitude'
          add={[{pathname: this.cancelLink(), state: {enter: 'enter-bottom'}}, '< Cancel >']}
          />
        <form name='gform' className='g-form' onSubmit={this.handleNewGratitude}>
          <label htmlFor="title" className='center'>
            What Are You Grateful For Today?
          </label>
          <input
            type="text"
            name="title"
            autoComplete="off"
            placeholder="Family / Clean Water / etc..."
            />
          <label htmlFor='content'>Notes:</label>
          <textarea
            name="content"
            placeholder="My kids surprised me today by..."
            />
          <label htmlFor='date-input'>Date:</label>
          <input
            id='date-input'
            type="date"
            name="date"
            defaultValue={FH.dateInputDefault()}
            />
          <input id='submit-button' type="submit" name="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default withRouter(NewGratitude);
