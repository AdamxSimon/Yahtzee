class ScoringContainer {
  constructor(config) {
    this.element = document.createElement("table");
    this.element.id =
      config.type === "upper"
        ? "upper-scoring-container"
        : "lower-scoring-container";
  }

  mount(container) {
    container.append(this.element);
  }
}
