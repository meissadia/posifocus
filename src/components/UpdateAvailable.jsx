import React from 'react';

class UpdateAvailable extends React.Component {
  constructor(props){
    super(props);
    this.state = { update: false }
  }

  componentDidMount(){
    this.check();
  }

  message(){
    return (this.state.update && this.props.online) ? 'Update Available!' : '';
  }

  check(){
    window['isUpdateAvailable'].then(isAvailable => {
      this.setState({ update: isAvailable });
    });
  }

  styles(){
    if(this.state.update && this.props.online) {
      return (
        {
          display: 'block',
          visibility: 'visible',
          color: 'white',
          backgroundColor: 'rgb(47, 115, 51)',
          height: '25px',
          lineHeight: '25px',
          padding: '5px 0',
          opacity: '1',
          boxShadow: '0px -125px 125px 50px black'
        }
      )
    }
    return {};
  }

  render(){
    return (
      <p className='online-status' style={this.styles()}>
        Update Available: Restart the app to install!
      </p>
    )
  }
}

export default UpdateAvailable;
