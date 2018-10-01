import React          from 'react';
import PageNavigation from '../PageNavigation';
import List           from './List';
import Colors         from '../../lib/Colors';
import '../../css/ListViews.css'

function Gratitudes(props) {
  let sectionTitle = 'gratitudes'

  let showInstructions = props.data.length === 0;
  let deleteHandler = (event) => {
    event.preventDefault();
    props.delete(sectionTitle, event.target.attributes.jsvalue.value);
  }

  return (
    <List section={sectionTitle}
      className='route-transition exit-right'
      instructions={{ display: showInstructions }}
      data={props.data}
      delete={deleteHandler}
      location={props.location}
      background={Colors.gratitudes}
      setBackground={props.setBackground}
      itemType='shallow'
      >
      <PageNavigation
        back={['/', 'Dashboard']}
        title='Gratitudes'
        add={['/gratitudes/new']}
        />
    </List>
  )
}

export default Gratitudes;
