// setup test framework
import chai, {expect} from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

// import deps
import ReactWebAnimation, {Animation, AnimationGroup, AnimationSequence} from '../src';


describe('the react-web-animation library', ()=> {

    it('will expose a default export containing Animation, AnimationGroup, AnimationSequence', ()=> {
        expect(ReactWebAnimation).to.exist();
        expect(ReactWebAnimation.Animation).to.exist();
        expect(ReactWebAnimation.AnimationGroup).to.exist();
        expect(ReactWebAnimation.AnimationSequence).to.exist();
    });

    it('will expose an Animation component', ()=> {
        expect(Animation).to.exist();
    });
    it('will expose an AnimationGroup component', ()=> {
        expect(AnimationGroup).to.exist();
    });
    it('will expose an AnimationSequence component', ()=> {
        expect(AnimationSequence).to.exist();
    });

});