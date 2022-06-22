import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.elem = createElement(`<div class="modal">
    
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          Вот сюда нужно добавлять заголовок
        </h3>
      </div>

      <div class="modal__body">
        A сюда нужно добавлять содержимое тела модального окна
      </div>
    </div>

  </div>
`);
    this.eventListeners = this.#eventListenersInner();
  }

  setTitle(title) {
    const modalTitle = this.elem.querySelector(".modal__title");

    modalTitle.textContent = title;
  }

  setBody(node) {
    const modalBody = this.elem.querySelector(".modal__body");

    modalBody.innerHTML = "";

    modalBody.append(node);
  }

  open() {
    document.body.classList.add("is-modal-open");

    document.body.append(this.elem);
  }

  close() {
    this.elem.remove();

    document.body.classList.remove("is-modal-open");
  }

  #eventListenersInner() {
    this.elem.addEventListener("click", this.#onButtonClickFunction);

    document.addEventListener("keydown", this.#onEscapeFunction);
  }

  #onEscapeFunction = () => {
    if (event.code == "Escape") {
      document.body.classList.remove("is-modal-open");

      this.elem.remove();

      document.removeEventListener("keydown", this.#onEscapeFunction);
    }
  };

  #onButtonClickFunction = () => {
    const target = event.target;

    if (target.closest(".modal__close")) {
      target.closest(".modal").remove();

      document.body.classList.remove("is-modal-open");

      this.elem.removeEventListener("click", this.#onButtonClickFunction);
      document.removeEventListener("keydown", this.#onEscapeFunction);
    }
  };
}
