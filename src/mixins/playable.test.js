describe('playable', () => {
  let playable;
  beforeEach(() => {
    playable = Object.assign({}, require('./playable').default);
  });

  it('will export an object', () => {
    expect(playable).toBeInstanceOf(Object);
  });

  describe('componentWillUnmount', () => {
    beforeEach(() => {
      playable.state = {
        player: {},
      };
      playable.detachHandlersFromPlayer = jest.fn();
    });
    it('will attempt to detach any handlers from the player', () => {
      playable.componentWillUnmount();
      expect(playable.detachHandlersFromPlayer).toHaveBeenCalledWith(
        playable.state.player,
      );
    });
  });

  describe('attachHandlersToPlayer', () => {
    it('will attach handlers from props to the player', () => {
      const player = {};
      const props = { onFinish: () => true, onCancel: () => true };
      playable.attachHandlersToPlayer(player, props);
      expect(player.onfinish).toBe(props.onFinish);
      expect(player.oncancel).toBe(props.onCancel);
    });
  });

  describe('detachHandlersFromPlayer', () => {
    it('will remove handlers from the player', () => {
      const player = { onfinish: () => true, oncancel: () => true };
      playable.detachHandlersFromPlayer(player);
      expect(player.onfinish).toBe(null);
      expect(player.oncancel).toBe(null);
    });

    it('will not throw exception on undefined player', () => {
      playable.detachHandlersFromPlayer(undefined);
    });
  });

  describe('notifyHandlers', () => {
    describe('without a player', () => {
      beforeEach(() => {
        playable.state = {
          player: null,
        };
        playable.props = { onPlay: jest.fn() };
      });

      it('will do nothing', () => {
        playable.notifyHandlers({});
        expect(playable.props.onPlay).not.toHaveBeenCalled();
      });
    });
    describe('with a player', () => {
      beforeEach(() => {
        playable.state = {
          player: {},
        };
        playable.props = {
          onPlay: jest.fn(),
          onPause: jest.fn(),
          onReverse: jest.fn(),
        };
      });

      it('will call the appropriate handler in props', () => {
        playable.notifyHandlers('running');
        playable.notifyHandlers('paused');
        playable.notifyHandlers('reversed');
        expect(playable.props.onPlay).toHaveBeenCalledWith(
          playable.state.player,
        );
        expect(playable.props.onPause).toHaveBeenCalledWith(
          playable.state.player,
        );
        expect(playable.props.onReverse).toHaveBeenCalledWith(
          playable.state.player,
        );
      });
    });
  });

  describe('setPlayer', () => {
    describe('without an existing player', () => {
      beforeEach(() => {
        playable.state = {};
        playable.props = { someProps: 'test' };
        playable.setState = jest.fn();
        playable.attachHandlersToPlayer = jest.fn();
      });

      it('will cancel any animation on an existing player', () => {
        const newPlayer = {};
        playable.setPlayer(newPlayer, {});
        expect(playable.setState).toHaveBeenCalledWith({ player: newPlayer });
        expect(playable.attachHandlersToPlayer).toHaveBeenCalledWith(
          newPlayer,
          {},
        );
      });

      it('without props, it will use instance props', () => {
        const newPlayer = {};
        playable.setPlayer(newPlayer);
        expect(playable.setState).toHaveBeenCalledWith({ player: newPlayer });
        expect(playable.attachHandlersToPlayer).toHaveBeenCalledWith(
          newPlayer,
          playable.props,
        );
      });
    });

    describe('with an existing player', () => {
      let oldPlayer;
      beforeEach(() => {
        oldPlayer = {
          cancel: jest.fn(),
        };
        playable.state = {
          player: oldPlayer,
        };
        playable.setState = jest.fn();
        playable.attachHandlersToPlayer = jest.fn();
      });

      it('will cancel any animation on an existing player', () => {
        const newPlayer = {};
        playable.setPlayer(newPlayer, {});
        expect(oldPlayer.cancel).toHaveBeenCalled();
        expect(playable.setState).toHaveBeenCalledWith({ player: newPlayer });
        expect(playable.attachHandlersToPlayer).toHaveBeenCalledWith(
          newPlayer,
          {},
        );
      });
    });
  });
});
