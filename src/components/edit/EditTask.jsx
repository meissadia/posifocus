import React                from 'react';
import { withRouter }       from 'react-router-dom';
import Toggle               from 'react-toggle';
import PageNavigation       from '../PageNavigation';
import '../../styles/css/FormView.css';
import '../../styles/css/ReactToggle.css';

class EditTask extends React.Component {
  constructor(props){
    super(props);
    this.section = 'tasks';
    this.save = this.save.bind(this);
    this.params = this.props.match.params;
    this.item = this.props.getSingle(this.section, this.params.id);
  }

  save(event){
    event.preventDefault();
    let { title, today, done } = document.gform
    let edited = {
      id: this.item.id,
      priority: this.item.priority,
      project: this.item.project,
      title: title.value || title.attributes.placeholder.value,
      today: today.checked,
      done: done.checked,
      date: this.item.date
    }

    this.props.updateSingle('tasks', edited);
    this.props.history.push({
      pathname: this.cancelLink(),
      state: {enter: 'enter-left'}
    });
  }

  cancelLink(){
    if(this.props.todays){
      return '/tasks/today';
    } else {
      let { priority, project } = this.item;
      return `/priority/${priority}/project/${project}/tasks`;
    }
  }

  backLink(){
    if(this.props.todays){
      return '/';
    } else {
      let { priority } = this.item;
      return `/priority/${priority}/projects`;
    }
  }

  backTitle(){
    return this.props.todays ? 'Dashboard' : 'Projects';
  }

  render(){
    return (
      <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
        <PageNavigation
          back={[this.backLink(), this.backTitle()]}
          title='Edit Task'
          add={[{pathname: this.cancelLink(), state: {enter: 'enter-bottom'}}, '< Cancel >']}
          />
        <form name='gform' className='g-form' onSubmit={this.save}>
          <label htmlFor="title" className='center'>
            What Task Must Be Done to Complete this Project?
          </label>
          <input
            type="text"
            name="title"
            autoComplete="off"
            placeholder="Send Party Invite..."
            defaultValue={this.item.title}
            />
          <label className='flex row form-toggle' htmlFor="today">
            <Toggle
              id='today'
              defaultChecked={this.item.today} />
            <span>On Today's Task List?</span>
          </label>
          <label className='flex row form-toggle' htmlFor="done">
            <Toggle
              id='done'
              defaultChecked={this.item.done} />
            <span>Done?</span>
          </label>
          <input id='submit-button' type="submit" name="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default withRouter(EditTask);
