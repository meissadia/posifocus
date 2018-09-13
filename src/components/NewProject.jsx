import React                from 'react';
import { withRouter } from 'react-router-dom';
import PageNavigation       from './PageNavigation';
import { Route }  from 'react-router-dom';

import '../css/FormView.css';


class NewProject extends React.Component {
  constructor(props){
    super(props);
    this.handleAddProject = this.handleAddProject.bind(this);
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
      <Route path='/priority/:priority_id/projects/new' render={ ({match}) => (
          <div className='new-input-wrapper'>
            <PageNavigation
              back={['/priorities', 'Priorities']}
              title='New Project'
              add={[this.cancelLink(match.url), '< Cancel >']}
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
              <input name="priority" value={match.params.priority_id} hidden readOnly/>
              <input name="url" value={match.url} hidden readOnly/>
              <input id='submit-button' type="submit" name="submit" value="Save" />
            </form>
          </div>
        )} />
      )
    }
  }

  export default withRouter(NewProject);
