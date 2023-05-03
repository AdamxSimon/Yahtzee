class ScoringRow {
  constructor(config) {
    this.game = config.game;
    this.score_container = config.score_container;

    this.is_calculated = !!config.is_calculated;

    this.element = document.createElement("tr");
    this.element.className = "scoring-row";

    this.name_container = document.createElement("td");
    this.name_container.className = "scoring-name";

    this.value_container = document.createElement("td");
    this.value_container.className = "scoring-value";

    this.name = config.name;
    this.value = config.value || "";

    this.evaluate = config.evaluate;

    this.isScored = false;

    if (!this.is_calculated) {
      this.#addEventListeners();
    }
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
      if (this.game.current_mode === "score" && !this.isScored) {
        this.score();
      }
    });
  }

  score() {
    this.isScored = true;
    const amount = this.evaluate(this.game.dice_tray.getValues());
    this.updateValue(amount);
    this.score_container.updateTotal(amount);
    dispatchEvent(this.game.events.score);
  }

  updateValue(amount) {
    this.value = amount;
    this.value_container.innerHTML = amount;
  }

  initialize(container) {
    container.append(this.element);
    this.element.append(this.name_container);
    this.element.append(this.value_container);

    this.name_container.innerHTML = this.name;
    this.value_container.innerHTML = this.value;
  }
}
