import React, { createElement, Component } from 'react'; // eslint-disable-line no-unused-vars
import domElements from './dom_elements';

const createHocForTypes = (Target) => {
  const validPropTypes = Object.keys(Target.propTypes || {});

  const WrapElement = (tag) => {
    return class Wrapped extends Component {
      render() {
        const { children, ...rest } = this.props;

        const propsToAnimation = validPropTypes.reduce((animationProps, validProp) => {
          animationProps[validProp] = rest[validProp];
          return animationProps;
        }, {});

        const propsToChild = Object.keys(rest).reduce((childProps, childProp) => {
          if (validPropTypes.indexOf(childProp) === -1) {
            childProps[childProp] = rest[childProp];
          }
          return childProps;
        }, {});

        return <Target {...propsToAnimation} ref={(el) => {
          if (el && el.node) {
            // pass node reference
            this.node = el.node;
          }
        }}>{createElement(tag, propsToChild, children)}</Target>;

      }
    };
  };

  // Shorthands for all valid HTML Elements
  domElements.forEach(domElement => {

    Target[domElement] = WrapElement(domElement);
    Target[domElement].displayName = `${Target.name || Target.displayName || 'WrapElement'}.${domElement}`;
  });

  return Target;
};

export default createHocForTypes;
