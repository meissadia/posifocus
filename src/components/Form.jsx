import React                from 'react';
import { withRouter } from 'react-router-dom';
import '../css/FormView.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    this.currentDateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((elem) => {
      if (elem < 10) return ('0' + elem);
      return elem;
    }).join('-');
  }

  componentDidMount(){
    let header = document.getElementById('header');
    // header.style.background = 'rgba(0, 150, 255, 1)';
  }

  render(){
    return(
      <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
        {props.children[0]}
      </div>
    )
  }
}
