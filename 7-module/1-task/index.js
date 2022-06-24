import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = createElement(`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
      ${this.categories
        .map(
          (item) =>
            `<a href="#" class="ribbon__item" data-id=${item.id}>${item.name}</a>`
        )
        .join("")}
      </nav>

      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
  </div>`);
    this.eventListeners = this.#allEventListenersAreHere();
    this.allCategoriesAreShown =
      this.#ribbonInnerSelector.firstElementChild.classList.add(
        "ribbon__item_active"
      );
  }

  #allEventListenersAreHere() {
    this.elem.addEventListener("ribbon-select", (event) => console.log(event));

    this.#rightButtonSelector.addEventListener(
      "click",
      this.#rightButtonScrolling
    );

    this.#ribbonInnerSelector.addEventListener(
      "scroll",
      this.#scrollEventFunction
    );

    this.#leftButtonSelector.addEventListener(
      "click",
      this.#leftButtonScrolling
    );

    this.#ribbonInnerSelector.addEventListener(
      "click",
      this.#changeCategoryFunction
    );
  }

  get #scrollLeftAmount() {
    return this.#ribbonInnerSelector.scrollLeft;
  }

  get #rightButtonSelector() {
    return this.elem.querySelector(".ribbon__arrow_right");
  }

  get #leftButtonSelector() {
    return this.elem.querySelector(".ribbon__arrow_left");
  }

  get #ribbonInnerSelector() {
    return this.elem.querySelector(".ribbon__inner");
  }

  get #itemActiveSelector() {
    return this.elem.querySelector(".ribbon__item_active");
  }

  #changeCategoryFunction = () => {
    const target = event.target;
    const itemActive = this.#itemActiveSelector;

    if (target.tagName == "A") {
      event.preventDefault();

      itemActive.classList.remove("ribbon__item_active");
      target.classList.add("ribbon__item_active");

      const customEvent = new CustomEvent("ribbon-select", {
        detail: target.dataset.id,
        bubbles: true,
      });

      target.dispatchEvent(customEvent);
    }
  };

  #scrollEventFunction = () => {
    const innerClientWidth = this.#ribbonInnerSelector.clientWidth;
    const scrollLeftAmount = this.#scrollLeftAmount;
    const scrollWidthInner = this.#ribbonInnerSelector.scrollWidth;
    const scrollRightAmount =
      scrollWidthInner - scrollLeftAmount - innerClientWidth;

    this.#rightButtonSelector.classList.add("ribbon__arrow_visible");
    this.#leftButtonSelector.classList.add("ribbon__arrow_visible");

    if (scrollLeftAmount == 0) {
      this.#leftButtonSelector.classList.remove("ribbon__arrow_visible");
    }

    if (scrollRightAmount < 1) {
      this.#rightButtonSelector.classList.remove("ribbon__arrow_visible");
    }
  };

  #leftButtonScrolling = () => {
    this.#ribbonInnerSelector.scrollBy(-350, 0);
  };

  #rightButtonScrolling = () => {
    this.#ribbonInnerSelector.scrollBy(350, 0);
  };
}
