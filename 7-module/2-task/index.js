import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  modal = null;

  constructor() {
    this.modal = createElement(`
    <div class="modal">
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
  
    </div>`);
    this.modal.addEventListener(
      "click",
      () => {
        const target = event.target;

        if (target.closest(".modal__close")) {
          document.body.classList.remove("is-modal-open");

          document.body.querySelector(".modal").remove();
        }
      },
      {
        once: true,
      }
    );
    this.getEventListeners = this.#includeEventListeners();
  }

  setBody(modalBody) {
    const body = this.modal.querySelector(".modal__body");
    // console.log(modalBody);
    body.innerHTML = "";

    return body.append(modalBody);
  }

  setTitle(title) {
    const modalTitle = this.modal.querySelector(".modal__title");
    modalTitle.innerHTML = "";

    return modalTitle.append(title);
  }

  open() {
    document.body.classList.add("is-modal-open");
    document.body.append(this.modal);
  }

  close() {
    document.body.classList.remove("is-modal-open");

    // document.body.querySelector(".modal").remove();
  }

  #includeEventListeners() {
    document.addEventListener(
      "keydown",
      () => {
        const code = event.code;

        if (code == "Escape") {
          document.body.classList.remove("is-modal-open");

          document.querySelector(".modal").remove();
        }
      },
      {
        once: true,
      }
    );
  }

  #closeModalByEscape() {
    const code = event.code;

    if (code == "Escape") {
      document.body.classList.remove("is-modal-open");

      document.querySelector(".modal").remove();
    }
  }

  #closeModalByButtonFunction() {
    const target = event.target;

    if (target.closest(".modal__close")) {
      document.body.classList.remove("is-modal-open");

      target.closest(".modal").remove();
    }
  }
}
