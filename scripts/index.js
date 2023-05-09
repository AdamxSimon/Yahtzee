class Game {
  constructor() {
    this.max_turns = 3;
    this.max_dice = 5;

    this.scoring_rounds_elapsed = 0;

    this.rolls_taken = 0;
    this.isRolling = false;

    this.header_element = document.createElement("i");
    this.header_element.id = "header";
    this.header_element.textContent = "YAHTZEE!";

    this.rolling_interface_element = document.createElement("div");
    this.rolling_interface_element.id = "rolling-interface";

    this.turn_indicator = new TurnIndicator(this.max_turns);
    this.dice_tray = new DiceTray(this.max_dice);

    this.score_sheet = new ScoreSheet(this);

    this.move_interface = new MoveInterface(this);

    this.events = { roll: new Event("roll"), score: new Event("score") };

    this.#addEventListeners();
  }

  #addEventListeners() {
    addEventListener("roll", () => {
      if (this.rolls_taken === 3) {
        this.enterMode("score");
      } else {
        this.move_interface.enableAllButtons();
      }
    });
    addEventListener("score", () => {
      this.scoring_rounds_elapsed++;

      if (this.scoring_rounds_elapsed < 13) {
        this.enterMode("move");
      } else {
        this.finalize();
      }
    });
  }

  enterMode(mode) {
    this.current_mode = mode;
    switch (mode) {
      case "move":
        this.resetRolls();
        this.dice_tray.should_allow_interaction = true;
        this.move_interface.enableButton("roll");
        break;
      case "score":
        this.dice_tray.confirmAllDice();
        this.dice_tray.should_allow_interaction = false;
        this.move_interface.disableAllButtons();
        break;
    }
  }

  resetRolls() {
    this.rolls_taken = 0;
    this.turn_indicator.reset();
    this.dice_tray.resetAllDice();
  }

  async roll() {
    this.move_interface.disableAllButtons();
    this.rolls_taken++;
    this.turn_indicator.advance(this.rolls_taken + 1);
    await this.dice_tray.roll();
    dispatchEvent(this.events.roll);
  }

  mount(container) {
    container.append(this.header_element);
    container.append(this.rolling_interface_element);

    this.turn_indicator.initialize(this.rolling_interface_element);
    this.dice_tray.initialize(this.rolling_interface_element);

    this.score_sheet.mount(container);
    this.move_interface.initialize(container);
  }

  initialize() {
    this.enterMode("move");
  }

  finalize() {}
}
