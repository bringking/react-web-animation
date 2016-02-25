import React,{ Component } from 'react';
import {AnimationGroup, Animatable} from '../../lib';
import range from 'lodash.range';
import assign from 'lodash.assign';

export default class ParallaxStarfield extends Component {
    constructor() {
        super();
        this.state = {
            layerCount: 5,
            starCount: 100,
            width: 0,
            height: 0
        };
    }

    componentDidMount() {
        // store the height and width of the container
        let width = this.refs.container.clientWidth;
        let height = this.refs.container.clientHeight;

        this.setState({ width, height });
    }

    getStyles() {
        return {
            body: {
                backgroundColor: 'black',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            },
            star0: {
                height: '1px',
                width: '1px',
                opacity: 1,
                position: 'absolute'
            },
            star1: {
                height: '2px',
                width: '2px',
                opacity: 1,
                borderRadius: '50%',
                position: 'absolute'
            },
            star2: {
                height: '3px',
                width: '3px',
                opacity: 1,
                borderRadius: '50%',
                position: 'absolute'
            },
            star3: {
                height: '4px',
                width: '4px',
                opacity: 1,
                borderRadius: '50%',
                position: 'absolute'
            },
            star4: {
                height: '4px',
                width: '4px',
                opacity: 1,
                borderRadius: '50%',
                position: 'absolute'
            }
        };
    }

    getStarsForLayer( layer ) {
        const {starCount} = this.state;
        let style = this.getStyles();
        return range(starCount).map(i => {
            const xpos = Math.round(Math.random() * this.state.width);
            const ypos = Math.round(Math.random() * this.state.height);

            return range(2).map(s => {
                let starStyle = assign({}, style[`star${layer % 5}`], {
                    transform: `translate(${(xpos + s * this.state.width)}px,${ypos}px)`,
                    backgroundColor: 'white'
                });

                return <div key={i + s} style={starStyle}></div>;

            });


        });
    }

    getLayers( count ) {
        return <AnimationGroup style={{position: 'absolute', width: '100%', height: '100%'}}>
            {
                range(count).map(i =>
                    <Animatable key={i}
                                keyframes={[{transform: 'translate3d(0, 0, 0)'}, {transform: `translate3d(-${this.state.width}px, 0, 0)`}]}
                                timing={{duration: Math.pow(2, this.state.layerCount - i) * 1000, iterations: Math.pow(2, i)}}>
                        <div id={`layer_${i}`}>
                            {this.getStarsForLayer(i)}
                        </div>
                    </Animatable>)
            }
        </AnimationGroup>;
    }

    render() {
        const {body} = this.getStyles();
        const {layerCount} = this.state;

        return <div style={body} ref="container">
            { this.state.width && this.state.height ? this.getLayers(layerCount) : null}
        </div>;
    }
}
