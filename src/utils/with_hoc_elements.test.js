import { Component } from 'react';
import PropTypes from 'prop-types';
import withHocElements from './with_hoc_elements';
import domElements from './dom_elements';

describe('withHocElements', () => {
  it('will export an function', () => {
    expect(withHocElements).toBeInstanceOf(Function);
  });

  it('will add a method to the prototype for each element', () => {
    class SomeClass extends Component {}
    SomeClass.propTypes = {};
    const Decorated = withHocElements(SomeClass);
    domElements.forEach(e => expect(Decorated[e]).toBeDefined());
  });

  it('will update the display name of the higher-order classes', () => {
    class SomeClass extends Component {}
    SomeClass.propTypes = {};
    const Decorated = withHocElements(SomeClass);
    domElements.forEach(e =>
      expect(Decorated[e].displayName).toBe(`SomeClass.${e}`),
    );
  });

  describe('the wrapped component', () => {
    it('will set the `node` value on the wrapper', () => {
      class SomeClass extends Component {}
      SomeClass.propTypes = {
        customProp: PropTypes.string,
      };
      const Decorated = withHocElements(SomeClass);
      const decoratedInstance = new Decorated.div();
      decoratedInstance.props = {
        customProp: 'test',
        children: 'Text Child',
      };
      const el = decoratedInstance.render();
      expect(el.ref).toBeInstanceOf(Function);
      const fakeNode = {};
      // call the ref
      el.ref({ node: fakeNode });
      expect(decoratedInstance.node).toBe(fakeNode);
    });

    it('will split the target propTypes from the generated child', () => {
      class SomeClass extends Component {}
      SomeClass.propTypes = {
        customProp: PropTypes.string,
      };
      const Decorated = withHocElements(SomeClass);
      const decoratedInstance = new Decorated.div();
      decoratedInstance.props = {
        customProp: 'test',
        otherProp: 'something else',
      };
      const el = decoratedInstance.render();
      expect(el.props.customProp).toBe('test');
      expect(el.props.otherProp).not.toBeDefined();
      expect(el.props.children.props.customProp).not.toBeDefined();
      expect(el.props.children.props.otherProp).toBe('something else');
    });
  });
});
