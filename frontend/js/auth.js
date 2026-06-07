alert("AUTH FILE LOADED");

const user = localStorage.getItem("user");

if (!user) {
  alert("Please login first");
  window.location.href = "login.html";
}