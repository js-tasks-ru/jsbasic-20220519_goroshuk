import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {}

  async render() {
    this.carousel = new Carousel(slides);

    const carouselHolder = document.body.querySelector(
      "[data-carousel-holder]"
    );

    carouselHolder.append(this.carousel.elem);

    // вставка ribbonMenu

    this.ribbonMenu = new RibbonMenu(categories);

    const ribbonHolder = document.body.querySelector("[data-ribbon-holder]");

    ribbonHolder.append(this.ribbonMenu.elem);

    // вставка stepSlider

    this.stepSlider = new StepSlider({ steps: 5, value: 3 });

    const stepSliderHolder = document.body.querySelector(
      "[data-slider-holder]"
    );

    stepSliderHolder.append(this.stepSlider.elem);

    // вставка cartIcon

    this.cartIcon = new CartIcon();

    const cartIconHolder = document.body.querySelector(
      "[data-cart-icon-holder]"
    );

    cartIconHolder.append(this.cartIcon.elem);

    // вставка Cart

    this.cart = new Cart(this.cartIcon);

    // список товаров

    this.products = await fetch(`products.json`);

    this.productsArray = await this.products.json();

    this.productsGrid = new ProductsGrid(this.productsArray);

    const productsGridHolder = document.body.querySelector(
      "[data-products-grid-holder]"
    );

    productsGridHolder.innerHTML = "";

    productsGridHolder.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      noNuts: document.getElementById("nuts-checkbox").checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    });

    this.#eventListeners();
  }

  #eventListeners = () => {
    document.body.addEventListener("product-add", this.productAddFunction);

    this.stepSlider.elem.addEventListener("slider-change", this.spiceChanger);

    this.ribbonMenu.elem.addEventListener(
      "ribbon-select",
      this.categoryChanger
    );

    document.body
      .querySelector(".filters__inner")
      .addEventListener("change", this.nutsAndVegeterianChanger);
  };

  nutsAndVegeterianChanger = () => {
    if (event.target.matches("#nuts-checkbox")) {
      this.productsGrid.updateFilter({
        noNuts: !this.productsGrid.filters.noNuts,
      });
    }

    if (event.target.matches("#vegeterian-checkbox")) {
      this.productsGrid.updateFilter({
        vegeterianOnly: !this.productsGrid.filters.vegeterianOnly,
      });
    }
  };

  categoryChanger = () => {
    this.productsGrid.updateFilter({ category: event.detail });
  };

  spiceChanger = () => {
    this.productsGrid.updateFilter({ maxSpiciness: event.detail });
  };

  productAddFunction = () => {
    let chosenProduct;

    for (let product of this.productsArray) {
      if (Object.values(product).includes(event.detail)) {
        chosenProduct = product;
      }
    }

    this.cart.addProduct(chosenProduct);
  };
}
