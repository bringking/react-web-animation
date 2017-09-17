import React, { Component } from 'react';
import range from 'lodash.range';
import assign from 'lodash.assign';
import flatten from 'lodash.flatten';
import { Animated } from 'react-web-animation';

export default class SpinningDots extends Component {
  constructor() {
    super();
    this.state = {
      layers: 9,
      start: 4,
    };
  }

  getStyles() {
    return {
      body: {
        background: '#0e7cf0',
        margin: '0px',
        color: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },
      a: {
        color: '#6db0f7',
      },
      circle: {
        background: '#2a2a2a',
        borderRadius: '50%',
        width: '10px',
        height: '10px',
        position: 'absolute',
        top: '50%',
        left: '50%',
      },
      sourceLink: {
        textDecoration: 'none',
        padding: '6px',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        backgroundColor: 'white',
        color: 'black',
        position: 'absolute',
        top: 0,
        right: 0,
      },
    };
  }

  getRotationAndTranslateForCircle(layer, fraction) {
    const rotate = `rotate(${360 * fraction}deg)`;
    const translate = `translate(${layer * 20 - 2.5}px)`;
    return { rotation: rotate, translation: translate };
  }

  getAnimationForCircle(layer, rotation, translation) {
    return {
      keyframes: [
        { transform: `${rotation} rotate(0deg) ${translation}` },
        { transform: `${rotation} rotate(360deg) ${translation}` },
      ],
      timing: {
        duration: 1000 * layer,
        iterations: Infinity,
      },
    };
  }

  getRef = node => {
    this.node = node;
  };

  renderCircles(layerCount, startCount) {
    const { circle } = this.getStyles();

    return flatten(
      range(layerCount).map((l, idx) => {
        const n = idx * startCount;

        return range(n).map((c, cIdx) => {
          const {
            rotation,
            translation,
          } = this.getRotationAndTranslateForCircle(idx, cIdx / n);
          const { keyframes, timing } = this.getAnimationForCircle(
            idx,
            rotation,
            translation,
          );

          return (
            <Animated.div
              key={`${translation}_${rotation}`}
              keyframes={keyframes}
              timing={timing}
              style={assign({}, circle, {
                transform: `${rotation} ${translation}`,
              })}
            />
          );
        });
      }),
    );
  }

  render() {
    const { body, sourceLink } = this.getStyles();
    const { layers, start } = this.state;

    return (
      <div style={body} ref={this.getRef}>
        {this.renderCircles(layers, start)}
        <a
          style={sourceLink}
          href="https://github.com/RinconStrategies/react-web-animation/blob/master/demo/src/spinning_dots.js"
        >
          View Source
        </a>
      </div>
    );
  }
}
