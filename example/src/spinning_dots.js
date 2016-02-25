import React,{ Component } from 'react';
import {Animation} from '../../lib';
import range from 'lodash.range';
import assign from 'lodash.assign';
import flatten from 'lodash.flatten';

export default class SpinningDots extends Component {
    constructor() {
        super();
        this.state = {
            layers: 9,
            start: 4
        };
    }


    getStyles() {
        return {
            body: {
                background: '#0e7cf0',
                margin: '0px',
                color: 'white',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            },
            a: {
                color: '#6db0f7'
            },
            circle: {
                background: '#2a2a2a',
                borderRadius: '50%',
                width: '10px',
                height: '10px',
                position: 'absolute',
                top: '50%',
                left: '50%'
            },
            sourceLink: {
                textDecoration: 'none',
                padding: '6px',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
                backgroundColor: 'white',
                color: 'black',
                position: 'absolute',
                top: 0,
                right: 0
            }
        };
    }


    getRotationAndTranslateForCircle( layer, fraction ) {
        const rotate = `rotate(${(360 * fraction)}deg)`;
        const translate = `translate(${(layer * 20 - 2.5)}px)`;
        return { rotation: rotate, translation: translate };
    }

    getAnimationForCircle( layer, rotation, translation ) {

        return {
            keyframes: [
                { transform: rotation + ' rotate(0deg) ' + translation },
                { transform: rotation + ' rotate(360deg) ' + translation }
            ], timing: {
                duration: 1000 * layer,
                iterations: Infinity
            }
        };
    }

    renderCircles( layerCount, startCount ) {

        let {circle} = this.getStyles();

        return flatten(range(layerCount).map(( l, idx ) => {
            const n = idx * startCount;

            return range(n).map(( c, cIdx ) => {

                let {rotation,translation} = this.getRotationAndTranslateForCircle(idx, cIdx / n);
                let {keyframes,timing} = this.getAnimationForCircle(idx, rotation, translation);

                return <Animation key={idx + '_' + cIdx} keyframes={keyframes} timing={timing}>
                    <div style={assign({},circle,{transform: `${rotation} ${translation}`})}></div>
                </Animation>;
            });
        }));

    }

    render() {
        const {body,sourceLink} = this.getStyles();
        const {layers,start} = this.state;

        return <div style={body} ref="container">
            {this.renderCircles(layers, start)}
            <a style={sourceLink}
               href='https://github.com/RinconStrategies/react-web-animation/blob/master/example/src/spinning_dots.js'>
                View Source
            </a>
        </div>;
    }
}
