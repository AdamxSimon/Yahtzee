class DiceTray {
  constructor(max_dice) {
    this.element = document.createElement("div");
    this.element.id = "dice-tray";

    this.isRolling = false;

    this.dice = new Array(max_dice).fill().map(() => new Die(this));
  }

  async roll() {
    if (!this.isRolling) {
      this.isRolling = true;

      const dice_to_roll = this.dice.filter((die) => !die.isHeld);

      await Promise.all(dice_to_roll.map((die, index) => die.roll(index)));

      this.isRolling = false;
    }
  }

  initialize(container) {
    container.append(this.element);
    this.dice.forEach((die) => {
      this.element.append(die.element);
    });
  }
}
