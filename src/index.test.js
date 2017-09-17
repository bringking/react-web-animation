import ReactWebAnimation, {
  Animated,
  Animatable,
  Animation,
  AnimationGroup,
  AnimationSequence,
} from './index';

describe('index', () => {
  it('exports all the components', () => {
    expect(Animated).toBeDefined();
    expect(Animatable).toBeDefined();
    expect(Animation).toBeDefined();
    expect(AnimationGroup).toBeDefined();
    expect(AnimationSequence).toBeDefined();
  });
  it('exports a keyed default', () => {
    expect(ReactWebAnimation.Animated).toBeDefined();
    expect(ReactWebAnimation.Animatable).toBeDefined();
    expect(ReactWebAnimation.Animation).toBeDefined();
    expect(ReactWebAnimation.AnimationGroup).toBeDefined();
    expect(ReactWebAnimation.AnimationSequence).toBeDefined();
  });
});
