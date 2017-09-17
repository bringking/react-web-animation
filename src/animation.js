import React, { Children } from 'react';
import PropTypes from 'prop-types';
import Animatable from './animatable';
import playable from './mixins/playable';

const assign = require('lodash/assign');
const isEqual = require('lodash/isEqual');

/**
 * <Animation/> is a simple implementation of <Animatable/> and controls a single
 * "player" instance for the wrapped element.
 */
class Animation extends Animatable {
  constructor() {
    super();

    this.state = {
      player: null,
    };
  }

  /**
   * Start the animation and set the player in the state
   */
  startAnimation(props) {
    return this.setPlayer(
      this.node.animate(this.keyframes, this.timing),
      props,
    );
  }

  componentWillReceiveProps(nextProps) {
    const { timing, keyframes } = nextProps;

    // create data structures for props
    if (timing && keyframes) {
      const newTiming = Object.assign({}, timing);

      if (
        !isEqual(keyframes, this.keyframes) ||
        !isEqual(newTiming, this.timing)
      ) {
        this.timing = newTiming;
        this.keyframes = keyframes;
        // start the new animation with the new config
        this.startAnimation(nextProps);
      }
    }

    this.updatePlayer(nextProps);
  }

  componentDidMount() {
    const { timing, keyframes } = this.props;

    // create data structures for props
    this.keyframes = keyframes;
    this.timing = Object.assign({}, timing);

    // start the animation
    const player = this.startAnimation();
    // But make sure that we honor the initial playState, if set.
    this.updatePlayer(this.props, player);
  }

  render() {
    const { children, getRef } = this.props;

    this.element = React.cloneElement(children, {
      ref: node => {
        this.node = node;
        if (getRef) {
          getRef(node);
        }
        return node;
      },
    });

    return Children.only(this.element);
  }
}

assign(Animation.prototype, playable);

Animation.propTypes = assign({}, Animatable.propTypes, {
  onCancel: PropTypes.func,
  onFinish: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onReverse: PropTypes.func,
  currentTime: PropTypes.number,
  playState: PropTypes.oneOf([
    'running',
    'paused',
    'finished',
    'idle',
    'reversed',
  ]),
});

export default Animation;
