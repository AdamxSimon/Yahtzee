class TurnIndicator {
  constructor(max_turns) {
    this.element = document.createElement("div");
    this.element.id = "turn-indicator";

    this.max_turns = max_turns;

    this.dots = new Array(this.max_turns).fill().map(() => new TurnDot());
  }

  advance(turn) {
    this.dots[turn - 2].fill();
  }

  reset() {
    this.dots.forEach((dot) => {
      dot.reset();
    });
  }

  initialize(container) {
    container.append(this.element);
    this.dots.forEach((dot) => {
      dot.initialize(this.element);
    });
  }
}
