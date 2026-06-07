async function getProducts() {
  try {

    console.log("Fetching products...");

    const response = await fetch(
      "https://ecommerce-backend-wrtf.onrender.com/api/products"
    );

    console.log("Response received:", response);

    const products = await response.json();

    console.log("Products:", products);

    const productsDiv =
      document.getElementById("products");

    productsDiv.innerHTML = "";

    products.forEach((product) => {

      productsDiv.innerHTML += `
        <div class="product-card">

          <img
            src="${product.image}"
            alt="${product.name}"
            class="product-image"
          >

          <h3>${product.name}</h3>

          <p><strong>₹${product.price}</strong></p>

          <p>${product.category}</p>

          <p>${product.description}</p>

          <button onclick="viewProduct('${product._id}')">
            View Product
          </button>

        </div>
      `;

    });

  } catch (error) {

    console.error("Fetch Error:", error);

    document.getElementById("products").innerHTML =
      "ERROR: " + error.message;
  }
}

function viewProduct(id) {

  localStorage.setItem(
    "productId",
    id
  );

  window.location.href =
    "product.html";
}

getProducts();