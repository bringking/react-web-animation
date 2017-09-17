/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import range from 'lodash.range';
import { Animatable, AnimationGroup } from 'react-web-animation';

export default class Scrolling extends Component {
  constructor() {
    super();
    this.state = {
      currentTime: 0,
      trackHeight: 10000,
    };
    this.handleScroll = this.handleScroll.bind(this);
    // create a set of items with the right animations and keyframes
    // don't do this every render.
    this.items = this.buildItems();
  }

  getStyles(i) {
    const styles = {
      position: 'absolute',
      borderRadius: '50%',
      width: '100px',
      height: '100px',
      left: 'calc(50% - 50px)',
      backgroundColor: `hsla(${193 + i}, 95%, 68%, 1)`,
    };

    if (i % 2) {
      styles.transform = `translate3d(100px,${i * 100}px,0)`;
    } else {
      styles.transform = `translate3d(-100px,${i * 100}px,0)`;
    }

    return styles;
  }

  getKeyFrames(i) {
    let finalVal;
    let startVal;
    if (i % 2) {
      startVal = '-100px';
      finalVal = '-500px';
    } else {
      startVal = '100px';
      finalVal = '500px';
    }

    const frames = [
      {
        transform: `translate3d(0,${i * 100}px,0)`,
        borderRadius: '50%',
        opacity: 1,
        offset: 0,
      },
      {
        transform: `translate3d(${startVal},${i * 100}px,0)`,
        opacity: 0.5,
        offset: 0.3,
      },
      {
        transform: `translate3d(${finalVal},${i * 100}px,0)`,
        opacity: 0.667,
        offset: 0.7875,
      },
      {
        transform: `translate3d(0,${i * 100}px,0)`,
        borderRadius: '0%',
        opacity: 0.6,
        offset: 1,
      },
    ];

    return frames;
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

  buildItems() {
    // build up a set of 100 items that will be animated in the group
    return range(100).map(i => (
      <Animatable.div
        key={i}
        keyframes={this.getKeyFrames(i)}
        timing={this.getTiming(2500)}
        style={this.getStyles(i)}
      />
    ));
  }

  handleScroll(event) {
    // set the currentTime prop to be based on the scrollPosition
    const scrollableArea = this.state.trackHeight - event.target.clientHeight;
    const percentScrolled = event.target.scrollTop / scrollableArea;
    // 5000 is the total animation time since the 'direction' is alternate
    // alternate basically makes the total time be 'duration * 2'
    this.setState({ currentTime: 5000 * percentScrolled });
  }

  render() {
    // use an AnimationGroup so we are only creating a single player instance
    // IMPORTANT! Set the playState to 'paused' so it doesn't animated on it's own
    return (
      <TrackContainer onScroll={this.handleScroll}>
        <Track trackHeight={this.state.trackHeight}>
          <SourceLink />
          <AnimationGroup
            playState={'paused'}
            currentTime={this.state.currentTime}
          >
            {this.items}
          </AnimationGroup>
        </Track>
      </TrackContainer>
    );
  }
}

// create a "TrackContainer" to track scroll events
const TrackContainer = props => (
  <div
    style={{
      height: '100%',
      width: '100%',
      WebkitOverflowScrolling: 'touch',
      overflowY: 'auto',
    }}
    {...props}
  />
);

// create a "Track" that is long and can be scrolled
const Track = ({ trackHeight, ...rest }) => (
  <div
    {...rest}
    style={{
      width: '100%',
      height: `${trackHeight}px`,
      position: 'relative',
    }}
  />
);

// source code link
const SourceLink = () => (
  <a
    style={{
      textDecoration: 'none',
      padding: '6px',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      backgroundColor: '#333',
      color: 'white',
      position: 'fixed',
      top: 0,
      right: 0,
    }}
    href="https://github.com/RinconStrategies/react-web-animation/blob/master/demo/src/scrolling.js"
  >
    View Source
  </a>
);
