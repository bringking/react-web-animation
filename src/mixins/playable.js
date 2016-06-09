/**
 * A mixin for components that manage an animation Player.
 */
export default {

  setPlayer(player) {
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
  updatePlayer(props, player = this.state.player) {

    this.updateTime(props, player);

    if (props.playState !== this.props.playState || props.playState !== player.playState) {
      this.updatePlayState(props, player);
    }

  },

  updatePlayState({ playState }, player = this.state.player) {
    if (!playState || !player || player.playState === playState) {
      return;
    }

    switch (playState) {
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

  updateTime({ currentTime }, player = this.state.player) {
    if (!player || typeof currentTime !== 'number') {
      return;
    }

    // store the current state
    let oldState = player.playState;

    // updating the time causes the player to play again, which is un-expected
    // so we need to reset the state back to it's current state after changing the time
    player.pause();
    player.currentTime = currentTime;

    // restore the old state
    this.updatePlayState({ playState: oldState });

  }

};
