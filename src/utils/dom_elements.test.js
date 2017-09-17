import domElements from './dom_elements';

describe('domElements', () => {
  it('will export an array', () => {
    expect(domElements).toBeInstanceOf(Array);
  });
  it('will export an array of strings', () => {
    domElements.forEach(s => expect(s).toEqual(expect.any(String)));
  });
});
