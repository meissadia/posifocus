import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../css/NewGratitude.css';

class NewGratitude extends React.Component {
  constructor(props){
    super(props);
    this.handleNewGratitude = this.handleNewGratitude.bind(this);
  }


  handleNewGratitude(event){
    event.preventDefault();
    var gdate = document.gform.date.value &&
                new Date(document.gform.date.value).toString();
    if (!gdate) { gdate = (new Date().toString()); };

    var new_gratitude = {
      id: (new Date()).getTime().toString(),
      title: document.gform.title.value || document.gform.title.attributes.placeholder.value,
      content: document.gform.content.value || document.gform.content.attributes.placeholder.value,
      date: gdate
    }

    this.props.addHandler('gratitudes', new_gratitude);
    this.props.history.push('/gratitudes');
  }

  render(){
    var date = new Date();
    var currentDateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((elem) => {
      if (elem < 10) return ('0' + elem);
      return elem;
    }).join('-');

    return (
      <div className='new-input-wrapper'>
        <div className="flex row controls">
          <Link to='/'>&lt; Dashboard</Link>
          <a style={{cursor: 'inherit', textDecoration: 'none'}}>New Gratitude</a>
          <Link to='/gratitudes'>{"< Cancel >"}</Link>
        </div>
        <form name='gform' className='g-form' onSubmit={this.handleNewGratitude}>
          <label htmlFor="title">What Are You Grateful For Today?</label>
          <input type="text" name="title" autoComplete="off" placeholder="ex. Family / Clean Water / etc..." />
          <label htmlFor='content'>Notes:</label>
          <textarea name="content" placeholder="ex. My kids surprised me today by..."/>
          <label htmlFor='date-input'>Date:</label>
          <input id='date-input' type="date" name="date" defaultValue={currentDateString} />
          <input id='submit-button' type="submit" name="submit" value="Save" />
        </form>

      </div>
    )
  }
}

export default withRouter(NewGratitude);
