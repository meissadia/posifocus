import React from 'react';
import PageNavigation from './PageNavigation';

export const InputFormPageNav = ({ pathname }) => (
    <PageNavigation back={[{
        pathname,
        state: { enter: 'enter-bottom' },
        showIcon: 'no'
    },
    <div className='cancel-icon'>✕</div>
    ]} />
);
