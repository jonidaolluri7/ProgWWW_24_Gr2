self.onmessage = function (event) {
    const products = event.data;
    // calculate total price
    const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
    // return it
    postMessage(totalPrice);
};
