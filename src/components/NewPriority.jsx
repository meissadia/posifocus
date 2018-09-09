import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// import '../css/NewGratitude.css';


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
        <div className="flex row controls">
          <Link to='/'>&lt; Dashboard</Link>
          <a style={{cursor: 'inherit', textDecoration: 'none'}}>New Priority</a>
          <Link to={this.cancelLink()}>{"< Cancel >"}</Link>
        </div>
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
