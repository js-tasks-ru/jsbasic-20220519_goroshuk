function sumSalary(salaries) {
  let sum = 0;
  for (let key in salaries) {
    isFinite(salaries[key]) && typeof salaries[key] === "number"
      ? (sum += salaries[key])
      : 0;
  }
  return sum;
}
