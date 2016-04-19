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

    /**
     * Shorthand for updating all relevant player state encoded into `props`.
     */
    updatePlayer( props, player ) {
        console.log('updatePlayer(', props, player, ')');
        this.updatePlayState(props.playState, player);
        this.updateTime(props.currentTime, player);
    },

    updatePlayState( playState, player = this.state.player ) {
        console.log('updatePlayState(', playState, player, ')');
        if ( !playState || !player || player.currentState === playState ) {
            return;
        }

        switch ( playState ) {
            case 'running':
                player.play();
                break;
            case 'paused':
                player.pause();
                break;
            case 'finished':
                player.finish();
                break;
            case 'idle':
                player.cancel();
                break;
            case 'reversed':
                player.reverse();
                break;
        }
    },

    updateTime( currentTime, player = this.state.player ) {
        console.log('updateTime(', currentTime, player, ')');
        if ( !player || typeof currentTime !== 'number' ) {
            return;
        }

        player.pause();
        player.currentTime = currentTime;
    },

};
