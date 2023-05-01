class ScoringRow {
  constructor(config) {
    this.game = config.game;

    this.container = config.container;

    this.element = document.createElement("tr");
    this.element.className = "scoring-row";

    this.name_container = document.createElement("td");
    this.name_container.className = "scoring-name";

    this.value_container = document.createElement("td");
    this.value_container.className = "scoring-value";

    this.name = config.name;
    this.value = "";

    this.isScored = false;

    this.evaluate = config.evaluate;

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.value_container.addEventListener("mouseenter", () => {
      if (this.game.current_mode === "score" && !this.isScored) {
        this.value_container.innerHTML = this.evaluate(
          this.game.dice_tray.getValues()
        );
      }
    });

    this.value_container.addEventListener("mouseleave", () => {
      if (!this.isScored) {
        this.value_container.innerHTML = "";
      }
    });

    this.value_container.addEventListener("click", () => {
      this.score();
    });
  }

  score() {
    this.isScored = true;
    this.value_container.innerHTML = this.evaluate(
      this.game.dice_tray.getValues()
    );
    dispatchEvent(this.game.events.score);
  }

  initialize() {
    this.container.append(this.element);
    this.element.append(this.name_container);
    this.element.append(this.value_container);

    this.name_container.innerHTML = this.name;
    this.value_container.innerHTML = this.value;
  }
}
