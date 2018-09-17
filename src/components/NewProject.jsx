import React                from 'react';
import { withRouter } from 'react-router-dom';
import PageNavigation       from './PageNavigation';
import '../css/FormView.css';


class NewProject extends React.Component {
  constructor(props){
    super(props);
    this.handleAddProject = this.handleAddProject.bind(this);
    this.params = this.props.match.params;
    this.url = this.props.match.url;
  }

  handleAddProject(event){
    event.preventDefault();
    let date = new Date();

    let new_project = {
      id: date.getTime().toString(),
      priority: document.gform.priority.value,
      title: document.gform.title.value || document.gform.title.attributes.placeholder.value,
      date: date.toString()
    }

    if (this.props.addHandler('projects', new_project)){
      this.props.history.push(this.cancelLink(document.gform.url.value));
    } else {
      alert('Error adding contact!');
    }
  }

  cancelLink(url){
    return url.slice(0, -4);
  }

  render(){
    return (
      <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
        <PageNavigation
          back={['/priorities', 'Priorities']}
          title='New Project'
          add={[this.cancelLink(this.url), '< Cancel >']}
          />
        <form name='gform' className='g-form' onSubmit={this.handleAddProject}>
          <label htmlFor="title">
            What Project Will Contribute Most to this Priority?
          </label>
          <input
            type="text"
            name="title"
            autoComplete="off"
            placeholder="Backyard BBQ/New Diet/Vacation..."
            />
          <input name="priority" value={this.params.priority_id} hidden readOnly/>
          <input name="url" value={this.url} hidden readOnly/>
          <input id='submit-button' type="submit" name="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default withRouter(NewProject);
