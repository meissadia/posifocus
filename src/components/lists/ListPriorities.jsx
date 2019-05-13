import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/css/ListViews.css'
import Colors from '../../lib/Colors';
import PageNavigation from '../PageNavigation';
import { GlobalContext } from '../App';
import List from './List';

const Priorities = props => {
  const sectionTitle = 'priorities';

  const destroy = (destroyer, event) => {
    event.preventDefault();
    destroyer(event.target.attributes.jsvalue.value);
  }

  const edit = (event) => {
    const id = event.target.attributes.jsvalue.value;
    const url = `/${sectionTitle}/${id}/edit`;
    props.history.push(url);
  }

  return (
    <GlobalContext.Consumer>
      {({ state, functions, location }) => {
        const { priorities } = state;
        const { deletePriority } = functions;

        return (
          <List section={sectionTitle}
            className='route-transition exit-right'
            instructions={{ display: priorities.length === 0 }}
            data={priorities}
            delete={destroy.bind(null, deletePriority)}
            edit={edit}
            makeLink={item => (`/priority/${item.id}/projects`)}
            location={location}
            background={Colors[sectionTitle]}
            itemType='deep'
          >
            <PageNavigation
              back={['/', 'Dashboard']}
              title='Priorities'
              add={[`/${sectionTitle}/new`]}
            />
          </List>);
      }}
    </GlobalContext.Consumer>
  )
}

export default withRouter(Priorities);
