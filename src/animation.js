import React, {Children} from 'react';
import {Map,List,is} from 'immutable';
import Animatable from './animatable';

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
        const player = this.node.animate(this.keyframes.toJS(), this.timing.toJS());
        this.setState({ player });
    }

    componentWillReceiveProps( nextProps ) {
        const {timing,keyframes} = nextProps;

        // create data structures for props
        const newKeyframes = new List(keyframes);
        const newTiming = new Map(timing);

        if ( !is(newKeyframes, this.keyframes) || !is(newTiming, this.timing) ) {
            this.timing = newTiming;
            this.keyframes = newKeyframes;

            // start the new animation with the new config
            this.startAnimation();
        }

    }

    componentDidMount() {
        const {timing,keyframes} = this.props;

        // create data structures for props
        this.keyframes = new List(keyframes);
        this.timing = new Map(timing);

        // start the animation
        this.startAnimation();
    }

    render() {
        const {children,getRef} = this.props;
        const {player} = this.state;

        this.element = React.cloneElement(children, {
            ref: ( node ) => {
                this.node = node;
                if ( getRef ) {
                    getRef(node);
                }
                return node;
            }, player
        });

        return Children.only(this.element);
    }
}

export default Animation;