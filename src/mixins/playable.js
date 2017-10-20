/**
 * A mixin for components that manage an animation Player.
 */
export default {
  componentWillUnmount() {
    const { player } = this.state;
    const { detachHandlersFromPlayer } = this;
    detachHandlersFromPlayer(player);
  },
  attachHandlersToPlayer(player, props) {
    player.onfinish = props.onFinish;
    player.oncancel = props.onCancel;
  },
  detachHandlersFromPlayer(player) {
    if (player) {
      player.onfinish = null;
      player.oncancel = null;
    }
  },
  notifyHandlers(event) {
    const { player } = this.state;
    if (!player) {
      return;
    }
    switch (event) {
      case 'running':
        if (this.props.onPlay) {
          this.props.onPlay(player);
        }
        break;
      case 'paused':
        if (this.props.onPause) {
          this.props.onPause(player);
        }
        break;
      case 'reversed':
        if (this.props.onReverse) {
          this.props.onReverse(player);
        }
        break;
      default:
        break;
    }
  },
  setPlayer(player, props) {
    // cancel existing animation
    if (this.state.player) {
      this.state.player.cancel();
    }
    this.setState({ player });

    // attach native handlers
    this.attachHandlersToPlayer(player, props || this.props);

    return player;
  },

  /**
   * Shorthand for updating all relevant player state encoded into `props`.
   */
  updatePlayer(props, player = this.state.player) {
    let shouldUpdatePlayerState;
    // if the play state has been changed from the old to the new, or
    if (props.playState !== this.props.playState) {
      shouldUpdatePlayerState = true;
    }
    // different from the current player state
    if (player && player.playState && props.playState !== player.playState) {
      shouldUpdatePlayerState = true;
    }

    // don't do anything if the state is staying at reversed
    if (props.playState === 'reversed' && this.props.playState === 'reversed') {
      shouldUpdatePlayerState = false;
    }

    if (shouldUpdatePlayerState) {
      this.updatePlayState(props, player);
    }

    if (this.props.currentTime !== props.currentTime) {
      this.updateTime(props, player);
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
      default:
        break;
    }

    // notify any handlers of the state change
    this.notifyHandlers(playState);
  },

  updateTime({ currentTime }, player = this.state.player) {
    if (!player || typeof currentTime !== 'number') {
      return;
    }

    player.currentTime = currentTime;
  },
};
