class MoveInterface {
  constructor(game) {
    this.game = game;

    this.element = document.createElement("div");
    this.element.id = "move-interface";

    this.buttons = [
      new Button({
        id: "Roll",
        callback: () => this.game.roll(),
      }),
      new Button({
        id: "Score",
        callback: () => console.log("Score"),
        should_delay_confirmation: true,
      }),
    ];
  }

  toggleButtonAccess() {
    this.buttons.forEach((button) => {
      button.toggleAccess();
    });
  }

  initialize() {
    this.game.container.append(this.element);
    this.buttons.forEach((button) => {
      button.initialize(this.element);
    });
  }
}
