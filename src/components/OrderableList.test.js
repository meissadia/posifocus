import React from 'react';
import { shallow } from 'enzyme';
import OrderableList from './OrderableList';

describe('OrderableList', () => {
    it('renders', () => {
        shallow(<OrderableList />);
    });

    it('is empty without items', () => {
        const items = [];
        const wrapper = shallow(<OrderableList items={items} />);
        
        expect(wrapper.find('.all-slides').length).toEqual(0);
    });

    it('renders with items', () => {
        const items = [1, 2, 3];
        const wrapper = shallow(<OrderableList items={items} />);
        
        expect(wrapper.find('.all-slides').length).toEqual(1);
        expect(wrapper.find('.slide').length).toEqual(items.length);
    });
});