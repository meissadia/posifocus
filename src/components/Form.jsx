import React                from 'react';
import { withRouter } from 'react-router-dom';
import '../css/FormView.sass';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    this.currentDateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((elem) => {
      if (elem < 10) return ('0' + elem);
      return elem;
    }).join('-');
  }
  
  render(){
    return(
      <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
        {props.children[0]}
      </div>
    )
  }
}
