/* eslint no-unused-vars:0*/

// setup test framework
import chai, {expect} from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
import { shallow } from 'enzyme';
import React from 'react';

// import deps
import {Animation} from '../src';

const getKeyFrames = () => {
    return [{ transform: 'scale(1)', opacity: 1, offset: 0 },
        { transform: 'scale(.5)', opacity: 0.5, offset: 0.3 },
        { transform: 'scale(.667)', opacity: 0.667, offset: 0.7875 },
        { transform: 'scale(.6)', opacity: 0.6, offset: 1 }
    ];
};

const getTiming = ( duration ) => {
    return {
        duration,
        easing: 'ease-in-out',
        delay: 0,
        iterations: 2,
        direction: 'alternate',
        fill: 'forwards'
    };
};

describe('<Animation />', ()=> {

    it('renders exactly on child', () => {
        const wrapper = shallow(<Animation keyframes={getKeyFrames()}
                                           timing={getTiming(2500)}>
            <div></div>
        </Animation>);
        expect(wrapper.find('div')).to.have.length(1);
    });

});