const address =
  localStorage.getItem(
    "deliveryAddress"
  );

document.getElementById(
  "delivery-address"
).innerText = address;