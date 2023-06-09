class UpperScoringContainer {
  constructor(config) {
    this.game = config.game;
    this.score_sheet = config.score_sheet;

    this.scoring_rows = new Array(6).fill().map((_, index) => {
      return new ScoringRow({
        name: `${index + 1}s`,
        evaluate: (values) => {
          return this.evaluateRow(values, index + 1);
        },
        game: this.game,
        score_container: this,
      });
    });

    this.bonus = 0;
    this.bonus_row = new ScoringRow({
      name: "Bonus",
      initial_value: "0",
      is_calculated: true,
      game: this.game,
      score_container: this,
    });

    this.total = 0;
    this.total_row = new ScoringRow({
      name: "Upper Total",
      initial_value: "0",
      is_calculated: true,
      game: this.game,
      score_container: this,
    });

    this.element = document.createElement("table");
    this.element.id = "upper-scoring-container";
  }

  evaluateRow(values, number) {
    return values.reduce((total, current) => {
      if (current === number) {
        return total + current;
      } else {
        return total;
      }
    }, 0);
  }

  scoreBonus() {
    this.bonus = 35;
    this.bonus_row.updateValue(this.bonus);
  }

  updateTotal(amount) {
    if (this.total + amount >= 63) {
      this.scoreBonus();
      this.total += amount + this.bonus;
    } else {
      this.total += amount;
    }
    this.total_row.updateValue(this.total);
  }

  mount(container) {
    container.append(this.element);
    this.scoring_rows.forEach((row) => {
      row.mount(this.element);
    });
    this.bonus_row.mount(this.element);
    this.total_row.mount(this.element);
  }

  initialize() {
    this.scoring_rows.forEach((row) => {
      row.initialize(this.element);
    });
    this.bonus_row.initialize();
    this.total_row.initialize();
  }
}
