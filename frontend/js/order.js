const orders =
  JSON.parse(
    localStorage.getItem("orderItems")
  ) || [];

let html = "<h2>Your Order</h2>";

orders.forEach(item => {

  html += `
    <p>
      ${item.name}
      - ₹${item.price}
    </p>
  `;
});

document.getElementById(
  "order-items"
).innerHTML = html;