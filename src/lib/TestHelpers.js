/** 
 * Test Helpers
 **/

export const CustomMatchers = {
    toRender(wrapper, component) {
        const pass = wrapper.find(component).length >= 1
        if (pass) return { pass: true };
        else {
            return {
                message: () => `Component { ${component} } was not rendered`,
                pass: false,
            };
        };
    },
}

/**
 * Navigate a Wrapper to a URL
 * @param {EnzymeWrapper} wrapper 
 * @param {String} url 
 */
export const navigateToUrl = (wrapper, url) => {
    wrapper.find('Router').props().history.push(url);
    wrapper.update();
}

/**
 * Read the App component's state by key
 * @param {EnzymeWrapper} wrapper 
 * @param {String} key 
 */
export const readAppStateByKey = (wrapper, key) => wrapper.find('App').state(key);

/**
 * Get the App component's state
 * @param {EnzymeWrapper} wrapper
 */
export const getAppState = wrapper => wrapper.find('App').state();

/**
 * Print out the Wrapper
 * @param {EnzymeWrapper} wrapper
 */
export const print = wrapper => console.log(wrapper.debug());

/**
 * Extract Test IDs from the Wrapper state
 * @param {EnzymeWrapper} wrapper
 */
export const readWrapperPathVars = wrapper => {
    const keys = ['gratitudes', 'priorities', 'projects', 'tasks', 'relationships', 'contacts'];
    const vars = {}
    keys.forEach(x => {
        vars[x] = get(readAppStateByKey(wrapper, x)[0], 'id')
    });
    return vars;
};

/**
 * Extract Test IDs from a State object
 * @param {EnzymeWrapper} wrapper
 */
export const readPathVars = state => {
    const keys = ['gratitudes', 'priorities', 'projects', 'tasks', 'relationships', 'contacts'];
    const vars = {}
    keys.forEach(x => {
        vars[x] = state[x][0] && state[x][0].id
    });
    return vars;
}

/**
 * Test Data for App State
 */
export const InitTestState = { "userHeader": { "user_name": "", "user_image": "", "user_tagline": "" }, "style": { "background": "" }, "gratitudes": [{ "id": "1558164208892", "title": "title", "content": "content", "date": "Invalid Date" }], "priorities": [{ "id": "1558164208966", "title": "title", "date": "Sat May 18 2019 01:23:28 GMT-0600 (Mountain Daylight Time)" }], "projects": [{ "id": "1558164209070", "priority": "1558164208966", "title": "title", "date": "Sat May 18 2019 01:23:29 GMT-0600 (Mountain Daylight Time)" }], "tasks": [{ "id": "1558164209160", "priority": "1558164208966", "project": "1558164209070", "title": "title", "today": true, "done": false, "date": "Sat May 18 2019 01:23:29 GMT-0600 (Mountain Daylight Time)" }], "relationships": [{ "id": "1558164209492", "title": "title", "date": "Sat May 18 2019 01:23:29 GMT-0600 (Mountain Daylight Time)" }], "contacts": [{ "id": "1558164209647", "relationship": "1558164209492", "title": "title", "content": "content", "date": "Invalid Date" }], "online": true, "update": false, "authUser": null }
