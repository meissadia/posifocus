import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
    it('renders everything', () => {
        const wrapper = shallow(<Dashboard />);
        expect(wrapper.find('UserHeader').length).toBe(1);
        expect(wrapper.find('MainMenu').length).toBe(1);
        expect(wrapper.find('Version').length).toBe(1);
        expect(wrapper.children().length).toBe(4); // StatBar rendering as Component?
    })
});