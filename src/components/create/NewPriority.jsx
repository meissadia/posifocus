import React                from 'react';
import { withRouter }       from 'react-router-dom';
import PageNavigation       from '../PageNavigation';
import '../../styles/css/FormView.css';


class NewPriority extends React.Component {
  constructor(props){
    super(props);
    this.handleAddPriority = this.handleAddPriority.bind(this);
  }

  handleAddPriority(event){
    event.preventDefault();
    var date = new Date();

    var new_relationship = {
      id: date.getTime().toString(),
      title: document.gform.title.value || document.gform.title.attributes.placeholder.value,
      date: date.toString()
    }

    this.props.addHandler('priorities', new_relationship);
    this.props.history.push({pathname: this.cancelLink(), state: {enter: 'enter-left'}});
  }

  cancelLink(){
    return '/priorities'
  }

  render(){
    return (
      <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
        <PageNavigation
          back={['/', 'Dashboard']}
          title='New Priority'
          add={[{pathname: this.cancelLink(), state: {enter: 'enter-left'}}, '< Cancel >']}
          />
        <form name='gform' className='g-form' onSubmit={this.handleAddPriority}>
          <label htmlFor="title" className='center'>
            What's Most Important to You?
          </label>
          <input
            type="text"
            name="title"
            autoComplete="off"
            placeholder="Family, Friends, Faith"
            />
          <input id='submit-button' type="submit" name="submit" value="Save" />
        </form>
      </div>
    )
  }
}

export default withRouter(NewPriority);
