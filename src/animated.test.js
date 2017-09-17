import Animated from './animated';
import domElements from './utils/dom_elements';

describe('Animated', () => {
  it('will export an function', () => {
    expect(Animated).toBeInstanceOf(Function);
  });

  it('will have a method on the prototype for each element', () => {
    domElements.forEach(e => expect(Animated[e]).toBeDefined());
  });

  it('will the right displayName', () => {
    domElements.forEach(e =>
      expect(Animated[e].displayName).toBe(`Animation.${e}`),
    );
  });
});
