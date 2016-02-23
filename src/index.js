import {default as Animatable} from './animatable';
import {default as Animation} from './animation';
import {default as AnimationGroup} from './animation_group';
import {default as AnimationSequence} from './animation_sequence';
import {default as Timeline} from './timeline';
// re-export
export {default as Animatable} from './animatable';
export {default as Animation} from './animation';
export {default as AnimationGroup} from './animation_group';
export {default as AnimationSequence} from './animation_sequence';
export {default as Timeline} from './timeline';

// expose a default
export default {
    Animatable,
    Animation,
    AnimationGroup,
    AnimationSequence,
    Timeline
};