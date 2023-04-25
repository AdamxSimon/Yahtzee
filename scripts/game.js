class Game {
  constructor(config) {
    this.dice_container = config.dice_container;
    this.dice =
      config.dice ||
      [1, 2, 3, 4, 5].map(
        (value, index) =>
          new Die({ game: this, initial_value: value, id: index })
      );
  }

  start() {
    this.dice.forEach((die) => {
      die.render();
    });
  }
}
