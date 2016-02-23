import {default as Animatable} from './animatable';
import {default as Animation} from './animation';
import {default as AnimationGroup} from './animation_group';
import {default as AnimationSequence} from './animation_sequence';
// re-export
export {default as Animatable} from './animatable';
export {default as Animation} from './animation';
export {default as AnimationGroup} from './animation_group';
export {default as AnimationSequence} from './animation_sequence';

// expose a default
export default {
    Animatable,
    Animation,
    AnimationGroup,
    AnimationSequence
};