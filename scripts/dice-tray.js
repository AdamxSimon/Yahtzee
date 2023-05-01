class DiceTray {
  constructor(max_dice) {
    this.element = document.createElement("div");
    this.element.id = "dice-tray";

    this.should_allow_interaction = true;

    this.isRolling = false;

    this.dice = new Array(max_dice)
      .fill()
      .map((value, index) => new Die({ tray: this, index }));
  }

  async roll() {
    if (!this.isRolling) {
      this.isRolling = true;

      const dice_to_roll = this.dice.filter((die) => !die.isHeld);

      await Promise.all(dice_to_roll.map((die) => die.roll()));

      this.isRolling = false;
    }
  }

  getValues() {
    return this.dice.map((die) => die.value);
  }

  confirmAllDice() {
    this.dice.forEach((die) => {
      die.confirm();
    });
  }

  resetAllDice() {
    this.dice.forEach((die) => {
      die.reset();
    });
  }

  initialize(container) {
    container.append(this.element);
    this.dice.forEach((die) => {
      this.element.append(die.element);
    });
  }
}
