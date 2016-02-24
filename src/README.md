# Docs

## `<Animation>`

The `<Animation/>` Component wraps another element and allows you to animate it. It uses `elem.animate` on the wrapped
element.

### PropTypes
- `children`: Animation requires a child element.
- `getRef`: react-web-animation relies on [refs](https://facebook.github.io/react/docs/more-about-refs.html) to access the 
underlying elements. If you need to access the ref of a wrapped component, use this prop to pass a function in order to 
store the ref in your containing class.
- `keyframes`: A set of keyframes that represent the values to animate and their offsets. See the [Spec](https://w3c.github.io/web-animations/#dom-keyframeeffectreadonly-getframes) for details
- `timing`: An object representing the `AnimationEffectTimingProperties` from the [Spec](https://w3c.github.io/web-animations/#the-animationeffecttimingproperties-dictionary)
- `currentTime`: Set/Get the current play time of the animation in the form of. The `currentTime` should be set to less than
the `timelineLength` of the animation which is equal to `timing.delay + timing.duration * timing.iterations`
- `playState`: Set/Get the current state of the player. Accepts values from the [Spec](https://w3c.github.io/web-animations/#play-states), with
the exception of `pending`, which didn't make sense to provide a setter for.

### Passed Props

react-web-animation introduces the following props onto wrapped components

- `player`: A reference to the `Animation` player referenced in the [spec](https://w3c.github.io/web-animations/#the-animation-interface) for
fine grained control
- `playState`: The current player state defined [Spec](https://w3c.github.io/web-animations/#play-states)
- `timelineLength`: The length of the animation which is equal to `timing.delay + timing.duration * timing.iterations`

### Example
Animating a component is as simple as wrapping it in an `<Animation>` component and supplying `keyframes` and a `timing` config. 
```jsx
import {Component} from 'react';
import {Animation} from 'react-web-animation';


export default class Basic extends Component {

    getKeyFrames() {
        return [{ transform: 'scale(1)', opacity: 1, offset: 0 },
            { transform: 'scale(.5)', opacity: 0.5, offset: 0.3 },
            { transform: 'scale(.667)', opacity: 0.667, offset: 0.7875 },
            { transform: 'scale(.6)', opacity: 0.6, offset: 1 }
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

## `<AnimationGroup>`

## `<AnimationSequence>`

