class ScoringRow {
  constructor(config) {
    this.game = config.game;
    this.score_container = config.score_container;

    this.is_calculated = !!config.is_calculated;

    this.element = document.createElement("tr");
    this.element.className = "scoring-row";

    this.name_container = document.createElement("td");
    this.name_container.className = "scoring-name";

    this.name = config.name;
    this.initial_value = config.initial_value || "";

    if (this.name === "Bonus Yahtzees") {
      this.current_bonus_index = 0;
      this.bonus_yahtzee_boxes = new Array(6).fill().map(
        (_, index) =>
          new BonusYahtzeeBox({
            scoring_row: this,
            index,
          })
      );
    }

    this.value_container = document.createElement("td");
    this.value_container.className = "scoring-value";

    if (this.name !== "Bonus Yahtzees") {
      this.value_container.style.cursor = "pointer";
    }

    this.isScored = false;

    this.evaluate = config.evaluate;

    if (!this.is_calculated && this.name !== "Bonus Yahtzees") {
      this.#addEventListeners();
    }

    this.events = { score: new Event("score") };
  }

  #addEventListeners() {
    this.value_container.addEventListener("mouseenter", () => {
      if (this.game.current_mode === "scoring" && !this.isScored) {
        this.value_container.innerHTML =
          +this.value + this.evaluate(this.game.dice_tray.getValues());
      }
    });

    this.value_container.addEventListener("mouseleave", () => {
      if (this.game.current_mode === "scoring" && !this.isScored) {
        this.value_container.innerHTML = this.value;
      }
    });

    this.value_container.addEventListener("click", () => {
      if (this.game.current_mode === "scoring" && !this.isScored) {
        if (
          this.name === "Bonus Yahtzees" &&
          (!this.score_container.score_sheet.has_scored_yahtzee ||
            !this.evaluate(this.game.dice_tray.getValues()))
        ) {
          return;
        }

        this.score();
      }
    });
  }

  score() {
    const amount = this.evaluate(this.game.dice_tray.getValues());

    if (this.name !== "Bonus Yahtzees") {
      this.updateValue(amount);
    } else {
      this.score_container.updateBonusYahtzees();
      this.current_bonus_index++;
    }

    this.score_container.updateTotal(amount);
    this.score_container.score_sheet.total_row.updateValue(amount);

    if (this.name === "Yahtzee" && amount) {
      this.score_container.score_sheet.has_scored_yahtzee = true;
    }

    if (this.name !== "Bonus Yahtzees") {
      this.isScored = true;
      dispatchEvent(this.events.score);
    }

    this.score_container.score_sheet.last_scored_row = this.name;
  }

  updateValue(amount) {
    if (this.name === "Bonus Total") {
      this.value = +this.value + amount;
    } else {
      this.value = amount;
    }
    this.value_container.innerHTML = this.value;
  }

  mount(container) {
    container.append(this.element);
    this.element.append(this.name_container);
    this.element.append(this.value_container);
    if (this.name === "Bonus Yahtzees") {
      this.bonus_yahtzee_boxes.forEach((box) => {
        box.mount(this.value_container);
      });
    }
  }

  initialize() {
    this.value = this.initial_value;
    this.name_container.innerHTML = this.name;
    if (this.name !== "Bonus Yahtzees") {
      this.value_container.innerHTML = this.value;
    } else {
      this.bonus_yahtzee_boxes.forEach((box) => {
        box.initialize();
      });
    }
  }
}
