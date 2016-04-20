/* eslint no-unused-vars:0*/
import React, {Component, Children, PropTypes} from 'react';
import Animatable from './animatable';
import {Map,is} from 'immutable';
import isEqual from 'lodash.isequal';
import assign from 'lodash.assign';
import playable from './mixins/playable';

/**
 * The Abstract <Effect/> component represents the behavior of a Grouped set of <Animatable/>
 * components. A sub-type must be provided.
 */
class Effect extends Component {
    constructor( type ) {
        super();

        this.state = {
            player: null
        };

        /**
         * The type of groupable component.
         */
        this.type = type;

        /**
         * Store the DOM nodes of the child <Animatable/>
         * @type {{}}
         */
        this.nodes = {};

        /**
         * The effect
         * @type {null}
         */
        this.effect = null;

    }

    startAnimation() {
        return this.setPlayer(document.timeline.play(this.effect));
    }

    getKeyframeEffectsFromChildren( props ) {
        const {children} = props;
        return Children.map(children, ( c, idx )=> {
            return new KeyframeEffect(this.nodes[idx], c.props.keyframes, c.props.timing);
        });
    }

    buildFrameCache( props ) {
        const {children} = props;
        const cache = {};
        return Children.forEach(children, ( c, idx )=> {
            cache[idx] = { frames: c.props.keyframes, timing: c.props.timing };
        });
    }

    getEffectFromKeyframes( keyframeEffects ) {
        // create the group
        let type = window[this.type] || window['GroupEffect'];
        return new type(keyframeEffects);
    }

    componentWillReceiveProps( nextProps ) {
        let nextKeyframes = this.getKeyframeEffectsFromChildren(nextProps);
        let newFrameCache = new Map(this.buildFrameCache(nextProps));
        const {currentTime} = nextProps;

        if ( !is(newFrameCache, this.frameCache) ) {
            this.keyframeEffects = nextKeyframes;
            this.effect = this.getEffectFromKeyframes(nextKeyframes);
            this.startAnimation();
        }

        this.updatePlayer(nextProps);
    }

    componentDidMount() {
        this.frameCache = new Map(this.buildFrameCache(this.props));
        this.keyframeEffects = this.getKeyframeEffectsFromChildren(this.props);
        this.effect = this.getEffectFromKeyframes(this.keyframeEffects);

        // start the animation
        const player = this.startAnimation();
        // But make sure that we honor the initial playState, if set.
        this.updatePlayer(this.props, player);
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

        return React.createElement(component, assign({}, this.props, {
            ref: ( node ) => {
                this.wrapper = node;
                if ( getRef ) {
                    getRef(node);
                }
                return node;
            }
        }), childElements);
    }
}
assign(Effect.prototype, playable);

Effect.defaultProps = {
    component: 'div'
};

Effect.propTypes = {
    getRef: PropTypes.func,
    currentTime: PropTypes.number,
    playState: PropTypes.oneOf(['running', 'paused', 'finished', 'idle', 'reversed']),
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
                return !(instance instanceof Animatable);
            });
        } else if ( prop.type ) {
            let instance = new prop.type();
            typeError = !(instance instanceof Animatable);
        } else {
            typeError = true;
        }

        if ( typeError ) {
            return new Error(
                '`' + componentName + '` ' +
                'should have children of type <Animatable/>'
            );
        }
    }
};

export default Effect;
