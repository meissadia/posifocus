import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import App from './App';
import { get } from 'lodash';
import { JSDOM } from "jsdom"

/**
 * Jest: Custom matcher to get more informative error message
 */
expect.extend({
  toRender(wrapper, component) {
    const pass = wrapper.find(component).length >= 1
    if (pass) {
      return {
        pass: true,
      };
    } else {
      return {
        message: () => `Component { ${component} } was not rendered`,
        pass: false,
      };
    }
  },
});

/**
 * Navigate to URL
 * @param {EnzymeWrapper} wrapper 
 * @param {String} url 
 */
const navigateToUrl = (wrapper, url) => wrapper.find('Router').props().history.push(url);

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

  it('saves New data', () => {
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

    const readData = key => wrapper.find('App').state(key); // Read Wrapper State

    // Generate path using cached IDs
    const addVars = path => {
      return path.split('/')
        .map(part => idCache[part.replace(':', '')] || part)
        .join('/');
    }

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

      expect(readData(stateKey).length).toBe(0);  // Each collection should start empty

      navigateToUrl(wrapper, addVars(path));
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

      const collection = readData(stateKey);
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
    })
  });
})
