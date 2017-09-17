import React, { Component } from 'react';
import { AnimationGroup, Animatable } from 'react-web-animation';

export default class SvgGroup extends Component {
  getKeyFrames() {
    return [
      { transform: 'scale(.1) rotate(0deg)', opacity: 0.1, offset: 0 },
      { transform: 'scale(1.3) rotate(90deg)', opacity: 1, offset: 0.5 },
      { transform: 'scale(1) rotate(0deg)', opacity: 1, offset: 1 },
    ];
  }

  getTiming(duration) {
    return {
      duration,
      easing: 'ease-in',
      delay: 0,
      iterations: 10,
      direction: 'alternate',
      fill: 'forwards',
    };
  }

  render() {
    return (
      <div style={{ padding: '12px' }}>
        <a href="https://github.com/RinconStrategies/react-web-animation/blob/master/demo/src/svg_group.js">
          View Source
        </a>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            pointerEvents: 'none',
            fontWeight: 'bold',
            fontSize: '4rem',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <AnimationGroup
            component="svg"
            viewBox="0 0 60 60"
            className="svg-group"
          >
            <Animatable.circle
              cx="30"
              cy="30"
              r="10"
              strokeDasharray="0.001, 1.745"
              stroke="hsl(120, 100%, 50%)"
              keyframes={this.getKeyFrames()}
              timing={this.getTiming(4000)}
            />
            <Animatable.circle
              cx="30"
              cy="30"
              r="12"
              strokeDasharray="0.001, 2.094"
              stroke="hsl(108, 100%, 50%)"
              keyframes={this.getKeyFrames()}
              timing={this.getTiming(4100)}
            />
            <Animatable.circle
              cx="30"
              cy="30"
              r="14"
              strokeDasharray="0.001, 2.443"
              stroke="hsl(96, 100%, 50%)"
              keyframes={this.getKeyFrames()}
              timing={this.getTiming(4200)}
            />
            <Animatable.circle
              cx="30"
              cy="30"
              r="16"
              strokeDasharray="0.001, 2.793"
              stroke="hsl(84, 100%, 50%)"
              keyframes={this.getKeyFrames()}
              timing={this.getTiming(4300)}
            />
            <Animatable.circle
              cx="30"
              cy="30"
              r="18"
              strokeDasharray="0.001, 3.142"
              stroke="hsl(72, 100%, 50%)"
              keyframes={this.getKeyFrames()}
              timing={this.getTiming(4400)}
            />
            <Animatable.circle
              cx="30"
              cy="30"
              r="20"
              strokeDasharray="0.001, 3.491"
              stroke="hsl(60, 100%, 50%)"
              keyframes={this.getKeyFrames()}
              timing={this.getTiming(4500)}
            />
            <Animatable.circle
              cx="30"
              cy="30"
              r="22"
              strokeDasharray="0.001, 3.840"
              stroke="hsl(48, 100%, 50%)"
              keyframes={this.getKeyFrames()}
              timing={this.getTiming(4600)}
            />
            <Animatable.circle
              cx="30"
              cy="30"
              r="24"
              strokeDasharray="0.001, 4.189"
              stroke="hsl(36, 100%, 50%)"
              keyframes={this.getKeyFrames()}
              timing={this.getTiming(4700)}
            />
            <Animatable.circle
              cx="30"
              cy="30"
              r="26"
              strokeDasharray="0.001, 4.538"
              stroke="hsl(24, 100%, 50%)"
              keyframes={this.getKeyFrames()}
              timing={this.getTiming(4800)}
            />
            <Animatable.circle
              cx="30"
              cy="30"
              r="28"
              strokeDasharray="0.001, 4.887"
              stroke="hsl(12, 100%, 50%)"
              keyframes={this.getKeyFrames()}
              timing={this.getTiming(4900)}
            />
          </AnimationGroup>
        </div>
      </div>
    );
  }
}
