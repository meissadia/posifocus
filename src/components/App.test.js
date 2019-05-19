import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { get } from 'lodash';
import { JSDOM } from 'jsdom';

import {
  CustomMatchers, InitTestState,
  navigateToUrl, readAppStateByKey, readPathVars,
} from '../lib/TestHelpers';
import { addVars } from '../lib/Helpers';
import App from './App';

expect.extend(CustomMatchers); // Add custom assertions

/** Helper Methods **/
const buildWrapper = ({ path }) => mount(
  <MemoryRouter initialEntries={[path || '/']}>
    <App />
  </MemoryRouter>
);

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
      const wrapper = buildWrapper({ path });

      expect(wrapper).toRender(component);
    })
  });

  it('renders Section content', () => {
    const routes = [
      // [Component, Path]
      ['Gratitudes', '/gratitudes'],
      ['Priorities', '/priorities'],
      ['Relationships', '/relationships'],
      ['Tasks', '/tasks/priority/:priorities/projects/:projects'],
      ['TodaysTasks', '/tasks/today'],
      ['Projects', '/priority/:priorities/projects'],
      ['Contacts', '/relationship/:relationships/contacts'],
    ];

    routes.forEach(route => {
      let [component, path] = route;
      path = addVars(path, readPathVars(InitTestState));
      const wrapper = buildWrapper({ path });
      wrapper.find('App').setState(InitTestState); // Seed App with test data 

      expect(wrapper).toRender(component);

      const classname = wrapper.find('#list li').first().props().className;
      expect(classname).not.toBe('instructions');
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
      const wrapper = buildWrapper({ path });

      expect(wrapper).toRender(component);
    })
  });

  it('Creates new data', () => {
    const routes = [
      ['NewGratitude', '/gratitudes/new', 'gratitudes'],
      ['NewPriority', '/priorities/new', 'priorities'],
      ['NewProject', '/priority/:priorities/projects/new', 'projects'],
      ['NewTask', '/tasks/priority/:priorities/projects/:projects/new', 'tasks'],
      ['NewRelationship', '/relationships/new', 'relationships'],
      ['NewContact', '/relationship/:relationships/contacts/new', 'contacts'],
    ];

    const wrapper = buildWrapper({});

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
        priority: { value: get(idCache, 'priorities', 'priority') },
        project: { value: get(idCache, 'projects', 'project') },
        relationship: { value: get(idCache, 'relationships', 'relationship') },
        title: { value: 'title' },
        url: { value: wrapper.find('Router').props().history.location.pathname },
        today: { checked: true },
        done: { checked: false },
      }

      // Each collection should start empty
      expect(readAppStateByKey(wrapper, stateKey).length).toBe(0);

      navigateToUrl(wrapper, addVars(path, idCache));

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

      // TODO: Verify exit navigation (location)

      idCache[stateKey] = currentItem.id; // Save latest IDs
    }); // end routes

    // console.log('Test Data: App State');
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
      const wrapper = buildWrapper({ path });

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

    const wrapper = buildWrapper({});

    // Load test data and verify that it's set
    wrapper.find('App').setState(InitTestState);
    expect(readAppStateByKey(wrapper, 'gratitudes').length).toBe(1);

    // FIXME: Tests for relationships?
    const unverifiedFields = ['id', 'date', 'priority', 'project', 'relationship'];

    const pathVars = {};
    routes.forEach(route => pathVars[route[2]] = readAppStateByKey(wrapper, route[2])[0].id);

    const dom = new JSDOM()
    global.document = dom.window.document
    global.window = dom.window

    routes.forEach(route => {
      const [, path, stateKey] = route;

      navigateToUrl(wrapper, addVars(path, pathVars));

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

  it('deletes Models', () => {
    const pathVars = {};
    const routes = [
      /*[Component, Path, StateKey, ShouldBeEmpty]*/
      ['Gratitude', '/gratitudes/', 'gratitudes', ['gratitudes']],
      ['Priority', '/priorities/', 'priorities', ['priorities', 'projects', 'tasks']],
      ['Project', '/priority/:priorities/projects/', 'projects', ['projects', 'tasks']],
      ['Task', '/tasks/priority/:priorities/projects/:projects/', 'tasks', ['tasks']],
      ['Relationship', '/relationships/', 'relationships', ['relationships', 'contacts']],
      ['Contact', '/relationship/:relationships/contacts/', 'contacts', ['contacts']],
    ];

    routes.forEach(route => {
      const [, path, stateKey, shouldBeEmpty] = route;
      const wrapper = buildWrapper({});

      wrapper.find('App').setState(InitTestState); // Seed App with test data 
      routes.forEach(route =>                      // Load pathVars
        pathVars[route[2]] = readAppStateByKey(wrapper, route[2])[0].id);

      navigateToUrl(wrapper, addVars(path, pathVars));

      const collection = readAppStateByKey(wrapper, stateKey);
      expect(collection.length).toBe(1);  // Verify there's data to delete

      wrapper.find(`ListIcon[name="delete"] img`).first().simulate('click');
      wrapper.update(); // Click delete icon

      // Verify all related collections have been updated
      shouldBeEmpty.forEach(x => {
        const collection = readAppStateByKey(wrapper, x);
        expect(collection.length).toBe(0);
      });

    });
  });
})
