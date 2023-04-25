class Game {
  constructor(config) {
    this.dice_container = config.dice_container;
    this.move_container = config.move_container;

    this.isRolling = false;

    this.dice =
      config.dice ||
      [1, 2, 3, 4, 5].map(
        (value, index) =>
          new Die({ game: this, initial_value: value, id: index })
      );
  }

  async rollDice() {
    if (!this.isRolling) {
      this.isRolling = true;

      const dice_to_roll = this.dice.filter((die) => !die.isHeld);

      await Promise.all(dice_to_roll.map((die, index) => die.roll(index)));

      this.isRolling = false;
    }
  }

  start() {
    this.dice.forEach((die) => {
      this.dice_container.append(die.element);
    });

    this.move_container.append(
      new Button({ content: "Roll", callback: () => this.rollDice() }).element
    );
  }
}
