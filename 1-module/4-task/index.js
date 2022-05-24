function checkSpam(str) {
  let checkedString;

  for (let i = 0; i < str.length; i++) {
    checkedString += str[i].toLowerCase();
  }

  if (checkedString.includes("xxx") || checkedString.includes("1xbet")) {
    return true;
  } else return false;
}
