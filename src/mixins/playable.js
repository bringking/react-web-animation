/**
 * A mixin for components that manage an animation Player.
 */
export default {

    setPlayer( player ) {
        // cancel existing animation
        if (this.state.player) {
            this.state.player.cancel();
        }
        this.setState({ player });
    },

    updatePlayState( props ) {
        if ( this.state.player ) {
            let currentState = this.state.player.playState;
            switch ( props.playState ) {
                case 'running':
                    this.state.player.play();
                    break;
                case 'paused':
                    if ( currentState !== 'paused' ) {
                        this.state.player.pause();
                    }
                    break;
                case 'finished':
                    if ( currentState !== 'finished' ) {
                        this.state.player.finish();
                    }
                    break;
                case 'idle':
                    if ( currentState !== 'idle' ) {
                        this.state.player.cancel();
                    }
                    break;
                case 'reversed':
                    this.state.player.reverse();
                    break;
            }
        }
    },

    updateTime( props ) {
        if ( this.state.player ) {
            this.state.player.pause();
            this.state.player.currentTime = props.currentTime;
        }
    },

};
