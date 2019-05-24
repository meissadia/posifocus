import { get } from 'lodash';
import { arrayMove } from '../../lib/arrayMove';

/* Simplifies makeLink functionality */
export const dummy = () => false;

/**
* The direction of the next transition enter-animation direction
* for the next route-transition can be controlled through Location's state.
* `props.location.state.enter`
*/
export const withEnterDirection = (props, classname) => {
    const direction = get(props, 'location.state.enter', 'enter-right');
    return [props.section, props.className, classname, direction].join(' ');
}

/**
 * Updates sort order of a collection
 * @param {Object} props 
 * @param {Object} sortableContainerNextState 
 */
export const updateSortedCollection = (props, { oldIndex, newIndex }) => {
    const { data, section } = props;
    const mappedSection = section === 'todays' ? 'tasks' : section;

    props.update({
        [mappedSection]: arrayMove(data, oldIndex, newIndex),
    })
}
