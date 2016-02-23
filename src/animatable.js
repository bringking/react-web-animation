import React, {Component, PropTypes, Children} from 'react';

class Animatable extends Component {
    render() {
        const {children,getRef} = this.props;

        this.element = React.cloneElement(children, {
            ref: ( node ) => {
                this.node = node;
                if ( getRef ) {
                    getRef(node);
                }
                return node;
            }
        });

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