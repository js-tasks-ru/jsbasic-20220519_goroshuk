function getMinMax(str) {
  let array = str
    .split(" ")
    .filter((item) => isFinite(item))
    .sort((a, b) => a - b);

  return (result = {
    min: Number(array[0]),
    max: Number(array[array.length - 1]),
  });
}
