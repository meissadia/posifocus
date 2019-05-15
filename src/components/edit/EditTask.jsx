import React from 'react';
import { withRouter } from 'react-router-dom';
import Toggle from 'react-toggle';
import PageNavigation from '../PageNavigation';
import { parseDate, dateInputDefault } from '../../lib/FormHelpers';
import '../../styles/css/FormView.css';
import '../../styles/css/ReactToggle.css';
import { GlobalContext } from '../App';

const EditTask = props => {
  const section = 'tasks';

  const save = (item, update, event) => {
    event.preventDefault();
    const { title, today, date, done } = document.gform
    const edited = {
      id: item.id,
      priority: item.priority,
      project: item.project,
      title: title.value || title.attributes.placeholder.value,
      today: today.checked,
      done: done.checked,
      date: parseDate(date.value)
    }

    update(section, edited);
    props.history.push({
      pathname: cancelLink(null, item),
      state: { enter: 'enter-left' }
    });
  }

  const cancelLink = item => {
    if (props.todays) {
      return '/tasks/today';
    } else {
      const { priority, project } = item;
      return `/priority/${priority}/project/${project}/tasks`;
    }
  }

  const backLink = item => {
    if (props.todays) {
      return '/';
    } else {
      const { priority } = item;
      return `/priority/${priority}/projects`;
    }
  }

  const backTitle = () => props.todays ? 'Dashboard' : 'Projects';

  return (
    <GlobalContext.Consumer>
      {({ functions }) => {
        const { getSingle, updateSingle } = functions;
        const currentItem = getSingle(section, props.match.params.id) || {};

        return (
          <div className='new-input-wrapper route-transition enter-bottom exit-bottom'>
            <PageNavigation
              back={[backLink(currentItem), backTitle()]}
              title='Edit Task'
              add={[{ pathname: cancelLink(currentItem), state: { enter: 'enter-bottom' } }, '< Cancel >']}
            />
            <form
              name='gform'
              className='g-form'
              onSubmit={save.bind(null, currentItem, updateSingle)}
            >
              <label htmlFor="title" className='center'>
                What Task Must Be Done to Complete this Project?
              </label>
              <input
                type="text"
                name="title"
                autoComplete="off"
                placeholder="Send Party Invite..."
                defaultValue={currentItem.title}
              />
              <label className='flex row form-toggle' htmlFor="today">
                <Toggle
                  id='today'
                  defaultChecked={currentItem.today} />
                <span>On Today's Task List?</span>
              </label>
              <label className='flex row form-toggle' htmlFor="done">
                <Toggle
                  id='done'
                  defaultChecked={currentItem.done} />
                <span>Done?</span>
              </label>
              <label htmlFor='date-input'>Date:</label>
              <input
                id='date-input'
                type="date"
                name="date"
                defaultValue={dateInputDefault(currentItem.date)}
              />
              <input id='submit-button' type="submit" name="submit" value="Save" />
            </form>
          </div>)
      }}
    </GlobalContext.Consumer>

  )
}

export default withRouter(EditTask);