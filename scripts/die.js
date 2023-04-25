class Die {
  constructor(config) {
    this.game = config.game;
    this.value = config.initial_value || getRandomDieValue();

    this.wrapper = document.createElement("div");
    this.wrapper.className = "die";
    this.wrapper.id = config.id;
    this.wrapper.innerHTML = this.value;
  }

  render() {
    this.game.dice_container.append(this.wrapper);
  }
}
