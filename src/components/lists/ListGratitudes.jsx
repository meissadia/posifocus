import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/ListViews.css'
import Colors from '../../lib/Colors';
import NewGratitude from '../create/NewGratitude';
import EditGratitude from '../edit/EditGratitude';
import PageNavigation from '../PageNavigation';
import List from './List';
import ListHOC from './ListHOC';
import withGlobalContext from '../GlobalContextHOC';

const Gratitudes = props => {
  const { isNew, isEdit } = props;

  if (isNew(props)) return <NewGratitude />;
  if (isEdit(props)) return <EditGratitude />;

  return (
    <List section={props.sectionTitle}
      className='route-transition exit-right'
      instructions={{ display: props.data.length === 0 }}
      data={props.data}
      delete={props.destroy}
      edit={props.showEditor}
      location={props.location}
      background={Colors[props.sectionTitle]}
      update={props.update}
      itemType='shallow'
    >
      <PageNavigation
        back={['/', 'Dashboard']}
        title='Gratitudes'
        add={['/gratitudes/new']}
        hideHome={true}
      />
    </List>
  );
};

export default withRouter(withGlobalContext(ListHOC(Gratitudes, 'gratitudes')));
