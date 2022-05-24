function ucFirst(str) {
  let newString;

  Number(str) == 0 ? (newString = "") : (newString = str[0].toUpperCase());

  for (let i = 1; i < str.length; i++) {
    newString += str[i];
  }

  return newString;
}
