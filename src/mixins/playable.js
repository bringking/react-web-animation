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

        return player;
    },

    updatePlayState( player, playState ) {
        if ( player ) {
            let currentState = player.playState;
            switch ( playState ) {
                case 'running':
                    player.play();
                    break;
                case 'paused':
                    if ( currentState !== 'paused' ) {
                        player.pause();
                    }
                    break;
                case 'finished':
                    if ( currentState !== 'finished' ) {
                        player.finish();
                    }
                    break;
                case 'idle':
                    if ( currentState !== 'idle' ) {
                        player.cancel();
                    }
                    break;
                case 'reversed':
                    player.reverse();
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
