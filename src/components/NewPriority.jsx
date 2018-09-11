import React                from 'react';
import { Link, withRouter } from 'react-router-dom';
import PageNavigation       from './PageNavigation';
import '../css/FormView.css';


class NewPriority extends React.Component {
  constructor(props){
    super(props);
    this.handleAddPriority = this.handleAddPriority.bind(this);
  }

  handleAddPriority(event){
    event.preventDefault();
    var date = new Date();

    var new_relationship = {
      id: date.getTime().toString(),
      title: document.gform.title.value || document.gform.title.attributes.placeholder.value,
      date: date.toString()
    }

    this.props.addHandler('priorities', new_relationship);
    this.props.history.push(this.cancelLink());
  }

  cancelLink(){
    return '/priorities'
  }

  render(){
    return (
      <div className='new-input-wrapper'>
        <PageNavigation
          back={['/', 'Dashboard']}
          title='New Priority'
          add={[this.cancelLink(), '< Cancel >']}
          />

        <form name='gform' className='g-form' onSubmit={this.handleAddPriority}>
          <label htmlFor="title">What's Most Important to You?</label>
          <input type="text" name="title" autoComplete="off" placeholder="ex. Family, Friends, Faith" />
          <input id='submit-button' type="submit" name="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default withRouter(NewPriority);
