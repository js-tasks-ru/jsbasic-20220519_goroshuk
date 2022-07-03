import createElement from "../../assets/lib/create-element.js";

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add("cart-icon_visible");

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart
            .getTotalPrice()
            .toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add("shake");
      this.elem.addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        { once: true }
      );
    } else {
      this.elem.classList.remove("cart-icon_visible");
    }
  }

  addEventListeners() {
    document.addEventListener("scroll", () => this.updatePosition());

    window.addEventListener("resize", () => this.updatePosition());
  }

  async updatePosition() {
    const cartSelector = this.elem;

    const containerSelectorCoords = await document
      .querySelector(".container")
      .getBoundingClientRect();

    if (this.elem.classList.contains("cart-icon_visible")) {
      const windowWidth = document.documentElement.clientWidth;

      cartSelector.style.position = "absolute";

      cartSelector.style.left = "auto";

      cartSelector.style.zIndex = "";

      if (pageYOffset > cartSelector.offsetTop && windowWidth > 767) {
        if (
          containerSelectorCoords.right + 30 + cartSelector.offsetWidth >
          windowWidth
        ) {
          cartSelector.style.position = "fixed";

          cartSelector.style.left =
            windowWidth - cartSelector.offsetWidth - 10 + "px";

          cartSelector.style.zIndex = 99;
        } else {
          cartSelector.style.position = "fixed";

          cartSelector.style.left = containerSelectorCoords.right + 20 + "px";
        }
      }
    }
  }
}
