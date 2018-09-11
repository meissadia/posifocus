import React                from 'react';
import { Link, withRouter } from 'react-router-dom';
import PageNavigation       from './PageNavigation';
import '../css/FormView.css';


class NewRelationship extends React.Component {
  constructor(props){
    super(props);
    this.handleAddRelationship = this.handleAddRelationship.bind(this);
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
    this.props.history.push(this.cancelLink());
  }

  cancelLink(){
    return '/relationships';
  }

  render(){
    return (
      <div className='new-input-wrapper'>
        <PageNavigation
          back={['/', 'Dashboard']}
          title='New Relationship'
          add={[this.cancelLink(), '< Cancel >']}
          />

        <form name='gform' className='g-form' onSubmit={this.handleAddRelationship}>
          <label htmlFor="title">Who Do You Want To Build A Better Relationship With?</label>
          <input type="text" name="title" autoComplete="off" placeholder="ex. My Brother" />
          <input id='submit-button' type="submit" name="submit" value="Save" />
        </form>
    </div>
    )
  }
}

export default withRouter(NewRelationship);
