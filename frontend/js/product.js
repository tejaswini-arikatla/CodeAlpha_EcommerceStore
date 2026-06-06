async function getProduct() {

  const productId =
    localStorage.getItem("productId");

  const response = await fetch(
    `http://127.0.0.1:5000/api/products/${productId}`
  );

  const product = await response.json();

  document.getElementById(
    "product-details"
  ).innerHTML = `
    <h2>${product.name}</h2>

    <p>${product.description}</p>

    <h3>₹${product.price}</h3>

    <p>Category: ${product.category}</p>

    <p>Stock: ${product.countInStock}</p>

    <button onclick="addToCart(
      '${product._id}',
      '${product.name}',
      '${product.price}'
    )">
      Add To Cart
    </button>
  `;
}

function addToCart(id, name, price) {

  const cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  cart.push({
    id,
    name,
    price,
    qty: 1
  });

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  alert("Product Added To Cart");

  window.location.href =
    "cart.html";
}

getProduct();