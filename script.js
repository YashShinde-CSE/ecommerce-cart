document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 25.99 },
    { id: 3, name: "Product 3", price: 22.99 },
    { id: 4, name: "Product 4", price: 28.99 },
  ];

  const cart = JSON.parse(localStorage.getItem("products")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");
  const cartTotal = document.getElementById("cart-total");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to cart</button>`;
    productList.append(productDiv);
  });
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      //this is imp, function will only work when we click only on button
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });
  function addToCart(product) {
    cart.push(product);
    saveTask();
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;
    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotal.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("product");
        cartDiv.innerHTML = `
        <span>${item.name}-$${item.price.toFixed(2)}</span>
        <button data-id="${item.id}">Remove</button>`;
        cartItems.appendChild(cartDiv);
        totalPriceDisplay.textContent = totalPrice;
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotal.classList.add("hidden");
      cartItems.innerHTML = "Your cart is empty.";
    }
  }
  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const proId = parseInt(e.target.getAttribute("data-id"));
      const removeProduct = cart.find((p) => p.id === proId);
      const removeProductIndex = cart.findIndex((p) => p.id === proId);

      if (removeProductIndex !== -1) {
        cart.splice(removeProductIndex, 1);
      }
      renderCart();
      saveTask();
    }
  });
  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout successfully");
    cartTotal.classList.add("hidden");

    renderCart();
    saveTask();
  });

  function saveTask() {
    localStorage.setItem("products", JSON.stringify(cart));
  }
  renderCart();
});
