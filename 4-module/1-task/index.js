function makeFriendsList(friends) {
  const ulList = document.createElement("ul");

  for (let friend of friends) {
    const liItem = document.createElement("li");

    liItem.innerHTML = friend.firstName + " " + friend.lastName;
    ulList.append(liItem);
  }

  document.body.append(ulList);
}
