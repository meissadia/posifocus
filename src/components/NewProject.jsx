import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../css/NewGratitude.css';


class NewProject extends React.Component {
  constructor(props){
    super(props);
    this.handleAddProject = this.handleAddProject.bind(this);
  }

  handleAddProject(event){
    event.preventDefault();
    let date = new Date();
    let priority_id = this.props.priority_id;

    let new_project = {
      id: date.getTime().toString(),
      priority: priority_id,
      title: document.gform.title.value || document.gform.title.attributes.placeholder.value,
      date: date.toString()
    }

    if (this.props.addHandler('projects', new_project)){
      this.props.history.push(this.cancelLink());
    } else {
      alert('Error adding contact!');
    }
  }

  cancelLink(){
    return this.props.match.url.slice(0, -4);
  }

  render(){
    let match = this.props.match;
    let date = new Date();
    let currentDateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((elem) => {
      if (elem < 10) return ('0' + elem);
      return elem;
    }).join('-');


    return (
      <div className='new-input-wrapper'>
        <div className="flex row controls">
          <Link to='/priorities'>&lt; Priorities</Link>
          <a style={{cursor: 'inherit', textDecoration: 'none'}}>New Project</a>
          <Link to={this.cancelLink()}>{"< Cancel >"}</Link>
        </div>
        <form name='gform' className='g-form' onSubmit={this.handleAddProject}>
          <label htmlFor="title">What Project Will Contribute Most to this Priority?</label>
          <input type="text" name="title" autoComplete="off" placeholder="Backyard BBQ/New Diet/Vacation..." />
          <input id='submit-button' type="submit" name="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default withRouter(NewProject);
