function hideSelf() {
  const buttonSelector = document.querySelector(".hide-self-button");

  buttonSelector.addEventListener(
    "click",
    () => (buttonSelector.hidden = true),
    {
      once: true,
    }
  );
}
