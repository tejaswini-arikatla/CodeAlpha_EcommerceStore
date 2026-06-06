async function loginUser() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch(
    "http://localhost:5000/api/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    }
  );

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("user", JSON.stringify(data));

    alert("Login Successful");

    window.location.href = "index.html";
  } else {
    alert(data.message);
  }
}