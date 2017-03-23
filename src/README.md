# Docs

## `<Animated.[elementName]>`

The `<Animated/>` Component is a higher order component for creating animated elements with a single class. It wraps 
the `<Animation>` element described below and accepts all the same props

### Example
Animating a component is as simple as wrapping it in an `<Animation>` component and supplying `keyframes` and a `timing` config. 

```jsx
import { Component } from 'react';
import { Animated } from 'react-web-animation';


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
            <Animated.div keyframes={this.getKeyFrames()}
                       timing={this.getTiming(2500)}>
                    Web Animations API Rocks
            </Animated.div>;
    }
}

```

## `<Animation>`

The `<Animation/>` Component wraps another element and allows you to animate it. It uses `elem.animate` on the wrapped
element.

### PropTypes
- `children`:*`PropTypes.element.isRequired`* Animation requires a child element.
- `getRef`:*`PropTypes.func`*   react-web-animation relies on [refs](https://facebook.github.io/react/docs/more-about-refs.html) to access the 
underlying elements. If you need to access the ref of a wrapped component, use this prop to pass a function in order to 
store the ref in your containing class.
- `keyframes`:*`PropTypes.arrayOf(Object)`* A set of keyframes that represent the values to animate and their offsets. See the [Spec](https://w3c.github.io/web-animations/#dom-keyframeeffectreadonly-getframes) for details
- `timing`:*`PropTypes.shape({
                     delay: PropTypes.number,
                     endDelay: PropTypes.number,
                     fill: PropTypes.oneOf(['none', 'forwards', 'backwards', 'both', 'auto']),
                     iterationStart: PropTypes.number,
                     iterations: PropTypes.number,
                     duration: PropTypes.oneOfType([
                         PropTypes.string,
                         PropTypes.number
                     ]),
                     direction: PropTypes.oneOf(['normal', 'reverse', 'alternate', 'alternate-reverse']),
                     easing: PropTypes.string
                 }).isRequired`* An object representing the `AnimationEffectTimingProperties` from the [Spec](https://w3c.github.io/web-animations/#the-animationeffecttimingproperties-dictionary)
- `currentTime`:*`PropTypes.number`* Set/Get the current play time of the animation in the form of. The `currentTime` should be set to less than
the `timelineLength` of the animation which is equal to `timing.delay + timing.duration * timing.iterations`
- `playState`:*`PropTypes.oneOf(['running', 'paused', 'finished', 'idle', 'reversed'])`* Set/Get the current state of the player. Accepts values from the [Spec](https://w3c.github.io/web-animations/#play-states), with
the exception of `pending`, which didn't make sense to provide a setter for.
- `onCancel`: *`PropTypes.func`* [Native event for](http://w3c.github.io/web-animations/#animation-events-section) the WebAnimations API `oncancel` event. Fires when the animation enters
the `idle` state from another state
- `onFinish`: *`PropTypes.func`* [Native event for](http://w3c.github.io/web-animations/#animation-events-section) the WebAnimations API `onfinish` event. Fires when the animation
enters the `finished` state.
- `onPause`: *`PropTypes.func`* react-web-animation Event for transitioning to the `paused` from a different state.
- `onPlay`: *`PropTypes.func`* react-web-animation Event for transitioning to the `running` from a different state.
- `onReverse`: *`PropTypes.func`* react-web-animation Event for transitioning to the `reversed` state from a different state.

### Passed Props

react-web-animation introduces the following props onto wrapped components

- `player`: A reference to the `Animation` player referenced in the [spec](https://w3c.github.io/web-animations/#the-animation-interface) for
fine grained control
- `playState`: The current player state defined [Spec](https://w3c.github.io/web-animations/#play-states)
- `timelineLength`: The length of the animation which is equal to `timing.delay + timing.duration * timing.iterations`

### Example
Animating a component is as simple as wrapping it in an `<Animation>` component and supplying `keyframes` and a `timing` config. 
```jsx
import { Component } from 'react';
import { Animation } from 'react-web-animation';


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

## `<Animatable>`

The `<Animatable/>` Component wraps another element and accepts the desired `keyframes` and `timing` properties to apply
to the child. However, `<Animatable/>` *does not* expose a `player` or start any animation. It is meant as an abstract element
for use in `<AnimationGroup/>` or `<AnimationSequence/>`

### PropTypes
- `getRef`: react-web-animation relies on [refs](https://facebook.github.io/react/docs/more-about-refs.html) to access the 
underlying elements. If you need to access the ref of a wrapped component, use this prop to pass a function in order to 
store the ref in your containing class.
- `keyframes`: A set of keyframes that represent the values to animate and their offsets. See the [Spec](https://w3c.github.io/web-animations/#dom-keyframeeffectreadonly-getframes) for details
- `timing`: An object representing the `AnimationEffectTimingProperties` from the [Spec](https://w3c.github.io/web-animations/#the-animationeffecttimingproperties-dictionary)

### Passed Props

None

## `<Animatable.[elementName]>`

The `<Animatable.[elementName]/>` Component is a higher order component for creating animatable elements with a single class. It wraps 
the `<Animatable>` element described below and accepts all the same props

### Example
Animating a component is as simple as wrapping it in an `<Animation>` component and supplying `keyframes` and a `timing` config. 

```jsx
import React, { Component } from 'react';
import { AnimationGroup, Animatable } from '../../lib';


export default class BasicGroup extends Component {
    constructor() {
        super();
        this.state = {
            currentTime: 0,
            playState: 'running'
        };
    }

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
        return <div>
                <AnimationGroup playState={this.state.playState} currentTime={this.state.currentTime}>
                    <Animatable.div id="1" keyframes={this.getKeyFrames()} timing={this.getTiming(2000)}>
                        Web Animations API Rocks
                    </Animatable.div>
                    <Animatable.div id="2" keyframes={this.getKeyFrames()} timing={this.getTiming(4000)}>
                        It really does!
                    </Animatable.div>
                </AnimationGroup>
        </div>;
    }
}
```

## `<AnimationGroup>`

 The `<AnimationGroup>` component represents the behavior of a Grouped set of `<Animatable/>`
 components. The sub animations will be run in *parallel* and `<AnimationGroup>` will expose a single
 `player` to control the timeline

### PropTypes
- `component`:*`PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.element
                    ])`* The element or string representing an element to render as the wrapping element. Defaults to `div`.
- `children`:*`PropTypes.element.isRequired`* `<AnimationGroup>` requires a child elements of type `<Animatable/>`
- `getRef`:*`PropTypes.func`* react-web-animation relies on [refs](https://facebook.github.io/react/docs/more-about-refs.html) to access the 
underlying elements. If you need to access the ref of a wrapped component, use this prop to pass a function in order to 
store the ref in your containing class.
- `keyframes`:*`PropTypes.arrayOf(Object)`* A set of keyframes that represent the values to animate and their offsets. See the [Spec](https://w3c.github.io/web-animations/#dom-keyframeeffectreadonly-getframes) for details
- `timing`:*`PropTypes.shape({
                                delay: PropTypes.number,
                                endDelay: PropTypes.number,
                                fill: PropTypes.oneOf(['none', 'forwards', 'backwards', 'both', 'auto']),
                                iterationStart: PropTypes.number,
                                iterations: PropTypes.number,
                                duration: PropTypes.oneOfType([
                                    PropTypes.string,
                                    PropTypes.number
                                ]),
                                direction: PropTypes.oneOf(['normal', 'reverse', 'alternate', 'alternate-reverse']),
                                easing: PropTypes.string
                            }).isRequired`* An object representing the `AnimationEffectTimingProperties` from the [Spec](https://w3c.github.io/web-animations/#the-animationeffecttimingproperties-dictionary)
- `currentTime`:*`PropTypes.number`* Set/Get the current play time of the animation in the form of. The `currentTime` should be set to less than
the `timelineLength` of the animation which is equal to `longestAnimatable.timing.delay + longestAnimatable.timing.duration * longestAnimatable.timing.iterations`
- `playState`:*`PropTypes.oneOf(['running', 'paused', 'finished', 'idle', 'reversed'])`* Set/Get the current state of the player. Accepts values from the [Spec](https://w3c.github.io/web-animations/#play-states), with
the exception of `pending`, which didn't make sense to provide a setter for.
- `onCancel`: *`PropTypes.func`* [Native event for](http://w3c.github.io/web-animations/#animation-events-section) the WebAnimations API `oncancel` event. Fires when the animation enters
the `idle` state from another state
- `onFinish`: *`PropTypes.func`* [Native event for](http://w3c.github.io/web-animations/#animation-events-section) the WebAnimations API `onfinish` event. Fires when the animation
enters the `finished` state.
- `onPause`: *`PropTypes.func`* react-web-animation Event for transitioning to the `paused` from a different state.
- `onPlay`: *`PropTypes.func`* react-web-animation Event for transitioning to the `running` from a different state.
- `onReverse`: *`PropTypes.func`* react-web-animation Event for transitioning to the `reversed` state from a different state.

### Passed Props

- `player`: A reference to the `Animation` player referenced in the [spec](https://w3c.github.io/web-animations/#the-animation-interface) for
fine grained control

### Example

```jsx
import React, { Component } from 'react';
import { AnimationGroup, Animatable } from '../../lib';


export default class BasicGroup extends Component {
    constructor() {
        super();
        this.state = {
            currentTime: 0,
            playState: 'running'
        };
    }

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
        return <div>
                <AnimationGroup playState={this.state.playState} currentTime={this.state.currentTime}>
                    <Animatable id="1" keyframes={this.getKeyFrames()} timing={this.getTiming(2000)}>
                        <div>
                            Web Animations API Rocks
                        </div>
                    </Animatable>
                    <Animatable id="2" keyframes={this.getKeyFrames()} timing={this.getTiming(4000)}>
                        <div>
                            It really does!
                        </div>
                    </Animatable>
                </AnimationGroup>
        </div>;
    }
}

```

## `<AnimationSequence>`

 The `<AnimationSequence>` component represents the behavior of a Grouped set of `<Animatable/>`
 components. The sub animations will be run in *serial* and `<AnimationSequence>` will expose a single
 `player` to control the timeline

### PropTypes
- `component`:*`PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.element
                    ])`* The element or string representing an element to render as the wrapping element. Defaults to `div`.
- `children`:*`PropTypes.element.isRequired`* `<AnimationSequence>` requires a child elements of type `<Animatable/>`
- `getRef`:*`PropTypes.func`* react-web-animation relies on [refs](https://facebook.github.io/react/docs/more-about-refs.html) to access the 
underlying elements. If you need to access the ref of a wrapped component, use this prop to pass a function in order to 
store the ref in your containing class.
- `keyframes`:*`PropTypes.arrayOf(Object)`* A set of keyframes that represent the values to animate and their offsets. See the [Spec](https://w3c.github.io/web-animations/#dom-keyframeeffectreadonly-getframes) for details
- `timing`:*`PropTypes.shape({
                                delay: PropTypes.number,
                                endDelay: PropTypes.number,
                                fill: PropTypes.oneOf(['none', 'forwards', 'backwards', 'both', 'auto']),
                                iterationStart: PropTypes.number,
                                iterations: PropTypes.number,
                                duration: PropTypes.oneOfType([
                                    PropTypes.string,
                                    PropTypes.number
                                ]),
                                direction: PropTypes.oneOf(['normal', 'reverse', 'alternate', 'alternate-reverse']),
                                easing: PropTypes.string
                            }).isRequired`* An object representing the `AnimationEffectTimingProperties` from the [Spec](https://w3c.github.io/web-animations/#the-animationeffecttimingproperties-dictionary)
- `currentTime`:*`PropTypes.number`* Set/Get the current play time of the animation in the form of. The `currentTime` should be set to less than
the `timelineLength` of the animation which is equal to `longestAnimatable.timing.delay + longestAnimatable.timing.duration * longestAnimatable.timing.iterations`
- `playState`:*`PropTypes.oneOf(['running', 'paused', 'finished', 'idle', 'reversed'])`* Set/Get the current state of the player. Accepts values from the [Spec](https://w3c.github.io/web-animations/#play-states), with
the exception of `pending`, which didn't make sense to provide a setter for.
- `onCancel`: *`PropTypes.func`* [Native event for](http://w3c.github.io/web-animations/#animation-events-section) the WebAnimations API `oncancel` event. Fires when the animation enters
the `idle` state from another state
- `onFinish`: *`PropTypes.func`* [Native event for](http://w3c.github.io/web-animations/#animation-events-section) the WebAnimations API `onfinish` event. Fires when the animation
enters the `finished` state.
- `onPause`: *`PropTypes.func`* react-web-animation Event for transitioning to the `paused` from a different state.
- `onPlay`: *`PropTypes.func`* react-web-animation Event for transitioning to the `running` from a different state.
- `onReverse`: *`PropTypes.func`* react-web-animation Event for transitioning to the `reversed` state from a different state.

### Passed Props

- `player`: A reference to the `Animation` player referenced in the [spec](https://w3c.github.io/web-animations/#the-animation-interface) for
fine grained control

### Example

```jsx
import React,{ Component } from 'react';
import {AnimationSequence, Animatable} from '../../lib';


export default class BasicSequence extends Component {
    constructor() {
        super();
        this.state = {
            currentTime: 0,
            playState: 'running'
        };
    }

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
        return <div>
                <AnimationSequence playState={this.state.playState} currentTime={this.state.currentTime}>
                    <Animatable id="1" keyframes={this.getKeyFrames()} timing={this.getTiming(2000)}>
                        <div>
                            Web Animations API Rocks
                        </div>
                    </Animatable>
                    <Animatable id="2" keyframes={this.getKeyFrames()} timing={this.getTiming(4000)}>
                        <div>
                            It really does!
                        </div>
                    </Animatable>
                </AnimationSequence>
        </div>;
    }
}

```
