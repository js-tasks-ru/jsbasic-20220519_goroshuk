function hideSelf() {
  const buttonSelector = document.querySelector(".hide-self-button");

  buttonSelector.addEventListener(
    "click",
    (hideElement = () => {
      return (buttonSelector.hidden = true);
    }),
    {
      once: true,
    }
  );
}
