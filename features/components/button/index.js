class Button {
  constructor(config) {
    this.id = config.id;

    this.callback = config.callback;

    this._is_disabled;
    this.should_delay_confirmation = !!config.should_delay_confirmation;

    this.element = document.createElement("div");
    this.element.className = "button";

    this.text_element = document.createElement("div");
    this.text_element.className = "button-text";
    this.text_element.textContent = config.text;

    if (this.should_delay_confirmation) {
      this.element.classList.add("delayed-confirmation");
      this.element.onanimationend = () => {
        this.callback();
      };
    }

    this.element.onclick = () => {
      if (!this.should_delay_confirmation && !this._is_disabled) {
        this.callback();
      }
    };
  }

  /**
   * @param {boolean} value
   */
  set is_disabled(value) {
    this._is_disabled = value;

    if (this._is_disabled) {
      this.element.classList.add("disabled");
      if (this.should_delay_confirmation) {
        this.element.classList.remove("delayed-confirmation");
      }
    } else {
      this.element.classList.remove("disabled");
      if (this.should_delay_confirmation) {
        this.element.classList.add("delayed-confirmation");
      }
    }
  }

  disable() {
    this.is_disabled = true;
  }

  enable() {
    this.is_disabled = false;
  }

  mount(container) {
    container.append(this.element);
    this.element.append(this.text_element);
  }

  initialize() {
    this.disable();
  }
}
