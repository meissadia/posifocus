import React from 'react';

export const GlobalContext = React.createContext({
    state: {},
    functions: {}
});

/**
 * Simplify tapping into GlobalContext
 * @param {Component} WrappedComponent
 */
export const withGlobalContext = WrappedComponent => {
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