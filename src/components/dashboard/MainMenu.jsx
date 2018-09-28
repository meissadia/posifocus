import React             from 'react';
import MenuItem          from './MenuItem';
import Submenu           from './MenuSubmenu';
import Colors            from '../../lib/Colors';
import gratitudesIcon    from '../../images/gratitudes@2x.png';
import prioritiesIcon    from '../../images/priorities@2x.png';
import tasksIcon         from '../../images/tasks.svg';
import settingsIcon      from '../../images/settings.svg';
import { faUsers }       from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/MainMenu.css';




class MainMenu extends React.Component {

  componentDidMount(){
    this.props.setBackground('base');
  }

  render(){
    return (
      <div id='main-menu'>
        <MenuItem
          icon={gratitudesIcon}
          title='Gratitudes'
          tagline='Because Grateful People Are Happy'
          link='/gratitudes'
          background={Colors.gratitudes}
          setBackground={this.props.setBackground}
          />
        <MenuItem
          icon={prioritiesIcon}
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
          faIcon={<FontAwesomeIcon icon={faUsers} size='3x'/>}
          title='Relationships'
          tagline='Forget Stocks. Invest in People.'
          link='/relationships'
          background={Colors.relationships}
          setBackground={this.props.setBackground}
          />
        <MenuItem
          icon={tasksIcon}
          iconInvert={true}
          title="Today's Tasks"
          tagline='Stay Focused, Make an Impact'
          link='/tasks/today'
          background={Colors.todays}
          setBackground={this.props.setBackground}
          />
        <MenuItem
          icon={settingsIcon}
          title="Settings"
          tagline='Cloud Sync'
          link='/settings'
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

export default MainMenu;
