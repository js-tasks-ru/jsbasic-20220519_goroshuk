function factorial(n) {
  let x = 1;
  if (n === 0) return (x = 1);

  for (let i = 0; i < n; i++) {
    x *= n - i;
  }

  return x;
}
