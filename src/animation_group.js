/* eslint no-unused-vars:0*/
import React, {Component, Children, PropTypes} from 'react';
import Animatable from './animatable';
import {List,is} from 'immutable';
import isEqual from 'lodash.isequal';
import Effect from './effect';

class AnimationGroup extends Effect {
    constructor() {
        super(GroupEffect);
    }
}

export default AnimationGroup;