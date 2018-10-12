import React                from 'react';
import { withRouter }       from 'react-router-dom';
import PageNavigation       from '../PageNavigation';
import '../../styles/css/FormView.css';

class EditProject extends React.Component {
  constructor(props){
    super(props);
    this.section = 'projects';
    this.save = this.save.bind(this);
    this.params = this.props.match.params;
    this.url = this.props.match.url;
    this.item = this.props.getSingle(this.section, this.params.id);
  }

  save(event){
    event.preventDefault();
    let { title } = document.gform
    let edited = {
      id: this.item.id,
      priority: this.item.priority,
      title: title.value || title.attributes.placeholder.value,
      date: this.item.date
    }

    this.props.updateSingle(this.section, edited);
    this.props.history.push({
      pathname: this.cancelLink(),
      state: {enter: 'enter-left'}
    });
  }

  cancelLink(){
    return `/priority/${this.item.priority}/projects`
  }

  render(){
    return (
      <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
        <PageNavigation
          back={['/priorities', 'Priorities']}
          title='Edit Project'
          add={[{pathname: this.cancelLink(), state: {enter: 'enter-bottom'}}, '< Cancel >']}

          />
        <form name='gform' className='g-form' onSubmit={this.save}>
          <label htmlFor="title" className='center'>
            What Project Will Contribute Most to this Priority?
          </label>
          <input
            type="text"
            name="title"
            autoComplete="off"
            placeholder="Backyard BBQ/New Diet/Vacation..."
            defaultValue={this.item.title}
            />
          <input id='submit-button' type="submit" name="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default withRouter(EditProject);
