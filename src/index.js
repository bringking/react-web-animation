import Animated from './animated';
import Animatable from './animatable';
import Animation from './animation';
import AnimationGroup from './animation_group';
import AnimationSequence from './animation_sequence';
// re-export
export { default as Animated } from './animated';
export { default as Animatable } from './animatable';
export { default as Animation } from './animation';
export { default as AnimationGroup } from './animation_group';
export { default as AnimationSequence } from './animation_sequence';

// expose a default
export default {
  Animated,
  Animatable,
  Animation,
  AnimationGroup,
  AnimationSequence,
};
