class ScoreSheet {
  constructor(game) {
    this.game = game;

    this.element = document.createElement("div");
    this.element.id = "score-sheet";

    this.upper_container = new UpperScoringContainer({
      game: this.game,
      score_sheet: this,
    });

    this.lower_container = new LowerScoringContainer({
      game: this.game,
      score_sheet: this,
    });

    this.score = 0;
  }

  initialize(container) {
    container.append(this.element);
    this.upper_container.mount(this.element);
    this.lower_container.mount(this.element);
  }
}
