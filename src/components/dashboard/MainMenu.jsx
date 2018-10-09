import React             from 'react';
import MenuItem          from './MenuItem';
import Submenu           from './MenuSubmenu';
import gratitudesIcon    from '../../images/gratitudes@2x.png';
import prioritiesIcon    from '../../images/priorities@2x.png';
import tasksIcon         from '../../images/tasks.svg';
import relationshipsIcon from '../../images/relationships.svg';
import settingsIcon      from '../../images/settings.svg';
import '../../styles/css/MainMenu.css';

class MainMenu extends React.Component {

  render(){
    return (
      <div id='main-menu'>
        <MenuItem
          icon={gratitudesIcon}
          title='Gratitudes'
          tagline='Because Grateful People Are Happy'
          link='/gratitudes'
          />
        <MenuItem
          icon={prioritiesIcon}
          title='Priorities'
          tagline='The Most Important Aspects of Your Life'
          link='/priorities'
          >
          <Submenu
            projCount={this.props.projectCount}
            taskCount={this.props.taskCount}
            />
        </MenuItem>
        <MenuItem
          icon={relationshipsIcon}
          title='Relationships'
          tagline='Forget Stocks. Invest in People.'
          link='/relationships'
          />
        <MenuItem
          icon={tasksIcon}
          title="Today's Tasks"
          tagline='Stay Focused, Make an Impact'
          link='/tasks/today'
          />
        <MenuItem
          icon={settingsIcon}
          title="Settings"
          tagline='Cloud Sync'
          link='/settings'
          />
      </div>
    )
  }
}

export default MainMenu;
