import React,{ Component } from 'react';
import {Animation, AnimationGroup, AnimationSequence, Animatable} from '../../lib';


export default class Basic extends Component {
    constructor() {
        super();
        this.state = {
            currentTime: 0,
            playState: 'running'
        };
    }

    getKeyFrames() {
        return [{ transform: 'scale(1)', opacity: 1, offset: 0 },
            { transform: 'scale(.5)', opacity: 0.5, offset: 0.3 },
            { transform: 'scale(.667)', opacity: 0.667, offset: 0.7875 },
            { transform: 'scale(.6)', opacity: 0.6, offset: 1 }
        ];
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

    render() {
        return <div>
            <label>Current Time: </label>
            <input type="range" min="0" max="5000" value={this.state.currentTime}
                   onChange={(e)=>{this.setState({currentTime: parseInt(e.target.value,10)});}}/>

            <div>
                <label>Player Controls: </label>
                <button onClick={()=>{this.setState({playState: 'running'});}}>Play ▶</button>
                <button onClick={()=>{this.setState({playState: 'paused'});}}>Pause ❚❚</button>
                <button onClick={()=>{this.setState({playState: 'idle'});}}>Stop ◼</button>
                <button onClick={()=>{this.setState({playState: 'reversed'});}}>Reverse ↺</button>
                <button onClick={()=>{this.setState({playState: 'finished'});}}>Finish ⇥</button>
            </div>
            <a href='https://github.com/RinconStrategies/react-web-animation/blob/master/example/src/basic.js'>View Source</a>
            <Animation playState={this.state.playState} keyframes={this.getKeyFrames()}
                       timing={this.getTiming(2500)} currentTime={this.state.currentTime}>
                <div
                    style={{display: 'flex', pointerEvents: 'none',fontWeight:'bold', fontSize: '4rem', alignItems: 'center',justifyContent: 'center',position: 'absolute',top: 0,left: 0,width: '100%',height: '100%'}}>
                    Web Animations API Rocks
                </div>
            </Animation>
        </div>;
    }
}
