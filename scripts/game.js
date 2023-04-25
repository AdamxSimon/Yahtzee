class Game {
  constructor(config) {
    this.dice_container = config.dice_container;
    this.move_container = config.move_container;

    this.dice =
      config.dice ||
      [1, 2, 3, 4, 5].map(
        (value, index) => new Die({ initial_value: value, id: index })
      );
  }

  rollDice() {
    for (const die in this.dice) {
      this.dice[die].roll();
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
