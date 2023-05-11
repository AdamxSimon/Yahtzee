class DiceTray {
  constructor(config) {
    this.game = config.game;

    this.is_disabled = true;

    this.dice_count = config.dice_count;
    this.dice = new Array(this.dice_count)
      .fill()
      .map((_, index) => new Die({ game: this.game, tray: this, index }));

    this.events = {
      rollstart: new Event("rollstart"),
      rollend: new Event("rollend"),
    };

    this.element = document.createElement("div");
    this.element.id = "dice-tray";
  }

  async roll() {
    this.disable();

    dispatchEvent(this.events.rollstart);

    const dice_to_roll = this.dice.filter((die) => !die.is_held);
    await Promise.all(dice_to_roll.map((die, index) => die.roll(index)));

    dispatchEvent(this.events.rollend);

    this.enable();
  }

  getValues() {
    return this.dice.map((die) => die.value);
  }

  lockAllDice() {
    this.disable();
    this.dice.forEach((die) => {
      die.lock();
    });
  }

  disable() {
    this.is_disabled = true;
  }

  enable() {
    this.is_disabled = false;
  }

  mount(container) {
    container.append(this.element);
    this.dice.forEach((die) => {
      die.mount(this.element);
    });
  }

  initialize() {
    this.disable();
    this.dice.forEach((die) => {
      die.initialize();
    });
  }
}
