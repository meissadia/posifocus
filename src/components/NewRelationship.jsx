import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../css/NewGratitude.css';


class NewRelationship extends React.Component {
  constructor(props){
    super(props);
    this.handleAddRelationship = this.handleAddRelationship.bind(this);
  }


  handleAddRelationship(event){
    event.preventDefault();
    var date = new Date();

    var new_relationship = {
      id: date.getTime(),
      title: document.gform.title.value || document.gform.title.attributes.placeholder.value,
      date: date.toString()
    }

    this.props.addHandler('relationships', new_relationship);
    this.props.history.push('/relationships');
  }

  render(){
    return (
      <div className='new-input-wrapper'>
          <div className="flex row controls">
            <Link to='/'>&lt; Dashboard</Link>
              <a style={{cursor: 'inherit', textDecoration: 'none'}}>New Relationship</a>
            <Link to='/relationships'>{"< Cancel >"}</Link>
          </div>
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
