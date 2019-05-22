import React from 'react';

/**
 * HOC to reuse List logic
 * 
 * !! Note: Must be wrapped using withGlobalContext !!
 * 
 * @param {Component} WrappedComponent
 * @param {Function} selectData Read data from GlobalContext.state
 */
const ListHOC = (WrappedComponent, sectionTitle) => {
    return class extends React.Component {
        destroy = (destroyer, event) => {
            event.preventDefault();
            destroyer(event.target.attributes.jsvalue.value);
        };

        destroyerMap = {
            priorities: 'deletePriority',
            projects: 'deleteProject',
            relationships: 'deleteRelationship',
        };

        getDestroyer = (functions) => {
            const mapped = this.destroyerMap[sectionTitle];
            if (mapped)
                return functions[mapped];
            return functions.deleteFromStateArray.bind(null, sectionTitle);
        };

        showEditor = (event) => {
            const id = event.target.attributes.jsvalue.value;
            this.props.history.push(`${this.props.location.pathname}/${id}/edit`);
        };

        back = () => this.props.history.pop();

        titleMapper = title => (title === 'todays' ? 'tasks' : title);


        render = () => (
            <WrappedComponent
                data={this.props.state[this.titleMapper(sectionTitle)]}
                destroy={this.destroy.bind(null, this.getDestroyer(this.props.functions))}
                functions={this.props.functions}
                sectionTitle={sectionTitle}
                showEditor={this.showEditor}
                isNew={props => props.location.pathname.includes('new')}
                isEdit={props => props.location.pathname.includes('edit')}
                isToday={props => props.location.pathname.includes('today')}
                back={this.back}
                urlParams={this.props.urlParams}
                update={this.props.functions.updateStateHandler}
                {...this.props}
            />
        );
    };
};

export default ListHOC;