import React, { Component } from 'react';
import { Animated } from '../../lib';

export default class Basic extends Component {
  constructor() {
    super();
    this.state = {
      currentTime: 0,
      playState: 'running',
    };
  }

  onPlay() {
    console.log('Basic example: Play event');
  }

  onFinish() {
    console.log('Basic example: Finish event');
  }

  onCancel() {
    console.log('Basic example: Cancel event');
  }

  onPause() {
    console.log('Basic example: Pause event');
  }

  onReverse() {
    console.log('Basic example: Reverse event');
  }

  getStyles() {
    return {
      display: 'flex',
      pointerEvents: 'none',
      fontWeight: 'bold',
      fontSize: '4rem',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    };
  }

  getKeyFrames() {
    return [
      { transform: 'scale(1)', opacity: 1, offset: 0 },
      { transform: 'scale(.5)', opacity: 0.5, offset: 0.3 },
      { transform: 'scale(.667)', opacity: 0.667, offset: 0.7875 },
      { transform: 'scale(.6)', opacity: 0.6, offset: 1 },
    ];
  }

  getTiming(duration) {
    return {
      duration,
      easing: 'ease-in-out',
      delay: 0,
      iterations: 2,
      direction: 'alternate',
      fill: 'forwards',
    };
  }

  render() {
    return (
      <div style={{ padding: '12px' }}>
        <label>Current Time: </label>
        <input
          type="range"
          min="0"
          max="5000"
          value={this.state.currentTime}
          onChange={e => {
            this.setState({ currentTime: parseInt(e.target.value, 10) });
          }}
        />

        <div>
          <label>Player Controls: </label>
          <button
            onClick={() => {
              this.setState({ playState: 'running' });
            }}
          >
            Play ▶
          </button>
          <button
            onClick={() => {
              this.setState({ playState: 'paused' });
            }}
          >
            Pause ❚❚
          </button>
          <button
            onClick={() => {
              this.setState({ playState: 'idle' });
            }}
          >
            Stop ◼
          </button>
          <button
            onClick={() => {
              this.setState({ playState: 'reversed' });
            }}
          >
            Reverse ↺
          </button>
          <button
            onClick={() => {
              this.setState({ playState: 'finished' });
            }}
          >
            Finish ⇥
          </button>
        </div>
        <a href="https://github.com/RinconStrategies/react-web-animation/blob/master/demo/src/basic.js">
          View Source
        </a>
        <Animated.div
          onReverse={this.onReverse}
          onPlay={this.onPlay}
          onFinish={this.onFinish}
          onCancel={this.onCancel}
          onPause={this.onPause}
          playState={this.state.playState}
          keyframes={this.getKeyFrames()}
          timing={this.getTiming(2500)}
          currentTime={this.state.currentTime}
          style={this.getStyles()}
        >
          Web Animations API Rocks
        </Animated.div>
      </div>
    );
  }
}
