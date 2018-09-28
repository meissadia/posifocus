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
    gratitudes:[],
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

export function updateUserHeader(key, value){
  let userHeader = {...this.state.userHeader};
  userHeader[key] = value;
  this.setState({ userHeader });
  return null;
}

export function resetState(event){
  if(window.confirm('Erase all data?')) {
    this.setState(this.initState());
  };
}

export function addToStateArray(stateKey, value){
  var state = this.state[stateKey] || [];
  state.unshift(value);
  this.setState({ [stateKey]: state });
  return true;
}

export function deleteFromStateArray(stateKey, targetId){
  let state = this.state[stateKey] || [];
  let update = state.filter((e) => (e.id !== targetId));
  this.setState({ [stateKey]: update });
}

export function deleteProject(project_id){
  let projects = this.state.projects.filter((e) => (e.id !== project_id));
  let tasks = this.state.tasks.filter((e) => (e.project !== project_id));
  this.setState({ tasks, projects });
}

export function deletePriority(priority){
  let priorities = this.state.priorities.filter((e) => (e.id !== priority));
  let projects = this.state.tasks.filter((e) => (e.priority !== priority));
  let tasks = this.state.tasks.filter((e) => (e.priority !== priority));
  this.setState({ tasks, projects, priorities })
}

export function deleteRelationship(relationship){
  this.deleteFromStateArray('relationships', relationship);
  let contacts = this.state.contacts.filter((e) => (
    e.relationship !== relationship
  ));
  this.setState({ contacts });
}

export function taskToggle(event){
  let task_id = event.target.attributes.name.value;
  let task = this.getSingle('tasks', task_id);

  let attr = event.target.id.split('_')[0];
  task[attr] = event.target.checked;

  let index = this.state.tasks.findIndex((e, idx) => (e.id === task_id));
  if(index > -1) {
    let tasks = this.state.tasks;
    tasks[index] = task;
    this.setState({ tasks });
  }
}

export function getSingle(key, id){
  return this.state[key].filter((e) => (e.id === id))[0];
}

export function getProjects(priority){
  return this.state.projects.filter((e) => (e.priority === priority))
}

export function getTasks(project){
  return this.state.tasks.filter((e) => (e.project === project));
}

export function getContacts(relationship){
  if(!relationship) { return [] };

  return this.state.contacts.filter((e) => (
    e.relationship === relationship.id
  ));
}

export function saveStateToStorage(allowNewKey = true) {
  let prefix = "";
  let parent = this;
  let blacklist = ['update'];

  // loop through all of the parent's state
  for (let key in this.state) {
    // save item to storage if not on the blacklist
    let prefixWithKey = `${prefix}_${key}`;
    if (blacklist.indexOf(key) < 0 && allowNewKey) {
      localStorage.setItem(prefixWithKey, JSON.stringify(parent.state[key]));
    }
  }
}
