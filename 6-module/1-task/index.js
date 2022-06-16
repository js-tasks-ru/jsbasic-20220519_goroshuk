let rows = [
  {
    name: "Ilia",
    age: 25,
    salary: 1000,
    city: "Petrozavodsk",
  },
  {
    name: "Vasya",
    age: 14,
    salary: 1500,
    city: "Moscow",
  },
  {
    name: "Ivan",
    age: 22,
    salary: 100,
    city: "Bryansk",
  },
  {
    name: "Petya",
    age: 45,
    salary: 990,
    city: "Chita",
  },
];

export default class UserTable {
  #name = "name";
  #age = "age";
  #salary = "salary";
  #city = "city";

  elem = document.body
    .querySelector("table")
    .insertAdjacentHTML("afterBegin", this.#template());

  #template() {
    return `
    <table>
      <thead>
        <tr>
          <th>"Имя"</th><th>"Возраст"</th><th>"Зарплата"</th><th>"Город"</th>
        </tr>
      </thead>
    </table> `;
  }
  // constructor(rows) {
  // this.name = rows;
  // }
}

console.log(rows.length);
