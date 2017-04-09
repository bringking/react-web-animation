/* eslint no-unused-vars:0*/
import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import playable from './mixins/playable';

const _assign = require('lodash/assign');
const _isEqual = require('lodash/isEqual');

/**
 * The Abstract <Effect/> component represents the behavior of a Grouped set of <Animatable/>
 * components. A sub-type must be provided.
 */
class Effect extends Component {
  constructor(type) {
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

  startAnimation(props) {
    return this.setPlayer(document.timeline.play(this.effect), props);
  }

  getKeyframeEffectsFromChildren(props) {
    const { children } = props;
    return Children.map(children, (c, idx) => {
      return new KeyframeEffect(this.nodes[idx], c.props.keyframes, c.props.timing);
    });
  }

  buildFrameCache(props) {
    const { children } = props;
    const cache = {};
    return Children.forEach(children, (c, idx) => {
      cache[idx] = { frames: c.props.keyframes, timing: c.props.timing };
    });
  }

  getEffectFromKeyframes(keyframeEffects) {
    // create the group
    let type = window[this.type] || window['GroupEffect'];
    return new type(keyframeEffects);
  }

  componentWillReceiveProps(nextProps) {
    let nextKeyframes = this.getKeyframeEffectsFromChildren(nextProps);
    let newFrameCache = Object.assign({}, this.buildFrameCache(nextProps));
    const { currentTime } = nextProps;

    if (!_isEqual(newFrameCache, this.frameCache)) {
      this.keyframeEffects = nextKeyframes;
      this.effect = this.getEffectFromKeyframes(nextKeyframes);
      this.startAnimation(nextProps);
    }

    this.updatePlayer(nextProps);
  }

  componentDidMount() {
    this.frameCache = Object.assign({}, this.buildFrameCache(this.props));
    this.keyframeEffects = this.getKeyframeEffectsFromChildren(this.props);
    this.effect = this.getEffectFromKeyframes(this.keyframeEffects);

    // start the animation
    const player = this.startAnimation();
    // But make sure that we honor the initial playState, if set.
    this.updatePlayer(this.props, player);
  }

  render() {
    const { children, component, getRef } = this.props;

    const childElements = Children.map(children, (c, idx) => {
      return React.cloneElement(c, {
        ref: (el) => {
          if (el) {
            this.nodes[idx] = el.node;
            return el.node;
          }
        }
      });
    });

    return React.createElement(component, {
      ref: (node) => {
        this.wrapper = node;
        if (getRef) {
          getRef(node);
        }
        return node;
      }
    }, childElements);
  }
}
_assign(Effect.prototype, playable);

Effect.defaultProps = {
  component: 'div'
};

Effect.propTypes = {
  onCancel: PropTypes.func,
  onFinish: PropTypes.func,
  onPause: PropTypes.func,
  onPlay: PropTypes.func,
  onReverse: PropTypes.func,
  getRef: PropTypes.func,
  currentTime: PropTypes.number,
  playState: PropTypes.oneOf(['running', 'paused', 'finished', 'idle', 'reversed']),
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Effect;
