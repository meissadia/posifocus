import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/ListViews.css'
import Colors from '../../lib/Colors';
import PageNavigation from '../PageNavigation';
import { GlobalContext } from '../App';
import List from './List';

const Gratitudes = (props) => {
  const sectionTitle = 'gratitudes';

  const deleteHandler = (handler, event) => handler(
    sectionTitle, 
    event.target.attributes.jsvalue.value
  );

  const editHandler = (event) => {
    const id = event.target.attributes.jsvalue.value;
    const url = `/${sectionTitle}/${id}/edit`;
    props.history.push(url);
  }

  return (
    <GlobalContext.Consumer>
      {({ state, functions, location }) => {
        return (
          <List section={sectionTitle}
            className='route-transition exit-right'
            instructions={{ display: state.gratitudes.length === 0 }}
            data={state.gratitudes}
            delete={deleteHandler.bind(null, functions.deleteFromStateArray)}
            edit={editHandler}
            location={location}
            background={Colors[sectionTitle]}
            itemType='shallow'
          >
            <PageNavigation
              back={['/', 'Dashboard']}
              title='Gratitudes'
              add={['/gratitudes/new']}
            />
          </List>
        )
      }}
    </GlobalContext.Consumer>
  );
};

export default withRouter(Gratitudes);
