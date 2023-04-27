class TurnIndicator {
  constructor(max_turns) {
    this.element = document.createElement("div");
    this.element.id = "turn-indicator";

    this.max_turns = max_turns;

    this.dots = new Array(this.max_turns)
      .fill("turn-dot")
      .map((value, index) => {
        const element = document.createElement("div");
        element.className = value;
        element.id = index + 1;
        return element;
      });
  }

  advance(turn) {
    this.dots[turn - 2].classList.add("completed");
  }

  reset() {
    this.dots.forEach((dot) => {
      dot.classList.remove("completed");
    });
  }

  initialize(container) {
    container.append(this.element);
    this.dots.forEach((dot) => {
      this.element.append(dot);
    });
  }
}
