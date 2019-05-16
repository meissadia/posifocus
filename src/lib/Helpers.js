/**
 * Save a value to the app state by key
 * @param {string} key - Property Name
 * @param {any} value - Property Value
 * @param {boolean} log - Print debug info to Console
**/
export const sbk = (key, value, log = false) => {
  if (log) { console.log(`Set ${key}:${value}`) };
  this.setState({ [key]: value });
}

export const pathType = () => window.location.pathname.split('/').slice(-1)[0];


/**
 * Parse URL parameters
 */
export const parseUrl = str => {
  const urlParts = str.split('/');
  const result = {};
  const params = ['contacts', 'contact', 'priorities', 'priority', 'gratitudes', 'gratitude', 'relationships', 'relationship', 'tasks', 'task', 'project', 'projects', 'today'];
  const states = ['new', 'edit'];

  urlParts.forEach((part, idx, array) => {
    if (params.includes(part)) result[part] = array[idx + 1];
    if (states.includes(part)) result[part] = true;
  });

  return result;
};