/* eslint no-unused-vars:0*/

// setup test framework
import chai, {expect} from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
import { shallow } from 'enzyme';
import React from 'react';

// import deps
import {AnimationGroup,Animatable} from '../src';


describe('<AnimationGroup />', ()=> {

    it('renders multiple Animation', () => {
        const wrapper = shallow(<AnimationGroup>
            <Animatable keyframes={[]} timing={{}}>
                <div></div>
            </Animatable>
            <Animatable keyframes={[]} timing={{}}>
                <div></div>
            </Animatable>
        </AnimationGroup>);

        expect(wrapper.find('div').children()).to.have.length(2);

    });

});