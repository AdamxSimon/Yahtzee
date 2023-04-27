class Game {
  constructor(config) {
    this.container = config.container;

    this.max_turns = 3;

    this.turn_indicator = new TurnIndicator(this.max_turns);
    this.dice_container = config.dice_container;
    this.move_container = config.move_container;

    this.mode = "move";

    this.current_turn = 1;

    this.isRolling = false;

    this.dice =
      config.dice ||
      [1, 2, 3, 4, 5].map(
        (value, index) =>
          new Die({ game: this, initial_value: value, id: index })
      );
  }

  enterMode(mode) {
    this.mode = mode;
    switch (mode) {
      case "score":
        break;
    }
  }

  advanceTurn() {
    this.current_turn++;
    this.turn_indicator.advance(this.current_turn);
  }

  resetTurns() {
    this.current_turn = 1;
    this.turn_indicator.reset();
  }

  toggleMovesAccess() {
    for (const child of this.move_container.children) {
      child.classList.toggle("delayed-confirmation");
      child.classList.toggle("disabled");
    }
  }

  async rollDice() {
    if (!this.isRolling) {
      this.toggleMovesAccess();
      this.advanceTurn();

      this.isRolling = true;

      const dice_to_roll = this.dice.filter((die) => !die.isHeld);

      await Promise.all(dice_to_roll.map((die, index) => die.roll(index)));

      this.isRolling = false;

      if (this.current_turn > 3) {
        this.enterMode("score");
      } else {
        this.toggleMovesAccess();
      }
    }
  }

  initialize() {
    this.turn_indicator.initialize(this.container);

    this.dice.forEach((die) => {
      this.dice_container.append(die.element);
    });

    this.move_container.append(
      new Button({ content: "Roll", callback: () => this.rollDice() }).element
    );
    this.move_container.append(
      new Button({
        content: "Score",
        callback: () => console.log("Score"),
        should_delay_confirmation: true,
      }).element
    );
  }
}
