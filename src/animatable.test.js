import Animatable from './animatable';
import domElements from './utils/dom_elements';

describe('Animatable', () => {
  it('will export an function', () => {
    expect(Animatable).toBeInstanceOf(Function);
  });

  it('will have a method on the prototype for each element', () => {
    domElements.forEach(e => expect(Animatable[e]).toBeDefined());
  });

  it('will the right displayName', () => {
    domElements.forEach(e =>
      expect(Animatable[e].displayName).toBe(`Animatable.${e}`),
    );
  });
});
