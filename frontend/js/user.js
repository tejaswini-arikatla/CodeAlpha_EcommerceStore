const user = JSON.parse(
  localStorage.getItem("user")
);

if (user) {
  document.getElementById("username")
    .innerText = `Welcome, ${user.name}`;
}