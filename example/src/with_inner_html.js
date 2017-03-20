import React, { Component } from 'react';
import { Animation } from '../../lib';

const Wrapper = (props) => <Animation {...props}>{props.children}</Animation>;

export default class WithInnerHtml extends Component {
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

    getTiming(duration) {
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
            <a href='https://github.com/RinconStrategies/react-web-animation/blob/master/example/src/with_inner_html.js'>
                View Source
            </a>
            <Wrapper keyframes={this.getKeyFrames()} timing={this.getTiming(2500)}>
                <div style={{
                    display: 'flex',
                    pointerEvents: 'none',
                    fontWeight: 'bold',
                    fontSize: '4rem',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                }}>
                    <p dangerouslySetInnerHTML={{ __html: 'Web Animations API Rocks, with InnerHTML' }}/>
                </div>
            </Wrapper>
        </div>;
    }
}
