import React,{ Component } from 'react';
import {Animation} from '../../lib';
import range from 'lodash.range';
import assign from 'lodash.assign';
import flatten from 'lodash.flatten';

export default class AnimateCss extends Component {
    constructor() {
        super();
        this.state = {
            selected: 'bounce',
            selections: Object.keys(animate)
        };
    }


    getStyles() {
        return {
            body: {
                background: '#b4d8d9',
                margin: '0px',
                color: 'white',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            },


            controls: {
                marginTop: '50px',
                textAlign: 'center'
            },

            box: {
                background: '#363ca1',
                borderRadius: '4px',
                boxShadow: '0 1px 2px 1px rgba(0, 0, 0, 0.25)',
                width: '25vw',
                height: '25vw',
                minWidth: '160px',
                minHeight: '160px',
                willChange: 'transform',
                cursor: 'pointer'
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


    render() {
        const {body,sourceLink,box} = this.getStyles();

        return <div style={body} ref="container">
            <div id="boxContainer">
                <div style={box} id="box"></div>
            </div>
            <a style={sourceLink}
               href='https://github.com/RinconStrategies/react-web-animation/blob/master/example/src/animate_css.js'>
                View Source
            </a>
        </div>;
    }
}
const animate = {
    bounce( iterations ) {
        const keyframes = [
            { transform: 'translate3d(0,0,0)', offset: 0 },
            { transform: 'translate3d(0,0,0)', offset: 0.2 },
            { transform: 'translate3d(0,-30px,0)', offset: 0.4 },
            { transform: 'translate3d(0,-30px,0)', offset: 0.43 },
            { transform: 'translate3d(0,0,0)', offset: 0.53 },
            { transform: 'translate3d(0,-15px,0)', offset: 0.7 },
            { transform: 'translate3d(0,0,0)', offset: 0.8 },
            { transform: 'translate3d(0,-15px,0)', offset: 0.9 },
            { transform: 'translate3d(0,0,0)', offset: 1 }];
        const timing = { duration: 900, iterations: iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)' };
        return { keyframes, timing };
    },
    bounceIn( iterations )
    {
        const keyframes = [
            { transform: 'scale3d(.3, .3, .3)', opacity: '0', offset: 0 },
            { transform: 'scale3d(1.1, 1.1, 1.1)', offset: 0.2 },
            { transform: 'scale3d(.9, .9, .9)', offset: 0.4 },
            { transform: 'scale3d(1.03, 1.03, 1.03)', opacity: '1', offset: 0.6 },
            { transform: 'scale3d(.97, .97, .97)', offset: 0.8 },
            { transform: 'scale3d(1, 1, 1)', opacity: '1', offset: 1 }];
        const timing = { duration: 900, iterations: iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)' };
        return { keyframes, timing };
    },
    bounceOut( iterations ) {
        const keyframes = [
            { transform: 'none', opacity: '1', offset: 0 },
            { transform: 'scale3d(.9, .9, .9)', opacity: '1', offset: 0.2 },
            { transform: 'scale3d(1.1, 1.1, 1.1)', opacity: '1', offset: 0.5 },
            { transform: 'scale3d(1.1, 1.1, 1.1)', opacity: '1', offset: 0.55 },
            { transform: 'scale3d(.3, .3, .3)', opacity: '0', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    bounceInDown( iterations ) {
        const keyframes = [
            { transform: 'translate3d(0, -3000px, 0)', opacity: '0', offset: 0 },
            { transform: 'translate3d(0, 25px, 0)', opacity: '1', offset: 0.6 },
            { transform: 'translate3d(0, -100px, 0)', offset: 0.75 },
            { transform: 'translate3d(0, 5px, 0)', offset: 0.9 },
            { transform: 'none', opacity: '1', offset: 1 }];
        const timing = { duration: 900, iterations: iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)' };
        return { keyframes, timing };
    },
    bounceOutDown( iterations ) {
        const keyframes = [
            { transform: 'none', opacity: '1', offset: 0 },
            { transform: 'translate3d(0, 50px, 0)', opacity: '1', offset: 0.2 },
            { transform: 'translate3d(0, -20px, 0)', opacity: '1', offset: 0.4 },
            { transform: 'translate3d(0, -20px, 0)', opacity: '1', offset: 0.45 },
            { transform: 'translate3d(0, 2000px, 0)', opacity: '0', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    bounceInUp( iterations ) {
        const keyframes = [
            { transform: 'translate3d(0, 3000px, 0)', opacity: '0', offset: 0 },
            { transform: 'translate3d(0, -25px, 0)', opacity: '1', offset: 0.6 },
            { transform: 'translate3d(0, 100px, 0)', offset: 0.75 },
            { transform: 'translate3d(0, -5px, 0)', offset: 0.9 },
            { transform: 'translate3d(0, 0, 0)', opacity: '1', offset: 1 }];
        const timing = { duration: 900, iterations: iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)' };
        return { keyframes, timing };
    },
    bounceOutUp( iterations ) {
        const keyframes = [
            { transform: 'none', opacity: '1', offset: 0 },
            { transform: 'translate3d(0, 50px, 0)', opacity: '1', offset: 0.2 },
            { transform: 'translate3d(0, 20px, 0)', opacity: '1', offset: 0.4 },
            { transform: 'translate3d(0, 20px, 0)', opacity: '1', offset: 0.45 },
            { transform: 'translate3d(0, -2000px, 0)', opacity: '0', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    bounceInLeft( iterations ) {
        const keyframes = [
            { transform: 'translate3d(-3000px, 0, 0)', opacity: '0', offset: 0 },
            { transform: 'translate3d(25px, 0, 0)', opacity: '1', offset: 0.6 },
            { transform: 'translate3d(-100px, 0, 0)', offset: 0.75 },
            { transform: 'translate3d(5px, 0, 0)', offset: 0.9 },
            { transform: 'none', opacity: '1', offset: 1 }];
        const timing = { duration: 900, iterations: iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)' };
        return { keyframes, timing };
    },
    bounceOutLeft( iterations ) {
        const keyframes = [
            { transform: 'none', opacity: '1', offset: 0 },
            { transform: 'translate3d(100px, 0, 0)', opacity: '1', offset: 0.2 },
            { transform: 'translate3d(-20px, 0, 0)', opacity: '1', offset: 0.4 },
            { transform: 'translate3d(-20px, 0, 0)', opacity: '1', offset: 0.45 },
            { transform: 'translate3d(-2000px, 0, 0)', opacity: '0', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    bounceInRight( iterations ) {
        const keyframes = [
            { transform: 'translate3d(3000px, 0, 0)', opacity: '0', offset: 0 },
            { transform: 'translate3d(-25px, 0, 0)', opacity: '1', offset: 0.6 },
            { transform: 'translate3d(100px, 0, 0)', offset: 0.75 },
            { transform: 'translate3d(-5px, 0, 0)', offset: 0.9 },
            { transform: 'none', opacity: '1', offset: 1 }];
        const timing = { duration: 900, iterations: iterations, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)' };
        return { keyframes, timing };
    },
    bounceOutRight( iterations ) {
        const keyframes = [
            { transform: 'none', opacity: '1', offset: 0 },
            { transform: 'translate3d(100px, 0, 0)', opacity: '1', offset: 0.2 },
            { transform: 'translate3d(-20px, 0, 0)', opacity: '1', offset: 0.4 },
            { transform: 'translate3d(-20px, 0, 0)', opacity: '1', offset: 0.45 },
            { transform: 'translate3d(2000px, 0, 0)', opacity: '0', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    flip( iterations ) {
        const keyframes = [
            { transform: 'perspective(400px) rotate3d(0, 1, 0, -360deg)', offset: 0 },
            { transform: 'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg)', offset: 0.4 },
            { transform: 'perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg)', offset: 0.5 },
            { transform: 'perspective(400px) scale3d(.95, .95, .95)', offset: 0.8 },
            { transform: 'perspective(400px)', offset: 1 }];
        const timing = { duration: 900, iterations: iterations, easing: 'ease-in' };
        return { keyframes, timing };
    },
    flipInX( iterations ) {
        const keyframes = [
            { transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)', opacity: '0', offset: 0 },
            { transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)', offset: 0.4 },
            { transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)', opacity: '1', offset: 0.6 },
            { transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)', opacity: '1', offset: 0.8 },
            { transform: 'perspective(400px)', opacity: '1', offset: 1 }];
        const timing = { duration: 900, iterations: iterations, easing: 'ease-in' };
        return { keyframes, timing };
    },
    flipOutX( iterations ) {
        const keyframes = [
            { transform: 'perspective(400px)', opacity: '1', offset: 0 },
            { transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)', opacity: '1', offset: 0.3 },
            { transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)', opacity: '0', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    flipInY( iterations ) {
        const keyframes = [
            { transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)', opacity: '0', offset: 0 },
            { transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)', offset: 0.4 },
            { transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)', opacity: '1', offset: 0.6 },
            { transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)', opacity: '1', offset: 0.8 },
            { transform: 'perspective(400px)', opacity: '1', offset: 1 }];
        const timing = { duration: 900, iterations: iterations, easing: 'ease-in' };
        return { keyframes, timing };
    },
    flipOutY( iterations ) {
        const keyframes = [
            { transform: 'perspective(400px)', opacity: '1', offset: 0 },
            { transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)', opacity: '1', offset: 0.3 },
            { transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)', opacity: '0', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    flash( iterations ) {
        const keyframes = [
            { opacity: '1', offset: 0 },
            { opacity: '0', offset: 0.25 },
            { opacity: '1', offset: 0.5 },
            { opacity: '0', offset: 0.75 },
            { opacity: '1', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    pulse( iterations ) {
        const keyframes = [
            { transform: 'scale3d(1, 1, 1)', offset: 0 },
            { transform: 'scale3d(1.05, 1.05, 1.05)', offset: 0.5 },
            { transform: 'scale3d(1, 1, 1)', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    rubberBand( iterations ) {
        const keyframes = [
            { transform: 'scale3d(1, 1, 1)', offset: 0 },
            { transform: 'scale3d(1.25, 0.75, 1)', offset: 0.3 },
            { transform: 'scale3d(0.75, 1.25, 1)', offset: 0.4 },
            { transform: 'scale3d(1.15, 0.85, 1)', offset: 0.5 },
            { transform: 'scale3d(.95, 1.05, 1)', offset: 0.65 },
            { transform: 'scale3d(1.05, .95, 1)', offset: 0.75 },
            { transform: 'scale3d(1, 1, 1)', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    lightSpeedInRight( iterations ) {
        const keyframes = [
            { transform: 'translate3d(100%, 0, 0) skewX(-30deg)', opacity: '0', offset: 0 },
            { transform: 'skewX(20deg)', opacity: '1', offset: 0.6 },
            { transform: 'skewX(-5deg)', opacity: '1', offset: 0.8 },
            { transform: 'none', opacity: '1 ', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    lightSpeedOutRight( iterations ) {
        const keyframes = [{ transform: 'none', opacity: '1 ', offset: 0 },
            { transform: 'translate3d(100%, 0, 0) skewX(30deg)', opacity: '0', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    lightSpeedInLeft( iterations ) {
        const keyframes = [
            { transform: 'translate3d(-100%, 0, 0) skewX(-30deg)', opacity: '0', offset: 0 },
            { transform: 'skewX(20deg)', opacity: '1', offset: 0.6 },
            { transform: 'skewX(-5deg)', opacity: '1', offset: 0.8 },
            { transform: 'none', opacity: '1 ', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    lightSpeedOutLeft( iterations ) {
        const keyframes = [{ transform: 'none', opacity: '1 ', offset: 0 },
            { transform: 'translate3d(-100%, 0, 0) skewX(30deg)', opacity: '0', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    shake( iterations ) {
        const keyframes = [
            { transform: 'translate3d(0, 0, 0)', offset: 0 },
            { transform: 'translate3d(-10px, 0, 0)', offset: 0.1 },
            { transform: 'translate3d(10px, 0, 0)', offset: 0.2 },
            { transform: 'translate3d(-10px, 0, 0)', offset: 0.3 },
            { transform: 'translate3d(10px, 0, 0)', offset: 0.4 },
            { transform: 'translate3d(-10px, 0, 0)', offset: 0.5 },
            { transform: 'translate3d(10px, 0, 0)', offset: 0.6 },
            { transform: 'translate3d(-10px, 0, 0)', offset: 0.7 },
            { transform: 'translate3d(10px, 0, 0)', offset: 0.8 },
            { transform: 'translate3d(-10px, 0, 0)', offset: 0.9 },
            { transform: 'translate3d(0, 0, 0)', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    swing( iterations ) {
        const keyframes = [
            { transform: 'translate(0%)', offset: 0 },
            { transform: 'rotate3d(0, 0, 1, 15deg)', offset: 0.2 },
            { transform: 'rotate3d(0, 0, 1, -10deg)', offset: 0.4 },
            { transform: 'rotate3d(0, 0, 1, 5deg)', offset: 0.6 },
            { transform: 'rotate3d(0, 0, 1, -5deg)', offset: 0.8 },
            { transform: 'rotate3d(0, 0, 1, 0deg)', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    tada( iterations ) {
        const keyframes = [
            { transform: 'scale3d(1, 1, 1)', offset: 0 },
            { transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)', offset: 0.1 },
            { transform: 'scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg)', offset: 0.2 },
            { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.3 },
            { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)', offset: 0.4 },
            { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.5 },
            { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)', offset: 0.6 },
            { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.7 },
            { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)', offset: 0.8 },
            { transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)', offset: 0.9 },
            { transform: 'scale3d(1, 1, 1)', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    wobble( iterations ) {
        const keyframes = [
            { transform: 'translate(0%)', offset: 0 },
            { transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)', offset: 0.15 },
            { transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)', offset: 0.45 },
            { transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)', offset: 0.6 },
            { transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)', offset: 0.75 },
            { transform: 'translateX(0%)', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    fadeIn( iterations ) {
        const keyframes = [
            { opacity: '0', offset: 0 },
            { opacity: '1', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    fadeOut( iterations ) {
        const keyframes = [
            { opacity: '1', offset: 0 },
            { opacity: '0', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    fadeInDown( iterations ) {
        const keyframes = [
            { opacity: '0', transform: 'translate3d(0, -100%, 0)', offset: 0 },
            { opacity: '1', transform: 'none', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    fadeOutDown( iterations ) {
        const keyframes = [{ opacity: '1', transform: 'none', offset: 0 },
            { opacity: '0', transform: 'translate3d(0, 100%, 0)', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    fadeOutUp( iterations ) {
        const keyframes = [{ opacity: '1', transform: 'none', offset: 0 },
            { opacity: '0', transform: 'translate3d(0, -100%, 0)', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    fadeOutUpBig( iterations ) {
        const keyframes = [
            { opacity: '1', transform: 'none', offset: 0 },
            { opacity: '0', transform: 'translate3d(0, -2000px, 0)', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    fadeInUp( iterations ) {
        const keyframes = [
            { opacity: '0', transform: 'translate3d(0, 100%, 0)', offset: 0 },
            { opacity: '1', transform: 'none', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    fadeInDownBig( iterations ) {
        const keyframes = [
            { opacity: '0', transform: 'translate3d(0, -2000px, 0)', offset: 0 },
            { opacity: '1', transform: 'none', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    fadeOutDownBig( iterations ) {
        const keyframes = [{ opacity: '1', transform: 'none', offset: 0 },
            { opacity: '0', transform: 'translate3d(0, 2000px, 0)', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    fadeInUpBig( iterations ) {
        const keyframes = [
            { opacity: '0', transform: 'translate3d(0, 2000px, 0)', offset: 0 },
            { opacity: '1', transform: 'none', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    fadeInRightBig( iterations ) {
        const keyframes = [
            { opacity: '0', transform: 'translate3d(2000px, 0, 0)', offset: 0 },
            { opacity: '1', transform: 'none', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    fadeOutLeftBig( iterations ) {
        const keyframes = [{ opacity: '1', transform: 'none', offset: 0 },
            { opacity: '0', transform: 'translate3d(-2000px, 0, 0)', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    fadeInLeft( iterations ) {
        const keyframes = [
            { opacity: '0', transform: 'translate3d(-100%, 0, 0)', offset: 0 },
            { opacity: '1', transform: 'none', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    fadeInLeftBig( iterations ) {
        const keyframes = [
            { opacity: '0', transform: 'translate3d(-2000px, 0, 0)', offset: 0 },
            { opacity: '1', transform: 'none', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    fadeInRight( iterations ) {
        const keyframes = [
            { opacity: '0', transform: 'translate3d(100%, 0, 0)', offset: 0 },
            { opacity: '1', transform: 'none', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    fadeOutLeft( iterations ) {
        const keyframes = [{ opacity: '1', transform: 'none', offset: 0 },
            { opacity: '0', transform: 'translate3d(-100%, 0, 0)', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    fadeOutRight( iterations ) {
        const keyframes = [
            { opacity: '1', transform: 'none', offset: 0 },
            { opacity: '0', transform: 'translate3d(100%, 0, 0)', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    fadeOutRightBig( iterations ) {
        const keyframes = [
            { opacity: '1', transform: 'none', offset: 0 },
            { opacity: '0', transform: 'translate3d(2000px, 0, 0)', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    rollIn( iterations ) {
        const keyframes = [{
            transform: 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)',
            opacity: '0',
            offset: 0
        },
            { transform: 'none', opacity: '1', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    rollOut( iterations ) {
        const keyframes = [{ transform: 'none', opacity: '1', offset: 0 },
            { transform: 'translate3d(100%, 0, 0) rotate3d(0, 0, 1, -120deg)', opacity: '0', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    zoomIn( iterations ) {
        const keyframes = [{ transform: 'scale3d(.3, .3, .3)  ', opacity: '0', offset: 0 },
            { transform: 'none', opacity: '1', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    zoomOutDown( iterations ) {

        const keyframes = [{ transform: 'none', opacity: '1', transformOrigin: 'center bottom', offset: 0 },
            {
                transform: 'scale3d(.475, .475, .475) translate3d(0, -60px, 0)',
                opacity: '1',
                transformOrigin: 'center bottom',
                offset: 0.4
            },
            {
                transform: 'scale3d(.1, .1, .1) translate3d(0, 2000px, 0)',
                opacity: '0',
                transformOrigin: 'center bottom',
                offset: 1
            }];
        const timing = { duration: 900, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)' };
        return { keyframes, timing };
    },
    zoomOutUp( iterations ) {

        const keyframes = [{ transform: 'none', opacity: '1', transformOrigin: 'center bottom', offset: 0 },
            {
                transform: 'scale3d(.475, .475, .475) translate3d(0, 60px, 0)',
                opacity: '1',
                transformOrigin: 'center bottom',
                offset: 0.4
            },
            {
                transform: 'scale3d(.1, .1, .1) translate3d(0, -2000px, 0)',
                opacity: '0',
                transformOrigin: 'center bottom',
                offset: 1
            }];
        const timing = { duration: 900, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)' };
        return { keyframes, timing };
    },
    zoomOutRight( iterations ) {

        const keyframes = [{ transform: 'none', opacity: '1', transformOrigin: 'right center', offset: 0 },
            {
                transform: 'scale3d(.475, .475, .475) translate3d(-42px, 0, 0)',
                opacity: '1',
                transformOrigin: 'right center',
                offset: 0.4
            },
            {
                transform: 'scale(.1) translate3d(2000px, 0, 0)',
                opacity: '0',
                transformOrigin: 'right center',
                offset: 1
            }];
        const timing = { duration: 900, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)' };
        return { keyframes, timing };
    },
    zoomOutLeft( iterations ) {

        const keyframes = [{ transform: 'none', opacity: '1', transformOrigin: 'left center', offset: 0 },
            {
                transform: 'scale3d(.475, .475, .475) translate3d(42px, 0, 0)',
                opacity: '1',
                transformOrigin: 'left center',
                offset: 0.4
            },
            {
                transform: 'scale(.1) translate3d(-2000px, 0, 0)',
                opacity: '0',
                transformOrigin: 'left center',
                offset: 1
            }];
        const timing = { duration: 900, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)' };
        return { keyframes, timing };
    },
    zoomInDown( iterations ) {
        const keyframes = [{ transform: 'scale3d(.1, .1, .1) translate3d(0, -1000px, 0)', opacity: '0', offset: 0 },
            { transform: 'scale3d(.475, .475, .475) translate3d(0, 60px, 0)', opacity: '1', offset: 0.6 },
            { transform: 'none', opacity: '1', offset: 1 }];
        const timing = { duration: 900, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)' };
        return { keyframes, timing };
    },
    zoomInLeft( iterations ) {
        const keyframes = [{ transform: 'scale3d(.1, .1, .1) translate3d(-1000px, 0, 0)', opacity: '0', offset: 0 },
            { transform: 'scale3d(.475, .475, .475) translate3d(10px, 0, 0)', opacity: '1', offset: 0.6 },
            { transform: 'none', opacity: '1', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    zoomInRight( iterations ) {
        const keyframes = [{ transform: 'scale3d(.1, .1, .1) translate3d(1000px, 0, 0)', opacity: '0', offset: 0 },
            { transform: 'scale3d(.475, .475, .475) translate3d(-10px, 0, 0)', opacity: '1', offset: 0.6 },
            { transform: 'none', opacity: '1', offset: 1 }];
        const timing = { duration: 900, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)' };
        return { keyframes, timing };
    },
    zoomInUp( iterations ) {
        const keyframes = [{ transform: 'scale3d(.1, .1, .1) translate3d(0, 1000px, 0)', opacity: '0', offset: 0 },
            { transform: 'scale3d(.475, .475, .475) translate3d(0, -60px, 0)', opacity: '1', offset: 0.6 },
            { transform: 'none', opacity: '1', offset: 1 }];
        const timing = { duration: 900, iterations: iterations, easing: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)' };
        return { keyframes, timing };
    },
    zoomOut( iterations ) {
        const keyframes = [{ transform: 'none', opacity: '1', offset: 0 },
            { transform: 'scale3d(.3, .3, .3)  ', opacity: '0', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    rotateIn( iterations ) {

        const keyframes = [{
            transform: 'rotate3d(0, 0, 1, -200deg)',
            opacity: '0',
            transformOrigin: 'center',
            offset: 0
        },
            { transform: 'none', opacity: '1', transformOrigin: 'center', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    rotateInDownLeft( iterations ) {

        const keyframes = [{
            transform: 'rotate3d(0, 0, 1, -45deg)',
            opacity: '0',
            transformOrigin: 'left bottom',
            offset: 0
        },
            { transform: 'none', opacity: '1', transformOrigin: 'left bottom', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    rotateInDownRight( iterations ) {

        const keyframes = [{
            transform: 'rotate3d(0, 0, 1, 45deg)',
            opacity: '0',
            transformOrigin: 'right bottom',
            offset: 0
        },
            { transform: 'none', opacity: '1', transformOrigin: 'right bottom', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    rotateInUpLeft( iterations ) {

        const keyframes = [{
            transform: 'rotate3d(0, 0, 1, 45deg)',
            opacity: '0',
            transformOrigin: 'left bottom',
            offset: 0
        },
            { transform: 'none', opacity: '1', transformOrigin: 'left bottom', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    rotateInUpRight( iterations ) {

        const keyframes = [{
            transform: 'rotate3d(0, 0, 1, -45deg)',
            opacity: '0',
            transformOrigin: 'right bottom',
            offset: 0
        },
            { transform: 'none', opacity: '1', transformOrigin: 'right bottom', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    rotateOutDownLeft( iterations ) {

        const keyframes = [{ transform: 'none', opacity: '1', transformOrigin: 'left bottom', offset: 0 },
            { transform: 'rotate3d(0, 0, 1, 45deg)', opacity: '0', transformOrigin: 'left bottom', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    rotateOutDownRight( iterations ) {

        const keyframes = [{ transform: 'none', opacity: '1', transformOrigin: 'right bottom', offset: 0 },
            { transform: 'rotate3d(0, 0, 1, -45deg)', opacity: '0', transformOrigin: 'right bottom', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };
        return { keyframes, timing };
    },
    rotateOutUpLeft( iterations ) {

        const keyframes = [{ transform: 'none', opacity: '1', transformOrigin: 'left bottom', offset: 0 },
            { transform: 'rotate3d(0, 0, 1, -45deg)', opacity: '0', transformOrigin: 'left bottom', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };

        return { keyframes, timing };
    },
    rotateOutUpRight( iterations ) {

        const keyframes = [{ transform: 'none', opacity: '1', transformOrigin: 'right bottom', offset: 0 },
            { transform: 'rotate3d(0, 0, 1, 45deg)', opacity: '0', transformOrigin: 'right bottom', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };

        return { keyframes, timing };
    },
    rotateOut( iterations ) {

        const keyframes = [{ transform: 'none', opacity: '1', transformOrigin: 'center', offset: 0 },
            { transform: 'rotate3d(0, 0, 1, 200deg)', opacity: '0', transformOrigin: 'center', offset: 1 }];
        const timing = { duration: 900, iterations: iterations };

        return { keyframes, timing };

    }
};