class Die {
  constructor(tray) {
    this.tray = tray;

    this.value = "";
    this.isHeld = false;

    this.element = document.createElement("div");
    this.element.className = "die";
    this.element.innerHTML = this.value;

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

  async roll(delay) {
    return new Promise((resolve) => {
      this.value = getRandomDieValue();
      this.element.innerHTML = "";
      this.element.style.animationDelay = `${delay * 100}ms`;

      this.element.onanimationend = () => {
        this.element.classList.remove("rolling");
        this.element.onanimationend = undefined;
        this.render();
        resolve();
      };

      this.element.classList.add("rolling");
    });
  }

  render() {
    this.element.innerHTML = this.value;
  }
}
