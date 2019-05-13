import React from 'react';
import { mount, shallow } from 'enzyme';
import UserHeader from './UserHeader';
import { GlobalContext } from '../../components/App';


const baseData = {
    user_image: 'user_image',
    user_name: 'user_name',
    user_tagline: 'user_tagline',
};

const userContext = {
    user_image: 'context_user_image',
    user_name: 'context_user_name',
    user_tagline: 'context_user_tagline',
};

const providerValue = {
    state: {
        userHeader: {...userContext},
    },
    functions: {
        updateUserHeader: jest.fn()
    }
}

describe('UserHeader', () => {
    it('renders', () => {
        shallow(<UserHeader data={baseData}/>);
    });

    it('gets data from Context', () => {
        const wrapper = mount(
                <GlobalContext.Provider value={providerValue}>
                    <UserHeader />
                </GlobalContext.Provider>
        );
        
        expect(wrapper.find('#userImage').prop('src')).toBe('context_user_image');
        expect(wrapper.find('#userText input').prop('value')).toBe('context_user_name');
        expect(wrapper.find('#userText textarea').prop('value')).toBe('context_user_tagline');
    });

});
