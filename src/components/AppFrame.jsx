import React from 'react';
import fieldRows from '../images/bgimage_small.jpg';

class AppFrame extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    offlineBackground(fieldRows);
  }

  render() {
    return (
      <div id='App' className={classes(this.props)}>
        { this.props.children }
      </div>
    )
  }
}

let classes = props => {
  return props.background
}

// Fallback for app background
let offlineBackground = (image) => {
  let html = document.documentElement;
  if(html){
    html.style.background =
      `linear-gradient(rgba(0, 150, 255, 0.8), rgba(62, 187, 154, 0.8)), url(${fieldRows})`;
    html.style.backgroundPosition = 'center';
    html.style.backgroundSize = 'cover';
  }
}

export default AppFrame;
