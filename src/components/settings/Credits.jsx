import React from 'react';
import PageNavigation from '../PageNavigation';
import '../../css/Credits.css';

const Credits = (props) => {
  return (
    <div className='credits'>
      <PageNavigation
        back={['/settings', 'Settings']}
        title='Credits'
        />
      <table>
        <caption>Resources</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Creator</th>
            <th>Found at</th>
            <th>License</th>
          </tr>
        </thead>
        <tbody>
          <Flaticon iconName="Bookmark" creator='freepik' />
          <Flaticon iconName="Cloud computing" creator='freepik' />
          <Flaticon iconName="Garbage" creator='freepik' />
          <Flaticon iconName="Logout" creator='elias-bikbulatov' />
          <Flaticon iconName="Pencil edit button" creator='freepik' />
          <Flaticon iconName="Reload" creator='kiranshastry' />
          <Flaticon iconName="Upload" creator='gregor-cresnar' />
          <Flaticon iconName="Back" creator='gregor-cresnar' />
          <Flaticon iconName="Left arrow angle..." creator='catalin-fertu' />
        </tbody>
      </table>
    </div>
  )
}

const Flaticon = (props) => (
  <tr className="flaticon-credit">
    <td>{props.iconName}</td>
    <td><a href={`https://www.flaticon.com/authors/${props.creator}`}>{props.creator}</a></td>
    <td><a href="https://www.flaticon.com/"     title="Flaticon">Flaticon</a></td>
    <td><a href="http://creativecommons.org/licenses/by/3.0/"  title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></td>
  </tr>
)

export default Credits;
