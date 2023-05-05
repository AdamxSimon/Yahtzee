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
        callback: () => this.game.enterMode("score"),
        should_delay_confirmation: true,
      }),
    ];
  }

  disableButton(button) {
    switch (button) {
      case "roll":
        this.buttons[0].disable();
        break;
      case "score":
        this.buttons[1].disable();
        break;
    }
  }

  enableButton(button) {
    switch (button) {
      case "roll":
        this.buttons[0].enable();
        break;
      case "score":
        this.buttons[1].enable();
        break;
    }
  }

  disableAllButtons() {
    this.buttons.forEach((button) => {
      button.disable();
    });
  }

  enableAllButtons() {
    this.buttons.forEach((button) => {
      button.enable();
    });
  }

  initialize(container) {
    container.append(this.element);
    this.buttons.forEach((button) => {
      button.initialize(this.element);
    });
  }
}
