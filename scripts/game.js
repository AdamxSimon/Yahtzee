class Game {
  constructor(config) {
    this.turn_indicator = config.turn_indicator;
    this.dice_container = config.dice_container;
    this.move_container = config.move_container;

    this.turn_dots = [1, 2, 3].map((id) => {
      const element = document.createElement("div");
      element.className = "turn-dot";
      element.id = id;
      return element;
    });

    this.current_turn = 1;

    this.isRolling = false;

    this.dice =
      config.dice ||
      [1, 2, 3, 4, 5].map(
        (value, index) =>
          new Die({ game: this, initial_value: value, id: index })
      );
  }

  advanceTurn() {
    if (this.current_turn <= 3) {
      this.current_turn++;
      this.turn_dots[this.current_turn - 2].classList.add("completed");
    } else {
      this.resetTurns();
    }
  }

  resetTurns() {
    this.current_turn = 1;
    this.turn_dots.forEach((dot) => {
      dot.classList.remove("completed");
    });
  }

  async rollDice() {
    if (!this.isRolling) {
      this.advanceTurn();

      this.isRolling = true;

      const dice_to_roll = this.dice.filter((die) => !die.isHeld);

      await Promise.all(dice_to_roll.map((die, index) => die.roll(index)));

      this.isRolling = false;
    }
  }

  start() {
    this.turn_dots.forEach((dot) => {
      this.turn_indicator.append(dot);
    });

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
