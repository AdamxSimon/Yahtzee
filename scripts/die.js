class Die {
  constructor(config) {
    this.tray = config.tray;

    this.value = "";
    this.isHeld = false;

    this.element = document.createElement("div");
    this.element.className = "die";
    this.element.innerHTML = this.value;

    this.element.style.animationDelay = `${config.index * 100}ms`;

    this.element.onclick = () => this.toggleHold();
  }

  toggleHold() {
    if (
      this.tray.should_allow_interaction &&
      !this.tray.isRolling &&
      this.value
    ) {
      this.isHeld = !this.isHeld;
      this.element.classList.toggle("held");
    }
  }

  async roll() {
    return new Promise((resolve) => {
      this.value = getRandomDieValue();
      this.element.innerHTML = "";

      this.element.onanimationend = () => {
        this.element.classList.remove("rolling");
        this.element.onanimationend = undefined;
        this.render();
        resolve();
      };

      this.element.classList.add("rolling");
    });
  }

  confirm() {
    this.element.classList.remove("held");
    this.element.classList.add("confirmed");
  }

  reset() {
    this.isHeld = false;
    this.element.classList.remove("confirmed");
    this.element.onanimationend = undefined;
    this.value = "";
    this.element.innerHTML = this.value;
  }

  render() {
    this.element.innerHTML = this.value;
  }
}
