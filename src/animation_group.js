/* eslint no-unused-vars:0*/
import React from 'react';
import Effect from './effect';

/**
 * <AnimationGroup/> is a grouping element that uses the GroupEffect class provided by the Web Animations API polyfill.
 * Any <Animatable/> elements in a <AnimationGroup/> will be run in parallel, and <AnimationGroup/> will provide a single
 * timeline for the GroupEffect.
 */
class AnimationGroup extends Effect {
    constructor() {
        super('GroupEffect');
    }
}

export default AnimationGroup;