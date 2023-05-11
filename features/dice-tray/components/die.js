class Die {
  constructor(config) {
    this.game = config.game;
    this.tray = config.tray;

    this.index = config.index;

    this.value = "";
    this._is_held = false;

    this.element = document.createElement("div");
    this.element.className = "die";

    this.element.innerHTML = this.value;

    this.element.style.animationDelay = `${this.index * 100}ms`;

    this.element.onclick = () => {
      if (!this.tray.isDisabled) {
        this.toggleHold();
      }
    };
  }

  get is_held() {
    return this._is_held;
  }

  /**
   * @param {boolean} value
   */
  set is_held(value) {
    this._is_held = value;

    if (this._is_held) {
      this.element.classList.add("held");
    } else {
      this.element.classList.remove("held");
    }
  }

  toggleHold() {
    this.is_held = !this._is_held;
  }

  async roll(index) {
    return new Promise((resolve) => {
      this.value = getRandomDieValue();
      this.element.innerHTML = "";

      this.element.style.animationDelay = `${index * 100}ms`;

      this.element.onanimationend = () => {
        this.element.classList.remove("rolling");
        this.element.onanimationend = undefined;
        this.element.innerHTML = this.value;
        resolve();
      };

      this.element.classList.add("rolling");
    });
  }

  lock() {
    this.element.style.animationDelay = `${this.index * 100}ms`;

    if (this._is_held) {
      this.is_held = false;
    }

    this.element.classList.add("locked");
  }

  mount(container) {
    container.append(this.element);
  }

  initialize() {
    this.element.classList.remove("locked");
    this.element.onanimationend = undefined;
    this.value = "";
    this.element.innerHTML = this.value;
  }
}
