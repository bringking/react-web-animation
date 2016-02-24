import React, {Component, PropTypes, Children} from 'react';

/**
 * The <Animatable/> module wraps an element and expects props
 * with Keyframe Values and a Timing configuration. However, unlike
 * <Animation/> it doesn't start or maintain any players. <Animatable/> is meant
 * to be nested under other effects like <AnimationGroup/> or <AnimationSequence/>
 */
class Animatable extends Component {
    render() {
        // get the children, and optional function to get a ref to the node
        const {children,getRef} = this.props;

        // create our element
        this.element = React.cloneElement(children, {
            ref: ( node ) => {
                this.node = node;
                // if the user supplied a getRef function, pass the ref
                if ( getRef ) {
                    getRef(node);
                }
                return node;
            }
        });

        // render only the child, creating no wrapping elements
        return Children.only(this.element);
    }
}

Animatable.propTypes = {
    children: PropTypes.element.isRequired,
    keyframes: PropTypes.arrayOf(Object),
    getRef: PropTypes.func,
    timing: PropTypes.shape({
        delay: PropTypes.number,
        endDelay: PropTypes.number,
        fill: PropTypes.oneOf(['none', 'forwards', 'backwards', 'both', 'auto']),
        iterationStart: PropTypes.number,
        iterations: PropTypes.number,
        duration: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        direction: PropTypes.oneOf(['normal', 'reverse', 'alternate', 'alternate-reverse']),
        easing: PropTypes.string
    }).isRequired
};

export default Animatable;