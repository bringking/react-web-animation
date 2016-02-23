import React,{ Component } from 'react';
import {Animation, AnimationGroup, AnimationSequence, Animatable} from '../../lib';


export default class App extends Component {
    getKeyFrames() {
        return [{ transform: 'scale(1)', opacity: 1, offset: 0 },
            { transform: 'scale(.5)', opacity: 0.5, offset: 0.3 },
            { transform: 'scale(.667)', opacity: 0.667, offset: 0.7875 },
            { transform: 'scale(.6)', opacity: 0.6, offset: 1 }
        ];
    }

    componentDidMount() {
        console.log(this.refs.node);
    }

    getTiming( duration ) {
        return {
            duration,
            easing: 'ease-in-out',
            delay: 0,
            iterations: 2,
            direction: 'alternate',
            fill: 'forwards'
        };
    }

    getRef( node ) {
        console.log(node);
    }

    render() {
        return <div>
            <Animation keyframes={this.getKeyFrames()} getRef={this.getRef.bind(this)}
                       timing={this.getTiming(10000)}>
                <div>Hello, world. Standalone</div>
            </Animation>
            <br/>
            <AnimationGroup>
                <Animatable id="1" keyframes={this.getKeyFrames()} timing={this.getTiming(2000)}>
                    <div style={{paddingLeft: '0px'}}>Group 1-1</div>
                </Animatable>
                <Animatable id="2" keyframes={this.getKeyFrames()} timing={this.getTiming(2000)}>
                    <div style={{paddingLeft: '0px'}}>Group 1-2</div>
                </Animatable>
            </AnimationGroup>
            <AnimationSequence>
                <Animatable id="1" keyframes={this.getKeyFrames()} timing={this.getTiming(2000)}>
                    <div style={{paddingLeft: '0px'}}>Sequence 1-1</div>
                </Animatable>
                <Animatable id="2" keyframes={this.getKeyFrames()} timing={this.getTiming(2000)}>
                    <div style={{paddingLeft: '0px'}}>Sequence 1-2</div>
                </Animatable>
            </AnimationSequence>
        </div>;
    }
}
