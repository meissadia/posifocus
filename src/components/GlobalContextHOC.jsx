import React from 'react';
import { GlobalContext } from './App';

/**
 * Simplify tapping into GlobalContext
 * @param {Component} WrappedComponent
 */
const withGlobalContext = WrappedComponent => {
    return class extends React.Component {
        render = () => (
            <GlobalContext.Consumer>
                {({ state, functions, urlParams }) => (
                    <WrappedComponent
                        state={state}
                        functions={functions}
                        urlParams={urlParams}
                        {...this.props}
                    />
                )}
            </GlobalContext.Consumer>
        );
    };
};

export default withGlobalContext;