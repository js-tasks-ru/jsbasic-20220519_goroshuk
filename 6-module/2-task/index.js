import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  #name = "";
  #price = "";
  #category = "";
  #image = "";
  #id = "";
  #parent = document.querySelector("#holder");

  constructor(product) {
    this.#name = product.name;
    this.#price = product.price.toFixed(2);
    this.#category = product.category;
    this.#image = product.image;
    this.#id = product.id;
    this.elem = this.#myCard();
    this.elem
      .querySelector(".card__button")
      .addEventListener("click", this.#onButtonClick);
  }

  #myCard() {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${
            this.#image
          }" class="card__image" alt="product">
          <span class="card__price">€${this.#price}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.#name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>`;
    return div.firstElementChild;
  }

  get #cardSelector() {
    return this.#parent.querySelector(".card");
  }

  get #button() {
    return this.cardSelector.querySelector(".card__button");
  }

  #onButtonClick = () => {
    // alert("click");

    const newEvent = new CustomEvent("product-add", {
      detail: this.#id,
      bubbles: true,
    });

    this.elem.dispatchEvent(newEvent);

    this.elem.addEventListener("product-add", (event) => console.log(event));
  };
}
