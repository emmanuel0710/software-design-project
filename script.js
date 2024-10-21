// Add this at the beginning of the file
function checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      // User is logged in
      document.querySelectorAll('.btn').forEach(btn => {
        btn.href = "#"; // Change this to the appropriate product page URL
        btn.textContent = "View Product";
      });
    }
  }
  
  // Call this function when the page loads
  
  window.onload = checkLoginStatus;
let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}

let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () =>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}