class Button {
  constructor(config) {
    this.element = document.createElement("div");
    this.element.className = "button";

    this.text_element = document.createElement("div");
    this.text_element.className = "button-text";
    this.text_element.innerHTML = config.id;

    this.should_delay_confirmation = config.should_delay_confirmation || false;

    if (this.should_delay_confirmation) {
      this.element.classList.add("delayed-confirmation");
      this.element.onanimationend = () => {
        config.callback();
      };
    }

    this.element.onclick = () => {
      if (!this.should_delay_confirmation && !this.isDisabled) {
        config.callback();
      }
    };
  }

  disable() {
    this.isDisabled = true;

    if (this.should_delay_confirmation) {
      this.element.classList.remove("delayed-confirmation");
    }

    this.element.classList.add("disabled");
  }

  enable() {
    this.isDisabled = false;

    if (this.should_delay_confirmation) {
      this.element.classList.add("delayed-confirmation");
    }

    this.element.classList.remove("disabled");
  }

  initialize(container) {
    this.element.append(this.text_element);
    container.append(this.element);

    this.disable();
  }
}
