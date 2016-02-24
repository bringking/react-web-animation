# react-web-animation

react-web-animation is a set of React components that expose the Web Animations API
in a declarative way.

<p align="center">
  <img src="https://github.com/RinconStrategies/react-web-animation/blob/master/react_gif.gif" />
</p>


[![build status](https://travis-ci.org/RinconStrategies/react-web-animation.svg?branch=master)](https://travis-ci.org/RinconStrategies/react-web-animation)
[![npm version](https://img.shields.io/npm/v/react-web-animation.svg?style=flat-square)](https://www.npmjs.com/package/react-web-animation)
[![npm downloads](https://img.shields.io/npm/dm/react-web-animation.svg?style=flat-square)](https://www.npmjs.com/package/react-web-animation)


## Demos
Check out how you can use it here - [http://react-web-animation.surge.sh](http://react-web-animation.surge.sh)

## Why?

Why use this over other animation libraries for React? react-web-animation uses the Web Animations API polyfill so
eventually it will use the native browser implementation and not depend on any third-party animation frameworks or CSS.
Chrome has the greatest support for these today and if you view the source on the demos, you can see it isn't using CSS at all!

## Web Animations API

Want to know more about the Web Animations API? Here are some great resources.
- [Offical Spec](https://w3c.github.io/web-animations/)
- [Polyfill](https://github.com/web-animations/web-animations-js)
- [Blog Series by Daniel Wilson](http://danielcwilson.com/blog/2015/07/animations-intro/)

## Installation

react-web-animation requires the following peer dependencies to be installed

```bash
npm install react
npm install react-dom
npm install immutable
```

```bash
npm install react-web-animation
```

react-web-animation has a runtime dependency on the `next` version [Web Animations API](https://github.com/web-animations/web-animations-js) polyfill. 
The easiest way to get this is to grab it from [cdnjs](https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.1.4/web-animations-next.min.js)
and include it in your application.

## Features
* Animate Single Elements with a `<Animation>` and control play state (play, pause, stop, reverse)
* Animate Multiple animations in parallel with a `<AnimationGroup>`, controlling them with one timeline
* Animate Multiple animations serially with a `<AnimationSequence>`, controlling them with one timeline

## Usage

Animating a component is as simple as wrapping it in an `<Animation>` component and supplying `keyframes` and a `timing` config. 
```jsx
import {Component} from 'react';
import {Animation} from 'react-web-animation';


export default class Basic extends Component {

    getKeyFrames() {
        return [
            { transform: 'scale(1)',    opacity: 1,     offset: 0 },
            { transform: 'scale(.5)',   opacity: 0.5,   offset: 0.3 },
            { transform: 'scale(.667)', opacity: 0.667, offset: 0.7875 },
            { transform: 'scale(.6)',   opacity: 0.6,   offset: 1 }
        ];
    }

    getTiming( duration ) {
        return {
            duration,
            easing: 'ease-in-out',
            delay: 0,
            iterations: 2,
            direction: 'alternate',
            fill: 'forwards'
        };
    }

    render() {
        return
            <Animation keyframes={this.getKeyFrames()}
                       timing={this.getTiming(2500)}>
                <div>
                    Web Animations API Rocks
                </div>
            </Animation>;
    }
}

```
### Advanced Usage
For more advanced usage, head over to the source [documentation](https://github.com/RinconStrategies/react-web-animation/tree/master/src) or 
check out the [http://react-web-animation.surge.sh](http://react-web-animation.surge.sh)


## License

MIT
