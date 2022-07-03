import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
        <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
      </div>
    </div>`);
    this.#cardMaker();
  }

  updateFilter = (filter) => {
    const gridInnerSelector = this.elem.querySelector(".products-grid__inner");

    gridInnerSelector.innerHTML = "";

    // if (Object.keys(filter)[0] == "noNuts") {
    //   this.filters.noNuts = Object.values(filter)[0];
    // }

    if (Object.keys(filter).includes("noNuts")) {
      const position = Object.keys(filter).indexOf("noNuts");

      this.filters.noNuts = Object.values(filter)[position];
    }

    // if (Object.keys(filter)[0] == "vegeterianOnly") {
    //   this.filters.vegeterianOnly = Object.values(filter)[0];
    // }

    if (Object.keys(filter).includes("vegeterianOnly")) {
      const position = Object.keys(filter).indexOf("vegeterianOnly");

      this.filters.vegeterianOnly = Object.values(filter)[position];
    }

    // if (Object.keys(filter)[0] == "maxSpiciness") {
    //   this.filters.maxSpiciness = Object.values(filter)[0];
    // }

    if (Object.keys(filter).includes("maxSpiciness")) {
      const position = Object.keys(filter).indexOf("maxSpiciness");

      this.filters.maxSpiciness = Object.values(filter)[position];
    }

    // if (Object.keys(filter)[0] == "category") {
    //   this.filters.category = Object.values(filter)[0];
    // }

    if (Object.keys(filter).includes("category")) {
      const position = Object.keys(filter).indexOf("category");

      this.filters.category = Object.values(filter)[position];
    }

    for (let product of this.products) {
      if (this.filters.category) {
        if (product.category != this.filters.category) continue;
      }

      if (this.filters.noNuts) {
        if (product.nuts) continue;
      }

      if (this.filters.vegeterianOnly) {
        if (!product.vegeterian) continue;
      }

      if (this.filters.maxSpiciness || this.filters.maxSpiciness == 0) {
        if (this.filters.maxSpiciness < product.spiciness) continue;
      }

      this.card = new ProductCard(product);

      this.elem.querySelector(".products-grid__inner").append(this.card.elem);
    }
  };

  #cardMaker = () => {
    for (let product of this.products) {
      this.card = new ProductCard(product);

      this.elem.querySelector(".products-grid__inner").append(this.card.elem);
    }
  };
}
