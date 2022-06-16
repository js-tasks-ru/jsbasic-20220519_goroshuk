export default class UserTable {
  #items = [];

  constructor(rows) {
    this.#items = rows;
    this.elem = this.#template();
    this.elem.addEventListener("click", this.#onButtonClick);
  }

  #onButtonClick = (event) => {
    if (event.target.tagName == "BUTTON") {
      event.target.closest("tr").remove();
    }
  };

  #template() {
    let parentTable = document.createElement("div");
    parentTable.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
        </tr>
      </thead>
        <tbody>
          ${this.#items
            .map(
              (item) =>
                `<tr><td>${item.name}</td><td>${item.age}</td><td>${item.salary}</td><td>${item.city}</td><td><button>X</button></td></tr>`
            )
            .join("")}
        </tbody>
    </table>`;
    return parentTable.firstElementChild;
  }
}
