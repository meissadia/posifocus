import React                from 'react';
import { withRouter }       from 'react-router-dom';
import PageNavigation       from '../PageNavigation';
import '../../styles/css/FormView.css';

class NewContact extends React.Component {
  constructor(props){
    super(props);
    this.handleAddContact = this.handleAddContact.bind(this);
    this.params = this.props.match.params;
    this.url = this.props.match.url;
  }

  handleAddContact(event){
    event.preventDefault();
    let date = new Date();
    let gdate = this.parseDate(document.gform.date.value);

    let new_contact = {
      id: date.getTime().toString(),
      relationship: document.gform.relationship.value,
      title: document.gform.title.value || document.gform.title.attributes.placeholder.value,
      content: document.gform.content.value || document.gform.content.attributes.placeholder.value,
      date: gdate
    }

    this.props.addHandler('contacts', new_contact);
    this.props.history.push(this.cancelLink(document.gform.url.value));
  }

  parseDate(date){
    if(!date){ return (new Date()).toString() };
    return new Date(date).toString();
  }

  cancelLink(url){
    return url.split('/').slice(0,-1).join('/');
  }

  backLink(url){
    return url.split('/').slice(0,-3).join('/') + 's';
  }

  render(){
    let date = new Date();
    let currentDateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((elem) => {
      if (elem < 10) return ('0' + elem);
      return elem;
    }).join('-');

    return (
      <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
        <PageNavigation
          back={[this.backLink(this.url), 'Relationships']}
          title='New Contact'
          add={[{pathname: this.cancelLink(this.url), state: {enter: 'enter-left'}}, '< Cancel >']}
          />
        <form name='gform' className='g-form' onSubmit={this.handleAddContact}>
          <label htmlFor="title" className='center'>
            What was the Last Contact you had with this Person?
          </label>
          <input
            type="text"
            name="title"
            autoComplete="off"
            placeholder="Call/Text/Email/Lunch..."
            />
          <label htmlFor='content'>Notes:</label>
          <textarea
            name="content"
            placeholder="Making plans to meet up this weekend.."
            />
          <label htmlFor='date-input'>Date:</label>
          <input
            id='date-input'
            type="date"
            name="date"
            defaultValue={currentDateString}
            />
          <input name="relationship" value={this.params.relationship_id} hidden readOnly/>
          <input name="url" value={this.url} hidden readOnly/>
          <input id='submit-button' type="submit" name="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default withRouter(NewContact);
