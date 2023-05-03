class UpperScoringContainer {
  constructor(config) {
    this.game = config.game;
    this.score_sheet = config.score_sheet;

    this.element = document.createElement("table");
    this.element.id = "upper-scoring-container";

    this.scoring_rows = new Array(6).fill().map((value, index) => {
      return new ScoringRow({
        name: `${index + 1}s`,
        evaluate: (values) => {
          return this.evaluateRow(values, index + 1);
        },
        game: this.game,
        score_container: this,
      });
    });

    this.total = 0;
    this.total_row = new ScoringRow({
      name: "Total",
      value: "0",
      evaluate: (amount) => {
        this.updateTotal(amount);
      },
      is_calculated: true,
      game: this.game,
      score_container: this,
    });
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

  updateTotal(amount) {
    if (this.total + amount >= 63) {
      this.total += amount + 35;
    } else {
      this.total += amount;
    }
    this.total_row.updateValue(this.total);
  }

  mount(container) {
    container.append(this.element);
    this.scoring_rows.forEach((row) => {
      row.initialize(this.element);
    });
    this.total_row.initialize(this.element);
  }
}
