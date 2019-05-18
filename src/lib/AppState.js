// Initial State for App
export function initState() {
  return ({
    userHeader: {
      user_name: '',
      user_image: '',
      user_tagline: ''
    },
    style: {
      background: ''
    },
    gratitudes: [],
    priorities: [],
    projects: [],
    tasks: [],
    relationships: [],
    contacts: [],
    online: true,
    update: false,
    authUser: null,
  })
}

// setState callback
export function updateStateHandler(newState) {
  this.setState({ ...newState });
}

/**
 * Update User Header Information
 * @param {string} key - Property Name
 * @param {any} value - Property Value
**/
export function updateUserHeader(key, value) {
  const userHeader = { ...this.state.userHeader };
  userHeader[key] = value;
  this.setState({ userHeader });
  return null;
}

/**
 * Reset Application State with Confirmation
**/
export function resetState(event) {
  if (window.confirm('Erase all Local data?')) {
    this.setState(initState());
    return true;
  };
}

/**
 * Prepend an item to an array stored in State
 * @param {string} stateKey - array name
 * @param {object} value - item to prepend
**/
export function addToStateArray(stateKey, value) {
  const state = this.state[stateKey] || [];
  state.unshift(value);
  this.setState({ [stateKey]: state });
  return true;
}

/**
 * Delete an item from an array stored in State
 * @param {string} stateKey - array name
 * @param {number} targetId - id of target
**/
export function deleteFromStateArray(stateKey, targetId) {
  const state = this.state[stateKey] || [];
  const update = state.filter((e) => (e.id !== targetId));
  this.setState({ [stateKey]: update });
}

/**
 * Delete a Project by id
 * @param {number} project - Target ID
**/
export function deleteProject(project) {
  const projects = this.state.projects.filter((e) => (e.id !== project));
  const tasks = this.state.tasks.filter((e) => (e.project !== project));
  this.setState({ tasks, projects });
}

/**
 * Delete a Priority along with it's related Projects and Tasks
 * @param {number} priority - Target ID
**/
export function deletePriority(priority) {
  const priorities = this.state.priorities.filter((e) => (e.id !== priority));
  const projects = this.state.projects.filter((e) => (e.priority !== priority));
  const tasks = this.state.tasks.filter((e) => (e.priority !== priority));
  this.setState({ tasks, projects, priorities })
}

/**
 * Delete a Relationship and it's related Contacts
 * @param {number} relationship - Target ID
**/
export function deleteRelationship(relationship) {
  const relationships = this.state.relationships.filter((e) => (e.id !== relationship));
  const contacts = this.state.contacts.filter((e) => (
    e.relationship !== relationship
  ));
  this.setState({ contacts, relationships });
}

/**
 * Event Handler for Task toggle switches
**/
export function taskToggle(search, event) {
  const task_id = event.target.attributes.name.value;
  const task = search('tasks', task_id);

  const attr = event.target.id.split('_')[0];
  task[attr] = event.target.checked;

  const index = this.state.tasks.findIndex(e => e.id === task_id);
  if (index > -1) {
    const tasks = this.state.tasks;
    tasks[index] = task;
    this.setState({ tasks });
  }
}

/**
 * Retrieve an item from a State array by ID
 * @param {string} key - Array Name
 * @param {number} id - Target ID
**/
export function getSingle(key, id) {
  return this.state[key].filter((e) => (e.id === id))[0];
}

/**
 * Update an item in a State array by ID
 * @param {string} key - Array Name
 * @param {object} item - Item to Update
 * @param {number} item.id - Target ID
**/
export function updateSingle(key, item) {
  this.setState(state => {
    const index = state[key].findIndex((elem) => elem.id === item.id);
    if (index >= 0) {
      const updated = state[key].slice();
      updated[index] = item;
      return { [key]: updated };
    }
  })
}

/**
 * Retrieve the Projects related to a Priority
 * @param {number} priority - Priority ID
**/
export function getProjects(priority) {
  return this.state.projects.filter((e) => (e.priority === priority))
}

/**
 * Retrieve the Tasks related to a Project
 * @param {number} project - Project ID
**/
export function getTasks(project) {
  return this.state.tasks.filter((e) => (e.project === project));
}

/**
 * Retrieve the Contacts related to a Relationship
 * @param {number} relationship - Relationship ID
**/
export function getContacts(relationship) {
  if (!relationship) { return [] };

  return this.state.contacts.filter((e) => (
    e.relationship === relationship.id
  ));
}

/**
 * Save Application State to localStorage
 * @param {boolean} allowNewKey - Enable storage
**/
export function saveStateToStorage(allowNewKey = true) {
  // FIXME: Added to make tests pass.  
  // Need to understand why this worked fine before.
  var local_storage = window && window.localStorage;
  if (!local_storage) return;

  const prefix = "";
  const parent = this;
  const blacklist = ['update'];

  // loop through all of the parent's state
  for (let key in this.state) {
    // save item to storage if not on the blacklist
    let prefixWithKey = `${prefix}_${key}`;
    if (blacklist.indexOf(key) < 0 && allowNewKey) {
      local_storage.setItem(prefixWithKey, JSON.stringify(parent.state[key]));
    }
  }
}
