import createElement from "../../assets/lib/create-element.js";

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  // get containerRightCoords() {
  //   return document.body.querySelector("header").getBoundingClientRect().right;
  // }

  update(cart) {
    if (!cart.isEmpty()) {
      // this.elem.classList.add("cart-icon_visible");
      document.body
        .querySelector(".cart-icon")
        .classList.add("cart-icon_visible");

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart
            .getTotalPrice()
            .toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      // this.elem.classList.add("shake");
      document.body.querySelector(".cart-icon").classList.add("shake");

      // this.elem.addEventListener
      document.body.querySelector(".cart-icon").addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        { once: true }
      );
    } else {
      // this.elem.classList.remove("cart-icon_visible");
      document.body
        .querySelector(".cart-icon")
        .classList.remove("cart-icon_visible");
    }
  }

  addEventListeners() {
    document.addEventListener("scroll", this.updatePosition);

    window.addEventListener("resize", this.updatePosition);
  }

  updatePosition = () => {
    const cartSelector = document.body.querySelector(".cart-icon");
    // console.log(
    //   getComputedStyle(document.body.querySelector(".cart-icon")).display
    // );

    if (this.elem.classList.contains("cart-icon_visible")) {
      console.log(document.body.querySelector(".cart-icon"));

      const containerSelectorCoords = document.body
        .querySelector(".container")
        .getBoundingClientRect().right;

      const windowWidth = document.documentElement.clientWidth;

      cartSelector.style.position = "absolute";

      cartSelector.style.left = "auto";

      cartSelector.style.zIndex = "";

      if (pageYOffset > cartSelector.offsetTop && windowWidth > 767) {
        const containerSelectorCoords = document.body
          .querySelector(".container")
          .getBoundingClientRect().right;

        if (
          containerSelectorCoords + 30 + cartSelector.offsetWidth >
          windowWidth
        ) {
          cartSelector.style.position = "fixed";

          cartSelector.style.left =
            windowWidth - cartSelector.offsetWidth - 10 + "px";

          cartSelector.style.zIndex = 99;
        } else {
          cartSelector.style.position = "fixed";

          cartSelector.style.left = containerSelectorCoords + 20 + "px";
        }
      }
    }
  };
}
