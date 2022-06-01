function showSalary(users, age) {
  return users
    .filter((user) => user.age <= age)
    .map(function (user) {
      if (user.age <= age) {
        return user.name + ", " + user.balance;
      }
    })
    .join("\n");
}
