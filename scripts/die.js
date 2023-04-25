class Die {
  constructor(config) {
    this.value = config.initial_value || getRandomDieValue();

    this.element = document.createElement("div");
    this.element.className = "die";
    this.element.id = config.id;
    this.element.innerHTML = this.value;
  }

  roll() {
    this.value = getRandomDieValue();
    this.element.innerHTML = this.value;
  }
}
