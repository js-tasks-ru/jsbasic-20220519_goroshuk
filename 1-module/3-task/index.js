function ucFirst(str) {
  let newString;

  !str ? (newString = "") : (newString = str[0].toUpperCase());

  for (let i = 1; i < str.length; i++) {
    newString += str[i];
  }

  return newString;
}
