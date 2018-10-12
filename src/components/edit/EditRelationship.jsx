import React                from 'react';
import { withRouter }       from 'react-router-dom';
import PageNavigation       from '../PageNavigation';
import '../../styles/css/FormView.css';

class EditRelationship extends React.Component {
  constructor(props){
    super(props);
    this.section = 'relationships';
    this.save = this.save.bind(this);
    this.item = this.props.getSingle(this.section, this.props.match.params.id);
  }

  save(event){
    event.preventDefault();
    let { title } = document.gform;
    var edited = {
      id: this.item.id,
      title: title.value || title.attributes.placeholder.value,
      date: this.item.date
    }

    this.props.updateSingle(this.section, edited);
    this.props.history.push(this.cancelLink());

  }

  cancelLink(){
    return `/${this.section}`;
  }

  render(){
    return (
      <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
        <PageNavigation
          back={['/', 'Dashboard']}
          title='Edit Relationship'
          add={[{pathname: this.cancelLink(), state: {enter: 'enter-bottom'}}, '< Cancel >']}
          />
        <form name='gform' className='g-form' onSubmit={this.save}>
          <label htmlFor="title" className='center'>
            Who Do You Want To Build A Better Relationship With?
          </label>
          <input
            type="text"
            name="title"
            autoComplete="off"
            placeholder="My Brother"
            defaultValue={this.item.title}
            />
          <input id='submit-button' type="submit" name="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default withRouter(EditRelationship);
