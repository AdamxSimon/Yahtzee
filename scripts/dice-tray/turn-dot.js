class TurnDot {
  constructor() {
    this.element = document.createElement("div");
    this.element.className = "turn-dot";
  }

  fill() {
    this.element.classList.add("completed");
  }

  reset() {
    this.element.classList.remove("completed");
  }

  initialize(container) {
    container.append(this.element);
  }
}
