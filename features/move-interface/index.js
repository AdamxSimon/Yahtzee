class MoveInterface {
  constructor(config) {
    this.game = config.game;

    this.buttons = [
      new Button({
        id: "roll",
        text: "Roll",
        callback: () => this.game.dice_tray.roll(),
      }),
      new Button({
        id: "score",
        text: "Score",
        callback: () => this.game.enterMode("scoring"),
        should_delay_confirmation: true,
      }),
    ];

    this.element = document.createElement("div");
    this.element.id = "move-interface";
  }

  disableButton(id) {
    for (const button of this.buttons) {
      if (button.id === id) {
        button.disable();
      }
    }
  }

  enableButton(id) {
    for (const button of this.buttons) {
      if (button.id === id) {
        button.enable();
      }
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

  mount(container) {
    container.append(this.element);
    this.buttons.forEach((button) => {
      button.mount(this.element);
    });
  }

  initialize() {
    this.buttons.forEach((button) => {
      button.initialize();
    });
  }
}
