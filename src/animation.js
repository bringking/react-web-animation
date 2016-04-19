import React, {Children,PropTypes} from 'react';
import {Map,is} from 'immutable';
import Animatable from './animatable';
import assign from 'lodash.assign';
import isEqual from 'lodash.isequal';
import playable from './mixins/playable';

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
        return this.setPlayer(this.node.animate(this.keyframes, this.timing.toJS()));
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
        this.updatePlayState(this.state.player, nextProps);

        // update time
        if ( nextProps.currentTime !== undefined && this.props.currentTime !== currentTime ) {
            this.updateTime(nextProps);
        }

    }

    componentDidMount() {
        const {timing,keyframes,playState} = this.props;

        // create data structures for props
        this.keyframes = keyframes;
        this.timing = new Map(timing);

        // start the animation
        const player = this.startAnimation();
        // But make sure that we honor the initial playState, if set.
        this.updatePlayState(player, playState);
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

assign(Animation.prototype, playable);

Animation.propTypes = assign({}, Animatable.propTypes, {
    currentTime: PropTypes.number,
    playState: PropTypes.oneOf(['running', 'paused', 'finished', 'idle', 'reversed'])
});

export default Animation;
