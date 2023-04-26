class Button {
  constructor(config) {
    this.element = document.createElement("div");
    this.element.className = "button";

    this.should_delay_confirmation = config.should_delay_confirmation || false;

    if (this.should_delay_confirmation) {
      this.element.classList.add("delayed-confirmation");
      this.element.onanimationend = () => {
        if (!this.element.classList.contains("disabled")) {
          config.callback();
        }
      };
    }

    this.element.innerHTML = config.content;
    this.element.onclick = () => {
      if (
        !this.should_delay_confirmation &&
        !this.element.classList.contains("disabled")
      ) {
        config.callback();
      }
    };
  }
}
