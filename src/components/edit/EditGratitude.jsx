import React                from 'react';
import { withRouter }       from 'react-router-dom';
import PageNavigation       from '../PageNavigation';
import * as FH              from '../../lib/FormHelpers';
import '../../styles/css/FormView.css';

class EditGratitude extends React.Component {
  constructor(props){
    super(props);
    this.save = this.save.bind(this);
    this.item = this.props.getSingle('gratitudes', this.props.match.params.id);
  }

  save(event){
    event.preventDefault();
    let { title, content, date } = document.gform;
    var edited = {
      id: this.item.id,
      title: title.value || title.attributes.placeholder.value,
      content: content.value || content.attributes.placeholder.value,
      date: FH.parseDate(date.value)
    }

    this.props.updateSingle('gratitudes', edited);
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
          title='Edit Gratitude'
          add={[{pathname: this.cancelLink(), state: {enter: 'enter-bottom'}}, '< Cancel >']}
          />
        <form name='gform' className='g-form' onSubmit={this.save}>
          <label htmlFor="title" className='center'>
            What Are You Grateful For Today?
          </label>
          <input
            type="text"
            name="title"
            autoComplete="off"
            placeholder="Family / Clean Water / etc..."
            defaultValue={this.item.title}
            />
          <label htmlFor='content'>Notes:</label>
          <textarea
            name="content"
            placeholder="My kids surprised me today by..."
            defaultValue={this.item.content}
            />
          <label htmlFor='date-input'>Date:</label>
          <input
            id='date-input'
            type="date"
            name="date"
            defaultValue={FH.dateInputDefault(this.item.date)}
            />
          <input id='submit-button' type="submit" name="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default withRouter(EditGratitude);
