import React from 'react';
import SimpleStorage, {clearStorage} from 'react-simple-storage';
import {Redirect} from 'react-router-dom';

export default class ResetState extends React.Component {
  constructor(props){
    super(props);
    this.state = props.state;
  }

  componentDidMount(){
    clearStorage();
    this.setState(this.props.state);
  }

  render(){
    return (
      <div>
        <SimpleStorage parent={this} />
        <Redirect to='/' />
      </div>
    )
  }

}
