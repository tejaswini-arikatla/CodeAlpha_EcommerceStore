const address =
  localStorage.getItem(
    "deliveryAddress"
  );

document.getElementById(
  "delivery-address"
).innerText = address;

const orderItems =
  JSON.parse(
    localStorage.getItem("orderItems")
  ) || [];

const orderDiv =
  document.getElementById("order-items");

orderItems.forEach((item) => {

  orderDiv.innerHTML += `
    <p>
      ${item.name} - Qty: ${item.qty}
    </p>
  `;
});