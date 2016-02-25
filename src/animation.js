import React, {Children,PropTypes} from 'react';
import {Map,is} from 'immutable';
import Animatable from './animatable';
import assign from 'lodash.assign';
import isEqual from 'lodash.isequal';

/**
 * <Animation/> is a simple implementation of <Animatable/> and controls a single
 * "player" instance for the wrapped element.
 */
class Animation extends Animatable {
    constructor() {
        super();

        this.state = {
            player: null
        };
    }

    /**
     * Start the animation and set the player in the state
     */
    startAnimation() {
        // cancel existing animation
        if ( this.state.player ) {
            this.state.player.cancel();
        }

        // start with the new config
        const player = this.node.animate(this.keyframes, this.timing.toJS());
        this.setState({ player });
    }

    componentWillReceiveProps( nextProps ) {
        const {timing,keyframes, currentTime} = nextProps;

        // create data structures for props
        if ( timing && keyframes ) {
            const newTiming = new Map(timing);

            if ( !isEqual(keyframes, this.keyframes) || !is(newTiming, this.timing) ) {
                this.timing = newTiming;
                this.keyframes = keyframes;
                // start the new animation with the new config
                this.startAnimation();
            }
        }


        // update play state
        this.updatePlayState(nextProps);

        // update time
        if ( nextProps.currentTime !== undefined && this.props.currentTime !== currentTime ) {
            this.updateTime(nextProps);
        }

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

    componentDidMount() {
        const {timing,keyframes} = this.props;

        // create data structures for props
        this.keyframes = keyframes;
        this.timing = new Map(timing);

        // start the animation
        this.startAnimation();
    }

    render() {
        const {children,getRef,timing,playState} = this.props;
        const {player} = this.state;

        this.element = React.cloneElement(children, {
            ref: ( node ) => {
                this.node = node;
                if ( getRef ) {
                    getRef(node);
                }
                return node;
            },
            player,
            playState,
            timelineLength: isFinite(timing.iterations)
                ? timing.delay + timing.duration * timing.iterations
                : 'Infinity'
        });

        return Children.only(this.element);
    }
}

Animation.propTypes = assign({}, Animatable.propTypes, {
    currentTime: PropTypes.number,
    playState: PropTypes.oneOf(['running', 'paused', 'finished', 'idle', 'reversed'])
});

export default Animation;