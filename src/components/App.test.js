import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { JSDOM } from "jsdom";
import App from './App';
import { InitTestState } from '../lib/InitTestState';

/**
 * Jest: Custom matcher to get more informative error message
 */
expect.extend({
  toRender(wrapper, component) {
    const pass = wrapper.find(component).length >= 1
    if (pass) return { pass: true };
    else {
      return {
        message: () => `Component { ${component} } was not rendered`,
        pass: false,
      };
    }
  },
});

/**
 * Helper Methods
 */
const navigateToUrl = (wrapper, url) => wrapper.find('Router').props().history.push(url);
const readAppStateByKey = (wrapper, key) => wrapper.find('App').state(key);
const getAppState = wrapper => wrapper.find('App').state();

// Inject path with test-generated values
const addVars = (path, vars) =>
  path.split('/')
    .map(part => {
      if (!part.includes(':')) return part;
      return vars[part.replace(':', '')]
    })
    .join('/');

describe('App', () => {
  it('renders Section routes', () => {
    const routes = [
      // [Component, Path]
      ['Dashboard', '/index.html'],
      ['Settings', '/settings'],
      ['Credits', '/settings/credits'],
      ['Gratitudes', '/gratitudes'],
      ['Priorities', '/priorities'],
      ['Relationships', '/relationships'],
      ['Tasks', '/tasks/priority/1/projects/1'],
      ['TodaysTasks', '/tasks/today'],
      ['Projects', '/priority/1/projects'],
      ['Contacts', '/relationship/1/contacts'],
    ];

    routes.forEach(route => {
      const [component, path] = route;
      const wrapper = mount(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>
      );

      expect(wrapper).toRender(component);
    })
  });

  it('renders Create routes', () => {
    const routes = [
      ['NewGratitude', '/gratitudes/new'],
      ['NewPriority', '/priorities/new'],
      ['NewProject', '/priority/:priority/projects/new'],
      ['NewTask', '/tasks/priority/:priority/projects/:projects/new'],
      ['NewRelationship', '/relationships/new'],
      ['NewContact', '/relationship/:relationship/contacts/new'],
    ];

    routes.forEach(route => {
      const [component, path] = route;
      const wrapper = mount(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>
      );

      expect(wrapper).toRender(component);
    })
  });

  it('creates New data', () => {
    const routes = [
      ['NewGratitude', '/gratitudes/new', 'gratitudes'],
      ['NewPriority', '/priorities/new', 'priorities'],
      ['NewProject', '/priority/:priorities/projects/new', 'projects'],
      ['NewTask', '/tasks/priority/:priorities/projects/:projects/new', 'tasks'],
      ['NewRelationship', '/relationships/new', 'relationships'],
      ['NewContact', '/relationship/:relationships/contacts/new', 'contacts'],
    ];

    const wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const idCache = {}; // Track a the latest live id for each Model
    const unverifiedFields = ['id', 'date']; // FIXME: Test properly

    const dom = new JSDOM()
    global.document = dom.window.document
    global.window = dom.window

    routes.forEach(route => {
      const [, path, stateKey] = route;
      global.document.gform = {
        content: { value: 'content' },
        date: { value: 'date' },
        priority: { value: 'priority' },
        project: { value: 'project' },
        relationship: { value: 'relationship' },
        title: { value: 'title' },
        url: { value: wrapper.find('Router').props().history.location.pathname },
        today: { checked: true },
        done: { checked: false },
      }

      expect(readAppStateByKey(wrapper, stateKey).length).toBe(0);  // Each collection should start empty

      navigateToUrl(wrapper, addVars(path, idCache));
      wrapper.update();

      /**
       * FIXME
       *  Why are we getting double component rendering?
       *  - TransitionGroups?
       *  - Poorly implemented route nesting?
       */
      // console.log(wrapper.find(component).debug());
      // wrapper.find('form[name="gform"]').simulate('submit');
      wrapper.find('form[name="gform"]').first().simulate('submit');
      wrapper.update();

      const collection = readAppStateByKey(wrapper, stateKey);
      const currentItem = collection[0]; //I think we prepend new elements
      expect(collection.length).toBe(1);

      // Verify Model data matches test input data
      Object.keys(currentItem).forEach(key => {
        if (unverifiedFields.includes(key)) return true;
        const { value, checked } = global.document.gform[key];

        expect(currentItem[key]).toEqual(value || checked);
      });

      // Save latest IDs
      idCache[stateKey] = currentItem.id;
    }); // end routes

    // console.log('Test Data: App State
    // console.log(JSON.stringify(getAppState(wrapper)));
  });

  it('renders Edit routes', () => {
    const routes = [
      ['EditGratitude', '/gratitudes/edit'],
      ['EditPriority', '/priorities/edit'],
      ['EditProject', '/priority/1/projects/edit'],
      ['EditRelationship', '/relationships/edit'],
      ['EditTask', '/tasks/priority/1/projects/1/edit'],
      ['EditContact', '/relationship/1/contacts/edit'],
    ];

    routes.forEach(route => {
      const [component, path] = route;
      const wrapper = mount(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>
      );

      expect(wrapper).toRender(component);
    })
  });

  it('saves Edited data', () => {
    const routes = [
      ['EditGratitude', '/gratitudes/:gratitudes/edit', 'gratitudes'],
      ['EditPriority', '/priorities/:priorities/edit', 'priorities'],
      ['EditProject', '/priority/:priorities/projects/:projects/edit', 'projects'],
      ['EditTask', '/tasks/:tasks/priority/:priorities/projects/:projects/edit', 'tasks'],
      ['EditRelationship', '/relationships/:relationships/edit', 'relationships'],
      ['EditContact', '/relationship/:relationships/contacts/:contacts/edit', 'contacts'],
    ];

    const wrapper = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // Load test data and verify that it's set
    wrapper.find('App').setState(InitTestState);
    expect(readAppStateByKey(wrapper, 'gratitudes').length).toBe(1);

    // FIXME: Tests for relationships?
    const unverifiedFields = ['id', 'date', 'priority', 'project', 'relationship'];

    const idCache = {};
    routes.forEach(route => idCache[route[2]] = readAppStateByKey(wrapper, route[2])[0].id);

    const dom = new JSDOM()
    global.document = dom.window.document
    global.window = dom.window

    routes.forEach(route => {
      const [, path, stateKey] = route;

      navigateToUrl(wrapper, addVars(path, idCache));
      wrapper.update();

      global.document.gform = {
        content: { value: 'edited_content' },
        date: { value: 'edited_date' },
        priority: { value: 'edited_priority' },
        project: { value: 'edited_project' },
        relationship: { value: 'edited_relationship' },
        title: { value: 'edited_title' },
        url: { value: wrapper.find('Router').props().history.location.pathname },
        today: { checked: true },
        done: { checked: false },
      }

      wrapper.find('form[name="gform"]').first().simulate('submit');
      wrapper.update();

      const collection = readAppStateByKey(wrapper, stateKey);
      const currentItem = collection[0];
      expect(collection.length).toBe(1);

      // Verify Model data matches test input data
      Object.keys(currentItem).forEach(key => {
        if (unverifiedFields.includes(key)) return true;
        const { value, checked } = global.document.gform[key];

        expect(currentItem[key]).toEqual(value || checked);
      });

    });

  });
})
