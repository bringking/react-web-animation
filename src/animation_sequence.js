/* eslint no-unused-vars:0*/
import React, {Component, Children, PropTypes} from 'react';
import Animatable from './animatable';
import {List,is} from 'immutable';
import AnimationGroup from './animation_group';

class AnimationSequence extends Component {

    render() {
        const {children,component, getRef} = this.props;
        const childElements = Children.map(children, ( c, idx )=> {
            return React.cloneElement(c, {
                ref: ( el ) => {
                    if ( el ) {
                        this.nodes[idx] = el.node;
                        return el.node;
                    }
                }
            });
        });
        return React.createElement(component, {
            ref: ( node ) => {
                this.wrapper = node;
                if ( getRef ) {
                    getRef(node);
                }
                return node;
            }
        }, childElements);
    }
}
AnimationSequence.defaultProps = {
    component: 'div'
};
AnimationSequence.propTypes = {
    getRef: PropTypes.func,
    component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    children: ( props, propName, componentName ) => {
        const prop = props[propName];

        let typeError;
        if ( prop.length ) {
            typeError = prop.some(e => {
                let instance = new e.type();
                return !(instance instanceof Animatable)
                    && !(instance instanceof AnimationSequence)
                    && !(instance instanceof AnimationGroup);
            });
        } else {
            let instance = new prop.type();
            return !(instance instanceof Animatable)
                && !(instance instanceof AnimationSequence)
                && !(instance instanceof AnimationGroup);
        }

        if ( typeError ) {
            return new Error(
                '`' + componentName + '` ' +
                'should have children of type <Animatable/> or <AnimationSequence/> or <AnimationGroup/>'
            );
        }
    }
};

export default AnimationSequence;