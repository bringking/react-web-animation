/* eslint no-unused-vars:0*/
import React, {Component, Children, PropTypes} from 'react';
import Animatable from './animatable';
import {List,is} from 'immutable';

class AnimationGroup extends Component {
    constructor() {
        super();

        this.state = {
            player: null
        };

        this.nodes = {};

        this.group = null;
    }

    startAnimation() {
        const player = document.timeline.play(this.group);
        this.setState({ player });
    }

    getKeyframeEffectsFromChildren( props ) {
        const {children} = props;
        return Children.map(children, ( c, idx )=> {
            return new KeyframeEffect(this.nodes[idx], c.props.keyframes, c.props.timing);
        });
    }

    getGroupFromKeyframes( keyframeEffects ) {
        // create the group
        return new GroupEffect(keyframeEffects);
    }

    componentWillReceiveProps( nextProps ) {
        let nextKeyframes = this.getKeyframeEffectsFromChildren(nextProps);
        let newImmutableKeyframes = new List(nextKeyframes);
        if ( !is(newImmutableKeyframes, this.keyframeEffects) ) {
            this.keyframeEffects = newImmutableKeyframes;
            this.group = this.getGroupFromKeyframes(nextKeyframes);
            this.startAnimation();
        }
    }

    componentDidMount() {
        let keyframeEffects = this.getKeyframeEffectsFromChildren(this.props);
        this.keyframeEffects = new List(keyframeEffects);
        this.group = this.getGroupFromKeyframes(keyframeEffects);

        // start the animation
        this.startAnimation();
    }


    render() {
        const {children,component, getRef} = this.props;
        const {player} = this.state;

        const childElements = Children.map(children, ( c, idx )=> {
            return React.cloneElement(c, {
                ref: ( el ) => {
                    if ( el ) {
                        this.nodes[idx] = el.node;
                        return el.node;
                    }
                }, player
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
AnimationGroup.defaultProps = {
    component: 'div'
};
AnimationGroup.propTypes = {
    getRef: PropTypes.func,
    component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    children: ( props, propName, componentName ) => {
        const prop = props[propName];


        let typeError = prop.some(e => {
            let instance = new e.type();
            return !(instance instanceof Animatable);
        });

        if ( typeError ) {
            return new Error(
                '`' + componentName + '` ' +
                'should have children of type <Animatable/>'
            );
        }
    }
};

export default AnimationGroup;