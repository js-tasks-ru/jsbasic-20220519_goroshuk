import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  #stepsAmount = "";

  constructor({ steps, value = 0 }) {
    this.elem = createElement(`
    <div class="slider">

      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">2</span>
      </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 50%;"></div>

      <!--Шаги слайдера-->
      <div class="slider__steps">
      </div>
  </div>`);
    this.#stepsAmount = steps;
    this.spanAdder = this.#spanAdder();
    this.elem
      .querySelector(".slider__steps > span")
      .classList.add("slider__step-active");
    this.eventListenersOuter = this.#eventListenersInner();
  }

  get #sliderGetter() {
    return document.body.querySelector(".slider");
  }

  get #sliderProgressGetter() {
    return this.#sliderGetter.querySelector(".slider__progress");
  }

  get #sliderThumbGetter() {
    return this.#sliderGetter.querySelector(".slider__thumb");
  }

  get #sliderStepsGetter() {
    return this.#sliderGetter.querySelector(".slider__steps");
  }

  #eventListenersInner() {
    this.elem.addEventListener("click", this.#spiceChangerOnClickFunction);
  }

  #scaleChangerInnerFunction = () => {
    const sliderProgressSelector = this.#sliderProgressGetter;
    const sliderThumbSelector = this.#sliderThumbGetter;
    const sliderCoords = this.#sliderGetter.getBoundingClientRect();
    const sliderWidth = this.#sliderGetter.clientWidth;
    const clickCoordsX = event.x - sliderCoords.x;
    const calculatedIntegerNumber = Math.round(
      (clickCoordsX / sliderWidth) * (this.#stepsAmount - 1)
    );

    const scaleDivision = 100 / (this.#stepsAmount - 1);

    sliderThumbSelector.style.left = `${
      scaleDivision * calculatedIntegerNumber
    }%`;
    sliderProgressSelector.style.width = `${
      scaleDivision * calculatedIntegerNumber
    }%`;
  };

  #valueChangerFunction = () => {
    const sliderCoords = this.#sliderGetter.getBoundingClientRect();
    const sliderWidth = this.#sliderGetter.clientWidth;
    const clickCoordsX = event.x - sliderCoords.x;
    const calculatedIntegerNumber = Math.round(
      (clickCoordsX / sliderWidth) * (this.#stepsAmount - 1)
    );

    const sliderValueSelector =
      this.#sliderGetter.querySelector(".slider__value");

    sliderValueSelector.innerHTML = `${calculatedIntegerNumber}`;
  };

  #addActiveClassFunction = () => {
    const sliderCoords = this.#sliderGetter.getBoundingClientRect();
    const sliderWidth = this.#sliderGetter.clientWidth;
    const clickCoordsX = event.x - sliderCoords.x;
    const calculatedIntegerNumber = Math.round(
      (clickCoordsX / sliderWidth) * (this.#stepsAmount - 1)
    );

    const stepActive = this.#sliderStepsGetter.querySelector(
      ".slider__step-active"
    );

    const allSpansSelector = this.#sliderStepsGetter.querySelectorAll("span");

    stepActive.classList.remove("slider__step-active");

    allSpansSelector[calculatedIntegerNumber].classList.add(
      "slider__step-active"
    );
  };

  #customDispatchEventFunction = () => {
    const sliderCoords = this.#sliderGetter.getBoundingClientRect();
    const sliderWidth = this.#sliderGetter.clientWidth;
    const clickCoordsX = event.x - sliderCoords.x;
    const calculatedIntegerNumber = Math.round(
      (clickCoordsX / sliderWidth) * (this.#stepsAmount - 1)
    );

    const newEvent = new CustomEvent("slider-change", {
      detail: calculatedIntegerNumber,
      bubbles: true,
    });

    this.#sliderGetter.dispatchEvent(newEvent);
  };

  #spiceChangerOnClickFunction = () => {
    // individual function below
    this.#scaleChangerInnerFunction();
    // individual function below
    this.#valueChangerFunction();
    // individual function below
    this.#addActiveClassFunction();
    // individual function below
    this.#customDispatchEventFunction();
  };

  #spanAdder = () => {
    let slider = this.elem.querySelector(".slider__steps");

    for (let i = 0; i < this.#stepsAmount; i++) {
      slider.innerHTML += "<span></span>";
    }
  };
}
