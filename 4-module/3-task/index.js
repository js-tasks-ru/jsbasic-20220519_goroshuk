function highlight(table) {
  let statusSelector = document.body.querySelectorAll("tr");

  for (let i = 1; i < statusSelector.length; i++) {
    statusSelector[i].cells[2].innerHTML == "m"
      ? statusSelector[i].classList.add("male")
      : statusSelector[i].cells[2].innerHTML == "f"
      ? statusSelector[i].classList.add("female")
      : statusSelector[i].cells[2];
  }

  for (let i = 1; i < statusSelector.length; i++) {
    statusSelector[i].cells[1].innerHTML < 18
      ? (statusSelector[i].style.textDecoration = "line-through")
      : statusSelector[i].cells[1];
  }

  for (let i = 1; i < statusSelector.length; i++) {
    statusSelector[i].cells[3].dataset.available == "true"
      ? statusSelector[i].classList.add("available")
      : statusSelector[i].cells[3].dataset.available == "false"
      ? statusSelector[i].classList.add("unavailable")
      : (statusSelector[i].hidden = true);
  }
}
