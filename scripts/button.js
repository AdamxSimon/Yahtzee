class Button {
  constructor(config) {
    this.element = document.createElement("div");
    this.element.className = "button";
    this.element.innerHTML = config.content;
    this.element.onclick = config.callback;
  }
}
