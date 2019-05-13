import React from 'react';
import { shallow } from 'enzyme';
import StatBar from './StatBar';

describe('StatBar', () => {
    it('renders', () => {
       shallow(<StatBar />);
    })
});