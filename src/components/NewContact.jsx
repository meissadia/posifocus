import React                from 'react';
import { Link, withRouter } from 'react-router-dom';
import PageNavigation       from './PageNavigation';

import '../css/FormView.css';

class NewContact extends React.Component {
  constructor(props){
    super(props);
    this.handleAddContact = this.handleAddContact.bind(this);
  }

  handleAddContact(event){
    event.preventDefault();
    let date = new Date();
    let gdate = this.parseDate(document.gform.date.value);

    let relationship_id = this.props.relationship_id;

    let new_contact = {
      id: date.getTime().toString(),
      relationship: relationship_id,
      title: document.gform.title.value || document.gform.title.attributes.placeholder.value,
      content: document.gform.content.value || document.gform.content.attributes.placeholder.value,
      date: gdate
    }

    this.props.addHandler('contacts', new_contact);
    this.props.history.push(this.cancelLink());
  }

  parseDate(date){
    if(!date){ return (new Date()).toString() };
    return new Date(date).toString();
  }

  cancelLink(){
    return this.props.match.url.split('/').slice(0,-1).join('/');
  }

  backLink(){
    return this.props.match.url.split('/').slice(0,-3).join('/') + 's';
  }

  render(){
    let date = new Date();
    let currentDateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((elem) => {
      if (elem < 10) return ('0' + elem);
      return elem;
    }).join('-');

    return (
      <div className='new-input-wrapper'>
        <PageNavigation
          back={[this.backLink(), 'Relationships']}
          title='New Contact'
          add={[this.cancelLink(), '< Cancel >']}
          />

        <form name='gform' className='g-form' onSubmit={this.handleAddContact}>
          <label htmlFor="title">What was the Last Contact you had with this Person?</label>
          <input type="text" name="title" autoComplete="off" placeholder="Call/Text/Email/Lunch..." />
          <label htmlFor='content'>Notes:</label>
          <textarea name="content" placeholder="Making plans to meet up this weekend.."/>
          <label htmlFor='date-input'>Date:</label>
          <input id='date-input' type="date" name="date" defaultValue={currentDateString} />
          <input id='submit-button' type="submit" name="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default withRouter(NewContact);
