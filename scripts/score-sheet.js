class ScoreSheet {
  constructor(game) {
    this.game = game;

    this.element = document.createElement("div");
    this.element.id = "score-sheet";

    this.upper_container = new ScoringContainer({
      type: "upper",
    });

    this.lower_container = new ScoringContainer({
      type: "lower",
    });

    this.scoring_rows = [
      new ScoringRow({
        name: "1s",
        container: this.upper_container.element,
        evaluate: (values) => this.scoreUpperRow(values, 1),
        game: this.game,
      }),
      new ScoringRow({
        name: "2s",
        container: this.upper_container.element,
        evaluate: (values) => this.scoreUpperRow(values, 2),
        game: this.game,
      }),
      new ScoringRow({
        name: "3s",
        container: this.upper_container.element,
        evaluate: (values) => this.scoreUpperRow(values, 3),
        game: this.game,
      }),
      new ScoringRow({
        name: "4s",
        container: this.upper_container.element,
        evaluate: (values) => this.scoreUpperRow(values, 4),
        game: this.game,
      }),
      new ScoringRow({
        name: "5s",
        container: this.upper_container.element,
        evaluate: (values) => this.scoreUpperRow(values, 5),
        game: this.game,
      }),
      new ScoringRow({
        name: "6s",
        container: this.upper_container.element,
        evaluate: (values) => this.scoreUpperRow(values, 6),
        game: this.game,
      }),
    ];
  }

  scoreUpperRow(values, number) {
    return values.reduce((total, current) => {
      if (current === number) {
        return total + current;
      } else {
        return total;
      }
    }, 0);
  }

  initialize(container) {
    container.append(this.element);
    this.upper_container.mount(this.element);
    this.scoring_rows.forEach((row) => {
      row.initialize();
    });
  }
}
