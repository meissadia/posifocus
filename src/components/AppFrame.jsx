import React       from 'react';
import Colors from '../lib/Colors';

const AppFrame = (props) => {
  return (
    <div id='App' style={styles(props)}>
      { props.children }
    </div>
  )
}

let styles = props => ({
  background: props.background || Colors.blue_green
})

export default AppFrame;
