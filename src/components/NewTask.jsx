import React                from 'react';
import { Link, withRouter } from 'react-router-dom';
import Toggle               from 'react-toggle';
import '../css/FormView.css';
import '../css/ReactToggle.css';


class NewTask extends React.Component {
  constructor(props){
    super(props);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.params = this.props.match.params;
  }


  handleAddTask(event){
    event.preventDefault();
    let date = new Date();
    let priority_id = this.params.priority_id;

    let new_project = {
      id: date.getTime().toString(),
      priority: priority_id,
      project: this.params.project_id,
      title: document.gform.title.value || document.gform.title.attributes.placeholder.value,
      today: document.gform.today.checked,
      done: false,
      date: date.toString()
    }

    this.props.addHandler('tasks', new_project);
    this.props.history.push(this.cancelLink());
  }

  cancelLink(){
    return this.props.match.url.split('/').slice(0,-1).join('/');
  }

  backLink(){
    return this.props.match.url.split('/').slice(0,-3).join('/') + 's';
  }

  render(){
    return (
      <div className='new-input-wrapper'>
        <div className="flex row controls">
          <Link to={this.backLink()}>&lt; Projects</Link>
          <a style={{cursor: 'inherit', textDecoration: 'none'}}>New Task</a>
          <Link to={this.cancelLink()}>{"< Cancel >"}</Link>
        </div>
        <form name='gform' className='g-form' onSubmit={this.handleAddTask}>
          <label htmlFor="title">What Task Must Be Done to Complete this Project?</label>
          <input type="text" name="title" autoComplete="off" placeholder="Send Party Invite..." />
          <label className='flex row form-toggle' htmlFor="today">
            <span>On Today's Task List?</span>
            <Toggle
              id='today'
              defaultChecked={false} />
          </label>
          <input id='submit-button' type="submit" name="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default withRouter(NewTask);
