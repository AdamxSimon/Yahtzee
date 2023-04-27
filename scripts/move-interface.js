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
    for (const child of this.element.children) {
      child.classList.toggle("delayed-confirmation");
      child.classList.toggle("disabled");
    }
  }

  initialize() {
    this.game.container.append(this.element);
    this.buttons.forEach((button) => {
      this.element.append(button.element);
    });
  }
}
