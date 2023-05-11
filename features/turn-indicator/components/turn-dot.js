class TurnDot {
  constructor() {
    this.element = document.createElement("div");
    this.element.className = "turn-dot";
  }

  fill() {
    this.element.classList.add("filled");
  }

  initialize() {
    this.element.classList.remove("filled");
  }

  mount(container) {
    container.append(this.element);
  }
}
