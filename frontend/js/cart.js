function loadCart() {

  const cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  const cartDiv =
    document.getElementById("cart-items");

  cartDiv.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {

    total += item.price * item.qty;

    cartDiv.innerHTML += `
      <div class="product-card">

        <h3>${item.name}</h3>

        <p>₹${item.price}</p>

        <p>Qty: ${item.qty}</p>

        <button onclick="removeItem(${index})">
          Remove
        </button>

      </div>
    `;
  });

  document.getElementById("total")
    .innerText = `Total: ₹${total}`;
}

function removeItem(index) {

  let cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  cart.splice(index, 1);

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  loadCart();
}

function placeOrder() {

  const cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  if (cart.length === 0) {
    alert("Cart is Empty");
    return;
  }

  const address =
    document.getElementById("address").value;

  if (!address) {
    alert("Please enter delivery address");
    return;
  }

  localStorage.setItem(
    "orderItems",
    JSON.stringify(cart)
  );

  localStorage.setItem(
    "deliveryAddress",
    address
  );

  alert("Order Placed Successfully");

  localStorage.removeItem("cart");

  window.location.href =
    "order.html";
}

loadCart();