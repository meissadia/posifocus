import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/ListViews.css'
import Colors from '../../lib/Colors';
import NewGratitude from '../create/NewGratitude';
import EditGratitude from '../edit/EditGratitude';
import PageNavigation from '../PageNavigation';
import List, { ListHOC } from './List';

const Gratitudes = props => {
  const getId = () => props.location.pathname.split('/')[2];

  if (props.isNew(props)) return <NewGratitude />;
  if (props.isEdit(props)) return <EditGratitude gid={getId()} />;

  return (
    <List section={props.sectionTitle}
      className='route-transition exit-right'
      instructions={{ display: props.data.length === 0 }}
      data={props.data}
      delete={props.destroy}
      edit={props.showEditor}
      location={props.location}
      background={Colors[props.sectionTitle]}
      itemType='shallow'
    >
      <PageNavigation
        back={['/', 'Dashboard']}
        title='Gratitudes'
        add={['/gratitudes/new']}
      />
    </List>
  );
};

export default withRouter(ListHOC(Gratitudes, 'gratitudes'));
