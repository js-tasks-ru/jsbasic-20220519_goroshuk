function getMinMax(str) {
  let array = str.split(" ").filter((item) => isFinite(item));

  return (result = {
    min: Math.min(...array),
    max: Math.max(...array),
  });
}
