function truncate(str, maxlength) {
  if (str.length <= maxlength) {
    return str;
  }

  let shortString = str.substr(0, maxlength - 1) + "…";
  return shortString;
}
