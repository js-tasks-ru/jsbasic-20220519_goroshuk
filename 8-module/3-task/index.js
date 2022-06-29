export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product == null || product == "") {
      return;
    }

    let arrWithNames = this.cartItems.map((item) => item.product.name);

    if (!arrWithNames.includes(product.name)) {
      this.cartItems.push({ product });

      this.cartItems[this.cartItems.length - 1].count = 1;
    } else {
      let productInCartNumber = arrWithNames.indexOf(product.name);

      this.cartItems[productInCartNumber].count++;
    }

    this.onProductUpdate();
  }

  updateProductCount(productId, amount) {
    let arrWithId = this.cartItems.map((item) => item.product.id);

    let itemNumberWithId = arrWithId.indexOf(productId);

    this.cartItems[itemNumberWithId].count += amount;

    if (this.cartItems[itemNumberWithId].count == 0) {
      this.cartItems = this.cartItems.filter((item) => item.count > 0);
    }

    this.onProductUpdate(productId);
  }

  isEmpty() {
    return this.cartItems.length == 0 ? true : false;
  }

  getTotalCount() {
    return this.cartItems.reduce(
      (startValue, item) => (startValue += item.count),
      0
    );
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (startValue, item) => (startValue += item.count * item.product.price),
      0
    );
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
