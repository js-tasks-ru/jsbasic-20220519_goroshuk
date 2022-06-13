function toggleText() {
  const buttonSelector = document.querySelector(".toggle-text-button");
  const textSelector = document.querySelector("#text");

  buttonSelector.addEventListener(
    "click",
    () => (textSelector.hidden = !textSelector.hidden)
  );
}
