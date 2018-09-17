import React                from 'react';
import { withRouter } from 'react-router-dom';
import Toggle               from 'react-toggle';
import PageNavigation       from './PageNavigation';
import '../css/FormView.css';
import '../css/ReactToggle.css';


class NewTask extends React.Component {
  constructor(props){
    super(props);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.params = this.props.match.params;
    this.url = this.props.match.url;
  }

  handleAddTask(event){
    event.preventDefault();
    let date = new Date();

    let new_project = {
      id: date.getTime().toString(),
      priority: document.gform.priority.value,
      project: document.gform.project.value,
      title: document.gform.title.value || document.gform.title.attributes.placeholder.value,
      today: document.gform.today.checked,
      done: false,
      date: date.toString()
    }

    this.props.addHandler('tasks', new_project);
    this.props.history.push(this.cancelLink(document.gform.url.value));
  }

  cancelLink(url){
    return url.split('/').slice(0,-1).join('/');
  }

  backLink(url){
    return url.split('/').slice(0,-3).join('/') + 's';
  }

  render(){
    return (
      <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
        <PageNavigation
          back={[this.backLink(this.url), 'Projects']}
          title='New Task'
          add={[this.cancelLink(this.url), '< Cancel >']}
          />
        <form name='gform' className='g-form' onSubmit={this.handleAddTask}>
          <label htmlFor="title">
            What Task Must Be Done to Complete this Project?
          </label>
          <input
            type="text"
            name="title"
            autoComplete="off"
            placeholder="Send Party Invite..."
            />
          <label className='flex row form-toggle' htmlFor="today">
            <Toggle
              id='today'
              defaultChecked={false} />
            <span>On Today's Task List?</span>
          </label>
          <input name="priority" value={this.params.priority_id} hidden readOnly/>
          <input name="project" value={this.params.project_id} hidden readOnly/>
          <input name="url" value={this.url} hidden readOnly/>
          <input id='submit-button' type="submit" name="submit" value="Save" />
        </form>
      </div>
    )
  }
}

  export default withRouter(NewTask);
