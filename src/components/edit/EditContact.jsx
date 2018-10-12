import React                from 'react';
import { withRouter }       from 'react-router-dom';
import PageNavigation       from '../PageNavigation';
import * as FH              from '../../lib/FormHelpers';
import '../../styles/css/FormView.css';

class Edit extends React.Component {
  constructor(props){
    super(props);
    this.section = 'contacts';
    this.save = this.save.bind(this);
    this.item = this.props.getSingle(this.section, this.props.match.params.id);
  }

  save(event){
    event.preventDefault();

    let { title, content, date } =  document.gform;
    let edited = {
      id: this.item.id,
      relationship: this.item.relationship,
      title: title.value || title.attributes.placeholder.value,
      content: content.value || content.attributes.placeholder.value,
      date: FH.parseDate(date.value)
    }

    this.props.updateSingle(this.section, edited);
    this.props.history.push(this.cancelLink());
  }

  cancelLink(){
    return `/relationship/${this.item.relationship}/contacts`;
  }

  backLink(url){
    return '/relationships';
  }

  render(){
    return (
      <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
        <PageNavigation
          back={[this.backLink(), 'Relationships']}
          title='Edit Contact'
          add={[{pathname: this.cancelLink(), state: {enter: 'enter-left'}}, '< Cancel >']}
          />
        <form name='gform' className='g-form' onSubmit={this.save}>
          <label htmlFor="title" className='center'>
            What was the Last Contact you had with this Person?
          </label>
          <input
            type="text"
            name="title"
            autoComplete="off"
            placeholder="Call/Text/Email/Lunch..."
            defaultValue={this.item.title}
            />
          <label htmlFor='content'>Notes:</label>
          <textarea
            name="content"
            placeholder="Making plans to meet up this weekend.."
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

export default withRouter(Edit);
