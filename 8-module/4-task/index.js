import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product == null || product == "") {
      return;
    }

    let arrWithNames = this.cartItems.map((item) => item.product.name);

    if (!arrWithNames.includes(product.name)) {
      this.cartItems.push({ product });

      this.cartItems[this.cartItems.length - 1].count = 1;
    } else {
      let productInCartNumber = arrWithNames.indexOf(product.name);

      this.cartItems[productInCartNumber].count++;
    }

    this.onProductUpdate();
  }

  updateProductCount(productId, amount) {
    let arrWithId = this.cartItems.map((item) => item.product.id);

    let itemNumberWithId = arrWithId.indexOf(productId);

    this.cartItems[itemNumberWithId].count += amount;

    if (this.cartItems[itemNumberWithId].count == 0) {
      this.cartItems = this.cartItems.filter((item) => item.count > 0);
    }

    this.onProductUpdate(productId);
  }

  isEmpty() {
    return this.cartItems.length == 0 ? true : false;
  }

  getTotalCount() {
    return this.cartItems.reduce(
      (startValue, item) => (startValue += item.count),
      0
    );
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (startValue, item) => (startValue += item.count * item.product.price),
      0
    );
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    const modal = new Modal();

    const node = createElement(`<div></div>`);

    const nodeMaker = () => {
      for (let item of this.cartItems) {
        node.append(this.renderProduct(item.product, item.count));
      }

      node.append(this.renderOrderForm());
    };

    const addProductInModal = (event) => {
      if (event.target.closest("button").className.includes("plus")) {
        const productId = event.target
          .closest("[data-product-id]")
          .getAttribute("data-product-id");

        this.updateProductCount(productId, 1);
      }

      if (event.target.closest("button").className.includes("minus")) {
        const productId = event.target
          .closest("[data-product-id]")
          .getAttribute("data-product-id");

        this.updateProductCount(productId, -1);
      }
    };

    nodeMaker();

    modal.setTitle("Your order");

    modal.setBody(node);

    modal.elem.addEventListener("click", addProductInModal);

    modal.elem
      .querySelector(".cart-form")
      .addEventListener("submit", this.onSubmit);

    modal.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    const modalSelector = document.body.querySelector(".modal");

    if (document.body.classList.contains("is-modal-open")) {
      const totalPrice = document.body.querySelector(
        ".cart-buttons__info-price"
      );
      totalPrice.innerHTML = "€" + this.getTotalPrice().toFixed(2);

      if (this.isEmpty()) {
        document.body.classList.remove("is-modal-open");

        document.querySelector(".modal").remove();

        return;
      }

      const arrWithId = this.cartItems.map((item) => item.product.id);

      if (arrWithId.includes(cartItem)) {
        const productWithCurrentIdNumber = arrWithId.indexOf(cartItem);
        const productTotalPrice = modalSelector.querySelector(
          `[data-product-id="${cartItem}"] .cart-product__price`
        );

        productTotalPrice.innerHTML =
          "€" +
          (
            this.cartItems[productWithCurrentIdNumber].product.price *
            this.cartItems[productWithCurrentIdNumber].count
          ).toFixed(2);

        const productTotalValue = modalSelector.querySelector(
          `[data-product-id="${cartItem}"] .cart-counter__count`
        );

        productTotalValue.innerHTML =
          this.cartItems[productWithCurrentIdNumber].count;
      }

      if (!arrWithId.includes(cartItem)) {
        const cartProductReadyToDelete = modalSelector
          .querySelector(`[data-product-id="${cartItem}"]`)
          .closest(".cart-product");

        cartProductReadyToDelete.remove();
      }
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    const form = document.querySelector(".cart-form");

    const formData = new FormData(form);

    const promise = fetch(`https://httpbin.org/post`, {
      body: formData,
      method: `POST`,
    });

    promise
      .then(() => {
        const modalTitle = document.querySelector(".modal__title");

        modalTitle.innerHTML = "Success!";

        this.cartItems = [];
        this.cartIcon.update(this);

        const node = createElement(`<div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
      `);

        const modalBody = document.body.querySelector(".modal__body");

        modalBody.innerHTML = "";

        modalBody.append(node);
      })
      .catch(
        () =>
          (document.body.querySelector(".modal__body").innerHTML =
            "Sorry, we have some problems. Try again later.")
      );
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
