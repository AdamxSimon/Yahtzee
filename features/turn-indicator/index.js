class TurnIndicator {
  constructor(config) {
    this.element = document.createElement("div");
    this.element.id = "turn-indicator";

    this.turn_count = config.turn_count;
    this.turn_dots = new Array(this.turn_count).fill().map(() => new TurnDot());
  }

  advance(turn) {
    this.turn_dots[turn - 1].fill();
  }

  initialize() {
    this.turn_dots.forEach((dot) => {
      dot.initialize();
    });
  }

  mount(container) {
    container.append(this.element);
    this.turn_dots.forEach((dot) => {
      dot.mount(this.element);
    });
  }
}
