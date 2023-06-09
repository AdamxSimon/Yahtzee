class ScoreSheet {
  constructor(config) {
    this.game = config.game;

    this.upper_container = new UpperScoringContainer({
      game: this.game,
      score_sheet: this,
    });

    this.lower_container = new LowerScoringContainer({
      game: this.game,
      score_sheet: this,
    });

    this._selected_section = "upper";

    this.has_scored_yahtzee = false;

    this.total_row = new ScoringRow({
      name: "Grand Total",
      initial_value: "0",
      is_calculated: true,
      game: this.game,
    });

    this.tab_container = document.createElement("div");
    this.tab_container.id = "tab-container";

    this.upper_section_tab = document.createElement("div");
    this.upper_section_tab.className = "tab selected";
    this.upper_section_tab.textContent = "Upper";
    this.upper_section_tab.onclick = () => {
      if (this._selected_section === "lower") {
        this.selectSection("upper");
      }
    };

    this.lower_section_tab = document.createElement("div");
    this.lower_section_tab.className = "tab";
    this.lower_section_tab.textContent = "Lower";
    this.lower_section_tab.onclick = () => {
      if (this._selected_section === "upper") {
        this.selectSection("lower");
      }
    };

    this.element = document.createElement("div");
    this.element.id = "score-sheet";
  }

  /**
   * @param {"upper" | "lower"} section
   */
  set selected_section(section) {
    this._selected_section = section;

    if (this._selected_section === "upper") {
      this.lower_section_tab.classList.remove("selected");
      this.lower_container.element.style.display = "none";
      this.upper_section_tab.classList.add("selected");
      this.upper_container.element.style.display = "block";
    } else {
      this.upper_section_tab.classList.remove("selected");
      this.upper_container.element.style.display = "none";
      this.lower_section_tab.classList.add("selected");
      this.lower_container.element.style.display = "block";
    }
  }

  selectSection(section) {
    this.selected_section = section;
  }

  mount(container) {
    container.append(this.element);

    this.upper_container.mount(this.element);
    this.lower_container.mount(this.element);

    this.lower_container.element.style.display = "none";

    this.total_row.mount(this.element);

    this.element.append(this.tab_container);
    this.tab_container.append(this.upper_section_tab);
    this.tab_container.append(this.lower_section_tab);
  }

  initialize() {
    this.total = 0;
    this.upper_container.initialize();
    this.lower_container.initialize();
    this.total_row.initialize();
  }
}
