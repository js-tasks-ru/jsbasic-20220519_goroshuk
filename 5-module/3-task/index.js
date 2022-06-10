function initCarousel() {
  const slideSelector = document.querySelectorAll(".carousel__slide");
  const slideWidth = slideSelector[0].offsetWidth;
  const carouselInnerSelector = document.querySelector(".carousel__inner");
  const RightArrowButtonSelector = document.querySelector(
    ".carousel__arrow_right"
  );
  const LeftArrowButtonSelector = document.querySelector(
    ".carousel__arrow_left"
  );

  LeftArrowButtonSelector.style.display = "none";

  let translateNumber = 0;
  let counter = 0;

  RightArrowButtonSelector.addEventListener("click", () => {
    ++counter;
    translateNumber -= slideWidth;
    carouselInnerSelector.style.transform = `translateX(${translateNumber}px)`;
    LeftArrowButtonSelector.style.display = "flex";

    if (counter == slideSelector.length - 1) {
      RightArrowButtonSelector.style.display = "none";
    }
  });

  LeftArrowButtonSelector.addEventListener("click", () => {
    --counter;
    translateNumber += slideWidth;
    carouselInnerSelector.style.transform = `translateX(${translateNumber}px)`;
    RightArrowButtonSelector.style.display = "flex";

    if (counter == 0) {
      LeftArrowButtonSelector.style.display = "none";
    }
  });
}
