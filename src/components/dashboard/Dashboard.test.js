import { shallow } from 'enzyme';
import React from 'react';

import { CustomMatchers, print } from '../../lib/TestHelpers';
expect.extend(CustomMatchers); // Add custom assertions

import Dashboard from './Dashboard';

describe('Dashboard', () => {
    it('renders everything', () => {
        const wrapper = shallow(<Dashboard />);

        expect(wrapper).toRender('UserHeader');
        expect(wrapper).toRender('ConnectedStatBar');
        expect(wrapper).toRender('ConnectedMainMenu');
        expect(wrapper).toRender('Version');
    })
});