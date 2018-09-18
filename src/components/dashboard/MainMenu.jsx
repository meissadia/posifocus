import React        from 'react';
import MenuItem     from './MenuItem'
import Submenu      from './MenuSubmenu'
import Colors       from '../../lib/Colors';
import '../../css/MainMenu.css';

class MainMenu extends React.Component {

  componentDidMount(){
    this.props.setBackground('base');
  }

  render(){
    return (
      <div id='main-menu'>
        <MenuItem
          icon='images/gratitudes@2x.png'
          title='Gratitudes'
          tagline='Because Grateful People Are Happy'
          link='/gratitudes'
          background={Colors.gratitudes}
          setBackground={this.props.setBackground}
          />
        <MenuItem
          icon='images/priorities@2x.png'
          title='Priorities'
          tagline='The Most Important Aspects of Your Life'
          link='/priorities'
          background={Colors.priorities}
          setBackground={this.props.setBackground}
          >
          <Submenu
            projCount={this.props.projectCount}
            taskCount={this.props.taskCount}
            />
        </MenuItem>
        <MenuItem
          icon='images/relationships@2x.png'
          title='Relationships'
          tagline='Forget Stocks. Invest in People.'
          link='/relationships'
          background={Colors.relationships}
          setBackground={this.props.setBackground}
          />
        <MenuItem
          icon='images/tasks@2x.png'
          title="Today's Tasks"
          tagline='Stay Focused, Make an Impact'
          link='/tasks/today'
          background={Colors.todays}
          setBackground={this.props.setBackground}
          />
        <a id='reset-state' href='/' onClick={this.props.reset} >
          Reset Data
        </a>
      </div>
    )
  }
}


// let MainMenu = (props) => {
//   return (
//     <div id='main-menu' onLoad={resetBackground.bind(null, props)}>
//       <MenuItem
//         icon='images/gratitudes@2x.png'
//         title='Gratitudes'
//         tagline='Because Grateful People Are Happy'
//         link='/gratitudes'
//         background={Colors.gratitudes}
//         setBackground={props.setBackground}
//         />
//       <MenuItem
//         icon='images/priorities@2x.png'
//         title='Priorities'
//         tagline='The Most Important Aspects of Your Life'
//         link='/priorities'
//         background={Colors.priorities}
//         setBackground={props.setBackground}
//         >
//         <Submenu
//           projCount={props.projectCount}
//           taskCount={props.taskCount}
//           />
//       </MenuItem>
//       <MenuItem
//         icon='images/relationships@2x.png'
//         title='Relationships'
//         tagline='Forget Stocks. Invest in People.'
//         link='/relationships'
//         background={Colors.relationships}
//         setBackground={props.setBackground}
//         />
//       <MenuItem
//         icon='images/tasks@2x.png'
//         title="Today's Tasks"
//         tagline='Stay Focused, Make an Impact'
//         link='/tasks/today'
//         background={Colors.todays}
//         setBackground={props.setBackground}
//         />
//       <a id='reset-state' href='/' onClick={props.reset} >
//         Reset Data
//       </a>
//     </div>
//   )
// }

export default MainMenu;
