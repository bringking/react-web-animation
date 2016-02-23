/* eslint no-unused-vars:0*/
import React, {Component, Children, PropTypes} from 'react';
import Animatable from './animatable';
import {List,is} from 'immutable';

class AnimationSequence extends Component {
    constructor() {
        super();

        this.state = {
            player: null
        };

        this.nodes = {};

        this.sequence = null;
    }

    startAnimation() {
        const player = document.timeline.play(this.sequence);
        this.setState({ player });
    }

    getKeyframeEffectsFromChildren( props ) {
        const {children} = props;
        return Children.map(children, ( c, idx )=> {
            return new KeyframeEffect(this.nodes[idx], c.props.keyframes, c.props.timing);
        });
    }

    getSequenceFromKeyframes( keyframeEffects ) {
        // create the sequence
        return new SequenceEffect(keyframeEffects);
    }

    componentWillReceiveProps( nextProps ) {
        let nextKeyframes = this.getKeyframeEffectsFromChildren(nextProps);

        if ( !is(nextKeyframes, this.keyframeEffects) ) {
            this.keyframeEffects = new List(nextKeyframes);
            this.sequence = this.getSequenceFromKeyframes(nextKeyframes);
            this.startAnimation();
        }
    }

    componentDidMount() {
        let keyframeEffects = this.getKeyframeEffectsFromChildren(this.props);
        this.keyframeEffects = new List(keyframeEffects);
        this.sequence = this.getSequenceFromKeyframes(keyframeEffects);

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

export default AnimationSequence;