class Cart {
  constructor(taxRate) {
    this.taxRate = taxRate;
    this.subtotal = 0;
    this.paymentMethod = "";
    this.products = [];
  }
  
  get total() {
    return this.calcTotal();
  }

  calcTotal() {
    return accounting.formatMoney(this.subtotal * (1 + this.taxRate));
  }
  
  get numberOfProducts() {
    return this.countProducts();
  }

  countProducts() {
    return this.products.length;
  }

  removeProduct(index, quantity) {
    if(this.products[index]) {
      this.products[index].quantity = this.products[index].quantity - quantity;
      
      if(this.products[index].quantity > 0) {
        this.products[index].quantity = this.products[index].quantity;
      }
      else {
        this.products[index] = null;
      }
    }
  }

  addProduct(index) {
    if(this.products[index]) {
      this.products[index].quantity = this.products[index].quantity + 1;
      this.subtotal = this.subtotal + flowers[index].price;
    }
    else {
      this.products[index] = flowers[index];
      this.subtotal = this.subtotal + flowers[index].price;
    }
  }
}