/* eslint no-unused-vars:0*/
import React from 'react';
import Effect from './effect';

/**
 * <AnimationSequence/> is a grouping element that uses the SequenceEffect class provided by the Web Animations API polyfill.
 * Any <Animatable/> elements in a <AnimationSequence/> will be run in serial, and <AnimationSequence/> will provide a single
 * timeline for the SequenceEffect.
 */
class AnimationSequence extends Effect {
    constructor() {
        super('SequenceEffect');
    }
}

export default AnimationSequence;