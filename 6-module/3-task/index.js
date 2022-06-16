import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">
          ${this.slides
            .map(
              (item) => `
            <div class="carousel__slide" data-id="${item.id}">
              <img src="/assets/images/carousel/${
                item.image
              }" class="carousel__img" alt="slide">
              <div class="carousel__caption">
                <span class="carousel__price">€${item.price.toFixed(2)}</span>
                <div class="carousel__title">${item.name}</div>
                <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
              </div>
            </div>`
            )
            .join("")}

          </div>
        </div>`);
    this.switchCarouselSlides = this.#carouselSwitcher();
    this.elem.addEventListener("click", this.#onButtonClick);
    this.elem.addEventListener("product-add", (event) => console.log(event));
  }

  get #getSlideWidth() {
    return this.elem.querySelector(".carousel__slide").offsetWidth;
  }

  #onButtonClick = () => {
    let target = event.target;
    if (event.target.closest(".carousel__button")) {
      const newEvent = new CustomEvent("product-add", {
        detail: event.target.closest(".carousel__slide").dataset.id,
        bubbles: true,
      });
      // console.log(event.target.closest(".carousel__button"));
      target.dispatchEvent(newEvent);
    }
  };

  #carouselSwitcher() {
    const slideSelector = this.elem.querySelectorAll(".carousel__slide");
    const carouselInnerSelector = this.elem.querySelector(".carousel__inner");
    const RightArrowButtonSelector = this.elem.querySelector(
      ".carousel__arrow_right"
    );
    const LeftArrowButtonSelector = this.elem.querySelector(
      ".carousel__arrow_left"
    );

    LeftArrowButtonSelector.style.display = "none";

    let translateNumber = 0;
    let counter = 0;

    RightArrowButtonSelector.addEventListener("click", () => {
      ++counter;
      translateNumber -= this.#getSlideWidth;
      carouselInnerSelector.style.transform = `translateX(${translateNumber}px)`;
      LeftArrowButtonSelector.style.display = "flex";

      if (counter == slideSelector.length - 1) {
        RightArrowButtonSelector.style.display = "none";
      }
    });

    LeftArrowButtonSelector.addEventListener("click", () => {
      --counter;
      translateNumber += this.#getSlideWidth;
      carouselInnerSelector.style.transform = `translateX(${translateNumber}px)`;
      RightArrowButtonSelector.style.display = "flex";

      if (counter == 0) {
        LeftArrowButtonSelector.style.display = "none";
      }
    });
  }
}
