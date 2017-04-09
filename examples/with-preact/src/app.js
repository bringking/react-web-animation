import React from 'react';
import { Animated } from 'react-web-animation';

const orbitKeyFrame = [{ transform: 'rotate3d(1, -1, 1, 0deg)', stroke: '#00D8FF', opacity: 1, offset: 0 },
  { transform: 'rotate3d(2, 0, 2, 30deg)', stroke: '#00D822', opacity: 0.5, offset: 0.2 },
  { transform: 'rotate3d(3, 1, 3, 60deg)', stroke: '#002222', opacity: 0.667, offset: 0.4 },
  { transform: 'rotate3d(2, 0, 2, 30deg)', stroke: '#222222', opacity: 0.6, offset: 0.6 },
  { transform: 'rotate3d(1, -1, 1, 0deg)', stroke: '#222222', opacity: 0.6, offset: 1 }
];
const centerKeyFrames = [{ transform: 'scale(1)', fill: '#00D8FF', opacity: 1, offset: 0 },
  { transform: 'scale(.5)', fill: '#00D822', opacity: 0.5, offset: 0.3 },
  { transform: 'scale(.667)', fill: '#002222', opacity: 0.667, offset: 0.7875 },
  { transform: 'scale(.6)', fill: '#222222', opacity: 0.6, offset: 1 }
];

const centerTimings = {};
const getCenterTiming = (duration) => {
  if (centerTimings[duration]) {
    return centerTimings[duration];
  }

  const timing = {
    duration,
    easing: 'ease-in-out',
    delay: 5,
    iterations: Infinity,
    direction: 'alternate',
    fill: 'forwards'
  };

  centerTimings[duration] = timing;

  return centerTimings[duration];
};

const orbitTimings = {};
const getOrbitTiming = (duration, direction) => {
  const key = `${duration}_${direction}`;

  if (orbitTimings[key]) {
    return orbitTimings[key];
  }

  const timing = {
    duration,
    easing: 'ease-in-out',
    delay: 10,
    iterations: Infinity,
    direction,
    fill: 'forwards'
  };

  return orbitTimings[key] = timing;
};

export default () => <div>
  <h1 style={{ marginBottom: '0px', textAlign: 'center', padding: '12px' }}>react-web-animation: Preact example</h1>
  <div style={{
    textAlign: 'center',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <svg version='1.1' x='0px' y='0px'
         width='500px' height='500px' viewBox='0 0 600 600' enableBackground='new 0 0 600 600'>
      <Animated.circle keyframes={centerKeyFrames} timing={getCenterTiming(2000)} fill='#00D8FF' cx='299.529'
                       cy='299.628' r='50.167' style={{ transformOrigin: '300px 300px' }}>
      </Animated.circle>
      <Animated.path keyframes={orbitKeyFrame} timing={getOrbitTiming(20000, 'alternate')} fill='none'
                     stroke='#00D8FF' strokeWidth='24' strokeMiterlimit='10' d='M299.529,197.628
	c67.356,0,129.928,9.665,177.107,25.907c56.844,19.569,91.794,49.233,91.794,76.093c0,27.991-37.041,59.503-98.083,79.728
	c-46.151,15.291-106.879,23.272-170.818,23.272c-65.554,0-127.63-7.492-174.29-23.441c-59.046-20.182-94.611-52.103-94.611-79.559
	c0-26.642,33.37-56.076,89.415-75.616C167.398,207.503,231.515,197.628,299.529,197.628z'
                     style={{ transformOrigin: '300px 300px' }}>
      </Animated.path>
      <Animated.path keyframes={orbitKeyFrame} timing={getOrbitTiming(15000, 'alternate')} fill='none'
                     stroke='#00D8FF' strokeWidth='24' strokeMiterlimit='10' d='M210.736,248.922
	c33.649-58.348,73.281-107.724,110.92-140.48c45.35-39.466,88.507-54.923,111.775-41.505
	c24.248,13.983,33.042,61.814,20.067,124.796c-9.81,47.618-33.234,104.212-65.176,159.601
	c-32.749,56.788-70.25,106.819-107.377,139.272c-46.981,41.068-92.4,55.929-116.185,42.213
	c-23.079-13.31-31.906-56.921-20.834-115.233C153.281,368.316,176.758,307.841,210.736,248.922z'
                     style={{ transformOrigin: '300px 300px' }}>
      </Animated.path>
      <Animated.path keyframes={orbitKeyFrame} timing={getOrbitTiming(30000, 'alternate')} fill='none'
                     stroke='#00D8FF' strokeWidth='24' strokeMiterlimit='10' d='M210.821,351.482
	c-33.746-58.292-56.731-117.287-66.312-166.255c-11.544-58.999-3.382-104.109,19.864-117.566
	c24.224-14.024,70.055,2.244,118.14,44.94c36.356,32.28,73.688,80.837,105.723,136.173c32.844,56.733,57.461,114.209,67.036,162.582
	c12.117,61.213,2.309,107.984-21.453,121.74c-23.057,13.348-65.249-0.784-110.239-39.499
	C285.567,460.886,244.898,410.344,210.821,351.482z' style={{ transformOrigin: '300px 300px' }}>
      </Animated.path>
    </svg>
  </div>
</div>;
