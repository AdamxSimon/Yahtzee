class Game {
  constructor(config) {
    this.root = config.root;

    this.move_container = document.createElement("div");
    this.move_container.id = "move-container";

    this.score_container = document.createElement("div");
    this.score_container.id = "score-container";

    this.max_turns = 3;
    this.max_dice = 5;

    this.rolls_taken = 0;
    this.isRolling = false;

    this.header = document.createElement("div");
    this.header.id = "header";
    this.header.innerHTML = "YAHTZEE!";

    this.turn_indicator = new TurnIndicator(this.max_turns);
    this.dice_tray = new DiceTray(this.max_dice);
    this.move_interface = new MoveInterface(this);

    this.score_sheet = new ScoreSheet(this);

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
      this.enterMode("move");
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

  initialize() {
    this.root.append(this.header);
    this.root.append(this.move_container);
    this.root.append(this.score_container);

    this.turn_indicator.initialize(this.move_container);
    this.dice_tray.initialize(this.move_container);
    this.move_interface.initialize(this.move_container);

    this.score_sheet.mount(this.score_container);
    this.score_sheet.initialize();

    this.enterMode("move");
  }
}
