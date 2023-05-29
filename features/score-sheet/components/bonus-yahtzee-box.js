class BonusYahtzeeBox {
  constructor(config) {
    this.element = document.createElement("div");
    this.element.className = "bonus-yahtzee-box";

    this.scoring_row = config.scoring_row;
    this.index = config.index;

    this.is_checked = false;

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.element.addEventListener("click", () => {
      if (
        this.scoring_row.game.current_mode === "scoring" &&
        this.scoring_row.current_bonus_index === this.index &&
        this.scoring_row.score_container.score_sheet.last_scored_row !==
          "Bonus Yahtzees" &&
        this.scoring_row.score_container.score_sheet.has_scored_yahtzee
      ) {
        this.check();
      }
    });

    this.element.addEventListener("mouseenter", () => {
      if (
        this.scoring_row.game.current_mode === "scoring" &&
        this.scoring_row.current_bonus_index === this.index &&
        this.scoring_row.score_container.score_sheet.last_scored_row !==
          "Bonus Yahtzees" &&
        this.scoring_row.score_container.score_sheet.has_scored_yahtzee
      ) {
        this.element.classList.add("checked");
      }
    });

    this.element.addEventListener("mouseleave", () => {
      if (
        this.scoring_row.game.current_mode === "scoring" &&
        this.scoring_row.current_bonus_index === this.index &&
        this.scoring_row.score_container.score_sheet.last_scored_row !==
          "Bonus Yahtzees" &&
        this.scoring_row.score_container.score_sheet.has_scored_yahtzee
      ) {
        this.element.classList.remove("checked");
      }
    });
  }

  check() {
    this.scoring_row.score();
    this.element.classList.add("checked");
  }

  uncheck() {
    this.element.classList.remove("checked");
  }

  mount(container) {
    container.append(this.element);
  }

  initialize() {
    if (this.is_checked) {
      this.uncheck();
    }
  }
}
