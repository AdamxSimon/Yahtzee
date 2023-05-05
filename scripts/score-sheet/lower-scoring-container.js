class LowerScoringContainer {
  constructor(config) {
    this.game = config.game;
    this.score_sheet = config.score_sheet;

    this.element = document.createElement("table");
    this.element.id = "lower-scoring-container";

    this.scoring_rows = [
      new ScoringRow({
        name: "3 of a Kind",
        evaluate: (values) => this.evaluateRow(values, "3 of a Kind"),
        game: this.game,
        score_container: this,
      }),
      new ScoringRow({
        name: "4 of a Kind",
        evaluate: (values) => this.evaluateRow(values, "4 of a Kind"),
        game: this.game,
        score_container: this,
      }),
      new ScoringRow({
        name: "Full House",
        evaluate: (values) => this.evaluateRow(values, "Full House"),
        game: this.game,
        score_container: this,
      }),
      new ScoringRow({
        name: "Small Straight",
        evaluate: (values) => this.evaluateRow(values, "Small Straight"),
        game: this.game,
        score_container: this,
      }),
      new ScoringRow({
        name: "Large Straight",
        evaluate: (values) => this.evaluateRow(values, "Large Straight"),
        game: this.game,
        score_container: this,
      }),
      new ScoringRow({
        name: "Yahtzee",
        evaluate: (values) => this.evaluateRow(values, "Yahtzee"),
        game: this.game,
        score_container: this,
      }),
      new ScoringRow({
        name: "Bonus Yahtzees",
        value: "0",
        evaluate: (values, id) => this.evaluateRow(values, "Bonus Yahtzee"),
        game: this.game,
        score_container: this,
      }),
      new ScoringRow({
        name: "Chance",
        evaluate: (values, id) => this.evaluateRow(values, "Chance"),
        game: this.game,
        score_container: this,
      }),
    ];

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

  evaluateRow(values, row) {
    const counts = {};
    let is_eligible;

    if (row === "3 of a Kind") {
      const sum = values.reduce((total, current) => {
        if (!counts.hasOwnProperty(current)) {
          counts[current] = 1;
        } else {
          counts[current] += 1;
          if (counts[current] === 3) {
            is_eligible = true;
          }
        }
        return total + current;
      }, 0);

      return is_eligible ? sum : 0;
    }

    if (row === "4 of a Kind") {
      const sum = values.reduce((total, current) => {
        if (!counts.hasOwnProperty(current)) {
          counts[current] = 1;
        } else {
          counts[current] += 1;
          if (counts[current] === 4) {
            is_eligible = true;
          }
        }
        return total + current;
      }, 0);

      return is_eligible ? sum : 0;
    }

    if (row === "Full House") {
      for (const value of values) {
        if (!counts.hasOwnProperty(value)) {
          counts[value] = 1;
        } else {
          counts[value] += 1;
          if (counts[value] === 4) {
            return 0;
          }
        }
      }

      is_eligible = Object.keys(counts).length === 2;

      return is_eligible ? 25 : 0;
    }

    if (row === "Small Straight") {
      const range = new Array(2).fill();
      for (const value of values) {
        if (!counts.hasOwnProperty(value)) {
          counts[value] = 1;
        } else {
          counts[value] += 1;
          if (counts[value] === 3) {
            return 0;
          }
        }

        if (!range[0] || value < range[0]) {
          range[0] = value;
        }

        if (!range[1] || value > range[1]) {
          range[1] = value;
        }
      }

      is_eligible =
        range[1] - range[0] === 3 || Object.keys(counts).length === 5;

      return is_eligible ? 30 : 0;
    }

    if (row === "Large Straight") {
      for (const value of values) {
        if (!counts.hasOwnProperty(value)) {
          counts[value] = 1;
        } else {
          counts[value] += 1;
        }
      }

      is_eligible = Object.keys(counts).length === 5;

      return is_eligible ? 40 : 0;
    }

    if (row === "Yahtzee") {
      for (const value of values) {
        if (!counts.hasOwnProperty(value)) {
          counts[value] = 1;
        } else {
          counts[value] += 1;
        }
      }

      is_eligible = Object.keys(counts).length === 1;

      return is_eligible ? 50 : 0;
    }

    if (row === "Bonus Yahtzee") {
      for (const value of values) {
        if (!counts.hasOwnProperty(value)) {
          counts[value] = 1;
        } else {
          counts[value] += 1;
        }
      }

      is_eligible =
        Object.keys(counts).length === 1 && this.score_sheet.has_scored_yahtzee;

      return is_eligible ? 100 : 0;
    }

    if (row === "Chance") {
      return values.reduce((total, current) => {
        if (!counts.hasOwnProperty(current)) {
          counts[current] = 1;
        } else {
          counts[current] += 1;
          if (counts[current] === 4) {
            is_eligible = true;
          }
        }
        return total + current;
      }, 0);
    }
  }

  updateTotal(amount) {
    this.total += amount;
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
