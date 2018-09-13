import React                from 'react';
import { withRouter } from 'react-router-dom';
import PageNavigation       from './PageNavigation';
import { Route }  from 'react-router-dom';

import '../css/FormView.css';

class NewGratitude extends React.Component {
  constructor(props){
    super(props);
    this.handleNewGratitude = this.handleNewGratitude.bind(this);
  }

  handleNewGratitude(event){
    event.preventDefault();
    var date = new Date();
    var gdate = this.parseDate(document.gform.date.value);

    var new_gratitude = {
      id: date.getTime().toString(),
      title: document.gform.title.value || document.gform.title.attributes.placeholder.value,
      content: document.gform.content.value || document.gform.content.attributes.placeholder.value,
      date: gdate
    }

    this.props.addHandler('gratitudes', new_gratitude);
    this.props.history.push(this.cancelLink());
  }

  parseDate(date){
    if(!date){ return (new Date()).toString() };
    return new Date(date).toString();
  }

  cancelLink(){
    return '/gratitudes'
  }

  render(){
    var date = new Date();
    var currentDateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((elem) => {
      if (elem < 10) return ('0' + elem);
      return elem;
    }).join('-');

    return (
      <Route path='/gratitudes/new' render={() => (
          <div className='new-input-wrapper'>
            <PageNavigation
              back={['/', 'Dashboard']}
              title='New Gratitude'
              add={[this.cancelLink(), '< Cancel >']}
              />
            <form name='gform' className='g-form' onSubmit={this.handleNewGratitude}>
              <label htmlFor="title">
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
                defaultValue={currentDateString}
                />
              <input id='submit-button' type="submit" name="submit" value="Save" />
            </form>
          </div>
        )
      }
      />
    )
  }
}

export default withRouter(NewGratitude);
