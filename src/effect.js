/* eslint no-unused-vars:0*/
import React, {Component, Children, PropTypes} from 'react';
import Animatable from './animatable';
import {Map,is} from 'immutable';
import isEqual from 'lodash.isequal';
import assign from 'lodash.assign';

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
        const player = document.timeline.play(this.effect);
        this.setState({ player });
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

        // update play state
        this.updatePlayState(nextProps);

        // update time
        if ( nextProps.currentTime !== undefined && this.props.currentTime !== currentTime ) {
            this.updateTime(nextProps);
        }
    }

    componentDidMount() {
        this.frameCache = new Map(this.buildFrameCache(this.props));
        this.keyframeEffects = this.getKeyframeEffectsFromChildren(this.props);
        this.effect = this.getEffectFromKeyframes(this.keyframeEffects);

        // start the animation
        this.startAnimation();
    }

    updatePlayState( props ) {
        if ( this.state.player ) {
            let currentState = this.state.player.playState;
            switch ( props.playState ) {
                case 'running':
                    this.state.player.play();
                    break;
                case 'paused':
                    if ( currentState !== 'paused' ) {
                        this.state.player.pause();
                    }
                    break;
                case 'finished':
                    if ( currentState !== 'finished' ) {
                        this.state.player.finish();
                    }
                    break;
                case 'idle':
                    if ( currentState !== 'idle' ) {
                        this.state.player.cancel();
                    }
                    break;
                case 'reversed':
                    this.state.player.reverse();
                    break;
            }
        }
    }

    updateTime( props ) {
        if ( this.state.player ) {
            this.state.player.pause();
            this.state.player.currentTime = props.currentTime;
        }
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