class Die {
  constructor(config) {
    this.value = config.initial_value || getRandomDieValue();

    this.element = document.createElement("div");
    this.element.className = "die";
    this.element.id = config.id;
    this.element.innerHTML = this.value;

    this.element.style.animationDelay = `${this.element.id * 100}ms`;
    this.element.onanimationend = () => {
      this.element.classList.remove("rolling");
      this.render();
    };
  }

  roll() {
    this.value = getRandomDieValue();
    this.element.innerHTML = "";
    this.element.classList.add("rolling");
  }

  render() {
    this.element.innerHTML = this.value;
  }
}
