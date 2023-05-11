class Game {
  constructor() {
    this.current_mode;

    this.max_rolls_per_round = 3;
    this.rolls_taken_this_round = 0;

    this.max_dice = 5;

    this.scoring_rounds_elapsed = 0;
    this.max_scoring_rounds = 13;

    this.header_element = document.createElement("i");
    this.header_element.id = "header";
    this.header_element.textContent = "YAHTZEE!";

    this.rolling_interface_element = document.createElement("div");
    this.rolling_interface_element.id = "rolling-interface";

    this.turn_indicator = new TurnIndicator({
      turn_count: this.max_rolls_per_round,
    });

    this.dice_tray = new DiceTray({ game: this, dice_count: this.max_dice });

    this.score_sheet = new ScoreSheet(this);

    this.move_interface = new MoveInterface(this);

    this.events = { score: new Event("score") };

    this.#addEventListeners();
  }

  #addEventListeners() {
    addEventListener("rollstart", () => {
      this.rolls_taken_this_round++;
      this.turn_indicator.advance(this.rolls_taken_this_round);
      this.move_interface.disableAllButtons();
    });

    addEventListener("rollend", () => {
      if (this.rolls_taken_this_round === this.max_rolls_per_round) {
        this.enterMode("scoring");
      } else {
        this.move_interface.enableAllButtons();
      }
    });

    addEventListener("score", () => {
      this.scoring_rounds_elapsed++;

      if (this.scoring_rounds_elapsed < this.max_scoring_rounds) {
        this.enterMode("rolling");
      } else {
        this.finalize();
      }
    });
  }

  enterMode(mode) {
    this.current_mode = mode;
    switch (mode) {
      case "rolling":
        this.resetRolls();
        this.move_interface.enableButton("roll");
        break;
      case "scoring":
        this.dice_tray.lockAllDice();
        this.move_interface.disableAllButtons();
        break;
    }
  }

  resetRolls() {
    this.rolls_taken_this_round = 0;
    this.turn_indicator.initialize();
    this.dice_tray.initialize();
  }

  mount(container) {
    container.append(this.header_element);
    container.append(this.rolling_interface_element);

    this.turn_indicator.mount(this.rolling_interface_element);
    this.dice_tray.mount(this.rolling_interface_element);

    this.score_sheet.mount(container);
    this.move_interface.initialize(container);
  }

  initialize() {
    this.dice_tray.initialize();
    this.enterMode("rolling");
  }

  finalize() {}
}
