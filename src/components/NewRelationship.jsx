import React                from 'react';
import { withRouter } from 'react-router-dom';
import PageNavigation       from './PageNavigation';
import '../css/FormView.css';

class NewRelationship extends React.Component {
  constructor(props){
    super(props);
    this.handleAddRelationship = this.handleAddRelationship.bind(this);
  }

  componentDidMount(){
    let header = document.getElementById('header');
    header.style.background = 'rgba(0, 150, 255, 1)';
  }

  handleAddRelationship(event){
    event.preventDefault();
    var date = new Date();

    var new_relationship = {
      id: date.getTime().toString(),
      title: document.gform.title.value || document.gform.title.attributes.placeholder.value,
      date: date.toString()
    }

    this.props.addHandler('relationships', new_relationship);
    this.props.history.push({pathname: this.cancelLink(), state: {enter: 'enter-left'}});
  }

  cancelLink(){
    return '/relationships';
  }

  render(){
    return (
      <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
        <PageNavigation
          back={['/', 'Dashboard']}
          title='New Relationship'
          add={[{pathname: this.cancelLink(), state: {enter: 'enter-left'}}, '< Cancel >']}
          />
        <form name='gform' className='g-form' onSubmit={this.handleAddRelationship}>
          <label htmlFor="title">
            Who Do You Want To Build A Better Relationship With?
          </label>
          <input
            type="text"
            name="title"
            autoComplete="off"
            placeholder="My Brother"
            />
          <input id='submit-button' type="submit" name="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default withRouter(NewRelationship);
