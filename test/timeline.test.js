/* eslint no-unused-vars:0*/

// setup test framework
import chai, {expect} from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
import { shallow } from 'enzyme';
import React from 'react';

// import deps
import {AnimationGroup,Animatable,AnimationSequence,Timeline} from '../src';

const keyframes = () => {
    return [{ transform: 'scale(1)', opacity: 1, offset: 0 },
        { transform: 'scale(.5)', opacity: 0.5, offset: 0.3 },
        { transform: 'scale(.667)', opacity: 0.667, offset: 0.7875 },
        { transform: 'scale(.6)', opacity: 0.6, offset: 1 }];
};

const timing = ( duration ) => {
    return {
        duration,
        easing: 'ease-in-out',
        delay: 0,
        iterations: 2,
        direction: 'alternate',
        fill: 'forwards'
    };
};

describe('<Timeline />', ()=> {

    it.only('renders multiple AnimationGroup or AnimationSequence', () => {
        const wrapper = shallow(<Timeline>
            <AnimationGroup>
                <AnimationGroup>
                    <Animatable id="3" keyframes={keyframes()} timing={timing(3000)}>
                        <div></div>
                    </Animatable>
                    <Animatable id="4" keyframes={keyframes()} timing={timing(4000)}>
                        <div></div>
                    </Animatable>
                    <AnimationGroup>
                        <Animatable id="5" keyframes={keyframes()} timing={timing(4000)}>
                            <div></div>
                        </Animatable>
                        <Animatable id="6" keyframes={keyframes()} timing={timing(4000)}>
                            <div></div>
                        </Animatable>
                        <AnimationGroup>
                            <Animatable id="7" keyframes={keyframes()} timing={timing(4000)}>
                                <div></div>
                            </Animatable>
                            <Animatable id="8" keyframes={keyframes()} timing={timing(4000)}>
                                <div></div>
                            </Animatable>
                            <AnimationGroup>
                                <Animatable id="9" keyframes={keyframes()} timing={timing(4000)}>
                                    <div></div>
                                </Animatable>
                                <Animatable id="10" keyframes={keyframes()} timing={timing(4000)}>
                                    <div></div>
                                </Animatable>
                            </AnimationGroup>
                        </AnimationGroup>
                    </AnimationGroup>
                </AnimationGroup>
            </AnimationGroup>
        </Timeline>);

        expect(wrapper.find(Animatable)).to.have.length(8);

    });

});