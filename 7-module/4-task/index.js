import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  #stepsAmount = "";
  #value = "";

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
    this.#value = value;
    this.spanAdder = this.#spanAdder();
    this.elem
      .querySelector(".slider__steps > span")
      .classList.add("slider__step-active");
    this.eventListenersOuter = this.#eventListenersInner();
    this.defaultStoppers = this.#defaultDragStopper();
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

  get #sliderWidth() {
    return this.#sliderGetter.clientWidth;
  }

  get #sliderCoords() {
    return this.#sliderGetter.getBoundingClientRect();
  }

  #defaultDragStopper = () => {
    this.elem.querySelector(".slider__thumb").ondragstart = (event) => {
      event.preventDefault();
    };

    this.elem.querySelector(".slider__thumb").ondragstart = (event) =>
      event.preventDefault();

    this.elem.querySelector(".slider__thumb").onpointerdown = (event) =>
      event.preventDefault();

    this.elem.querySelector(".slider__thumb").onpointermove = (event) =>
      event.preventDefault();
  };

  #eventListenersInner() {
    this.elem.addEventListener("click", this.#spiceChangerOnClickFunction);

    this.elem
      .querySelector(".slider__thumb")
      .addEventListener("pointerdown", this.#thumbDragNDropFunction);
  }

  #pointerUpFunction = () => {
    const sliderWidth = this.#sliderWidth;
    const sliderCoords = this.#sliderCoords;
    const coordsX = event.x - sliderCoords.x;
    const scaleDivision = 100 / (this.#stepsAmount - 1);
    const calculatedIntegerNumber = Math.round(
      (coordsX / sliderWidth) * (this.#stepsAmount - 1)
    );

    if (
      calculatedIntegerNumber >= 0 &&
      calculatedIntegerNumber < this.#stepsAmount
    ) {
      this.#sliderProgressGetter.style.width =
        calculatedIntegerNumber * scaleDivision + "%";
      this.#sliderThumbGetter.style.left =
        calculatedIntegerNumber * scaleDivision + "%";
    }

    this.elem.classList.remove("slider_dragging");
    document.removeEventListener("pointermove", this.#onMoveFunction);

    const newEvent = new CustomEvent("slider-change", {
      detail: this.#value,
      bubbles: true,
    });

    this.#sliderGetter.dispatchEvent(newEvent);
  };

  #onMoveFunction = () => {
    const sliderWidth = this.#sliderWidth;
    const sliderCoords = this.#sliderCoords;
    this.elem.classList.add("slider_dragging");

    const coordsX = event.x - sliderCoords.x;
    const progressLineWidth = (coordsX / sliderWidth) * 100;

    this.#sliderThumbGetter.style.left = progressLineWidth + "%";
    this.#sliderProgressGetter.style.width = progressLineWidth + "%";

    this.#valueChangerFunction();
    this.#addActiveClassFunction();

    if (progressLineWidth < 0) {
      this.#sliderProgressGetter.style.width = 0;
      this.#sliderThumbGetter.style.left = 0;
    }

    if (progressLineWidth >= 100) {
      this.#sliderProgressGetter.style.width = "100%";
      this.#sliderThumbGetter.style.left = "100%";
    }
  };

  #thumbDragNDropFunction = () => {
    const sliderWidth = this.#sliderWidth;
    const sliderCoords = this.#sliderCoords;
    const coordsX = event.x - sliderCoords.x;

    document.addEventListener("pointermove", this.#onMoveFunction);

    document.addEventListener("pointerup", this.#pointerUpFunction, {
      once: true,
    });
  };

  #scaleChangerInnerFunction = () => {
    const sliderProgressSelector = this.#sliderProgressGetter;
    const sliderThumbSelector = this.#sliderThumbGetter;
    const sliderCoords = this.#sliderCoords;
    const sliderWidth = this.#sliderWidth;
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

    if (clickCoordsX > 0 && clickCoordsX <= sliderWidth) {
      this.#value = calculatedIntegerNumber;

      sliderValueSelector.innerHTML = `${calculatedIntegerNumber}`;
    }
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

    if (clickCoordsX > 0 && clickCoordsX <= sliderWidth) {
      stepActive.classList.remove("slider__step-active");

      allSpansSelector[calculatedIntegerNumber].classList.add(
        "slider__step-active"
      );
    }
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
