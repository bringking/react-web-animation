import React, {Component, PropTypes, Children} from 'react';
import AnimationGroup from './animation_group';
import AnimationSequence from './animation_sequence';
import Animatable from './animatable';
import assign from 'lodash.assign';
var shortid = require('shortid');
import groupBy from 'lodash.groupby';

class TimeLine extends Component {
    constructor() {
        super();

        this.state = {
            player: null
        };

        // store elements in their groups
        this.nestedGroups = [];

        // store elements in their respective sequences
        this.nestedSequences = [];

        // store nested animations
        this.singleAnimations = [];

        this.effect = null;
    }

    boundGetRef( aId, callBack, node ) {
        if ( callBack ) {
            callBack(node);
        }
        let inNestedGroup = this.nestedGroups.filter(i =>aId === i.el.props.aId)[0];
        let inNestedSequences = this.nestedSequences.filter(i =>aId === i.el.props.aId)[0];
        let inSingleAnimations = this.singleAnimations.filter(i =>aId === i.el.props.aId)[0];

        if ( inNestedGroup ) {
            inNestedGroup.node = node;
        }
        if ( inNestedSequences ) {
            inNestedSequences.node = node;
        }
        if ( inSingleAnimations ) {
            inSingleAnimations.node = node;
        }
    }

    getSequenceEffect() {

    }

    getGroupEffect() {
        let singleKeyframeEffects = this.singleAnimations.map(i => {
            return new KeyframeEffect(i.node, i.el.props.keyframes, i.el.props.timing);
        });

        let singleGroup = new GroupEffect(singleKeyframeEffects);

        // group the nested groups to build the effects
        let nestedKeyFrames = this.nestedGroups.map(g => {
            return { idx: g.idx, keyframes: new KeyframeEffect(g.node, g.el.props.keyframes, g.el.props.timing) };
        });

        // build up the groups
        let grouped = groupBy(nestedKeyFrames, 'idx');
        let keys = Object.keys(grouped);

        // flatten the structure, because I don't think it matters
        let groups = keys.map(g => {
            return new GroupEffect(grouped[g].map(k => {
                return k.keyframes;
            }));
        });

        return new GroupEffect([singleGroup, ...groups]);
    }

    setupAnimation( child ) {
        let instance = new child.type();
        if ( instance instanceof AnimationSequence ) {
            this.effect = this.getSequenceEffect();
        } else {
            this.effect = this.getGroupEffect();
        }

    }

    startAnimation() {
        document.timeline.play(this.effect);
    }

    setupRefListeners( child, parent, prevIdx ) {

        let _this = this;

        function attachGetRef( child ) {
            const aId = shortid.generate();
            if ( child.props.getRef ) {
                return React.cloneElement(
                    child,
                    assign({}, child.props, {
                        aId,
                        getRef: _this.boundGetRef.bind(_this, aId, child.props.getRef)
                    }),
                    child.props.children);
            } else {
                return React.cloneElement(child,
                    assign({}, child.props, {
                        aId,
                        getRef: _this.boundGetRef.bind(_this, aId, null)
                    }),
                    child.props.children);
            }

        }

        return Children.map(child.props.children, ( c, idx ) => {
            let instance = new c.type();
            if ( instance instanceof Animatable ) {
                let modified = attachGetRef(c);
                if ( parent ) {
                    parent(modified);
                } else {
                    this.singleAnimations.push({ idx, el: modified });
                }
                return modified;
            }

            if ( instance instanceof AnimationSequence ) {
                const uId = prevIdx !== undefined ? prevIdx + '_' + this.nestedGroups.length : this.nestedGroups.length;
                return this.setupRefListeners(c, ( el )=> {
                    this.nestedSequences.push({ idx: uId, el });
                }, uId);
            }
            if ( instance instanceof AnimationGroup ) {
                const uId = prevIdx !== undefined ? prevIdx + '_' + this.nestedGroups.length : this.nestedGroups.length;
                return this.setupRefListeners(c, ( el ) => {
                    this.nestedGroups.push({ idx: uId, el });
                }, uId);
            }

            return c;

        });
    }


    componentWillMount() {
        let child = Children.only(this.props.children);
        this.mappedChildren = this.setupRefListeners(child);


    }

    componentDidMount() {
        let child = Children.only(this.props.children);
        this.animationConfig = this.setupAnimation(child);
        this.startAnimation();
    }


    render() {
        const {getRef,component} = this.props;
        const {player} = this.state;

        this.element = React.createElement(component, {
            ref: ( node ) => {
                this.node = node;
                if ( getRef ) {
                    getRef(node);
                }
                return node;
            }, player
        }, this.mappedChildren);


        return Children.only(this.element);
    }
}
TimeLine.defaultProps = {
    component: 'div'
};
TimeLine.propTypes = {
    component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    children: ( props, propName, componentName ) => {
        const prop = props[propName];

        let typeError = !(new prop.type() instanceof AnimationGroup) && !(new prop.type() instanceof AnimationSequence);

        if ( typeError ) {
            return new Error(
                '`' + componentName + '` ' +
                'should have a single child of type <AnimationGroup/> || <AnimationSequence/>'
            );
        }
    }
};

export default TimeLine;