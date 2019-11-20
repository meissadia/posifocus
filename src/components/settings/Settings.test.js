import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import Settings from './Settings';
import { GlobalContext } from '../GlobalContextHOC';

const providerValue = {
    state: {
        authUser: 'Meis',
    },
    functions: {
        updateUserHeader: jest.fn(),
        updateStateHandler: jest.fn()
    }
}

describe('Settings', () => {
    it('renders', () => {
        shallow(<Settings />)
    });

    it('debug', () => {
        const wrapper = mount(
            <GlobalContext.Provider value={providerValue}>
                <MemoryRouter>
                    <Settings />
                </MemoryRouter>
            </GlobalContext.Provider>
        )
    });
});