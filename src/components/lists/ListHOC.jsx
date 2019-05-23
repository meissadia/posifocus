import React from 'react';
import $ from 'jquery';

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
        constructor(props) {
            super(props);
            this.deleteOnUnmount = [];
        }

        componentWillUpdate() {
            this.runDeletion();
        }

        componentWillUnmount() {
            this.runDeletion();
        }

        runDeletion() {
            this.deleteOnUnmount.forEach(x => x());
            this.deleteOnUnmount = [];
        }

        destroy = (destroyer, event) => {
            event.preventDefault();
            const targetValue = event.target.attributes.jsvalue.value;
            const confirm = window && window.confirm;
            const doDestroy = confirm && confirm(`Delete from ${sectionTitle}?`);
            const targetSelector = `#${sectionTitle}-${targetValue}`;
            const animationDuration = 1000;

            if (doDestroy) {
                $(targetSelector).animate({
                    opacity: 0,
                    height: '0px',
                },
                    {
                        duration: animationDuration,
                        complete: () => {
                            console.log($(targetSelector));
                            $(targetSelector).remove();
                            return true;
                        }
                    }
                );

                this.deleteOnUnmount.push(destroyer.bind(null, targetValue));
                if (this.deleteOnUnmount.length === parseInt($('#list')[0].attributes.jsvalue.value)) {
                    console.log('Hit Delete Threshold');
                    setTimeout(() => this.runDeletion(), animationDuration * 2);
                }
            };
        };

        animateItemOut = e => {

        }

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