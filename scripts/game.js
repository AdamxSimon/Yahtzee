class Game {
  constructor(config) {
    this.container = config.container;

    this.max_turns = 3;
    this.max_dice = 5;

    this.current_mode = "move";
    this.current_turn = 1;
    this.isRolling = false;

    this.turn_indicator = new TurnIndicator(this.max_turns);
    this.dice_tray = new DiceTray(this.max_dice);
    this.move_interface = new MoveInterface(this);
  }

  enterMode(mode) {
    this.current_mode = mode;
  }

  advanceTurn() {
    this.current_turn++;
    this.turn_indicator.advance(this.current_turn);
  }

  resetTurns() {
    this.current_turn = 1;
    this.turn_indicator.reset();
  }

  async roll() {
    this.move_interface.toggleButtonAccess();
    this.advanceTurn();
    await this.dice_tray.roll();

    if (this.current_turn > 3) {
      this.enterMode("score");
    } else {
      this.move_interface.toggleButtonAccess();
    }
  }

  initialize() {
    this.turn_indicator.initialize(this.container);
    this.dice_tray.initialize(this.container);
    this.move_interface.initialize();
  }
}
