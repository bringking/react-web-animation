/* eslint no-unused-vars:0*/

// setup test framework
import chai, {expect} from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
import { shallow } from 'enzyme';
import React from 'react';

// import deps
import {Animation} from '../src';


describe('<Animation />', ()=> {

    it('renders exactly on child', () => {
        const wrapper = shallow(<Animation>
            <div></div>
        </Animation>);
        expect(wrapper.find('div')).to.have.length(1);
    });

});