// Filter Selection
// First, select all the buttons
const buttons = document.querySelectorAll("#filterButtons .btn");

// Function to remove the 'active' class from all buttons
function removeActiveClass() {
    buttons.forEach((btn) => {
        btn.classList.remove('active');
    });
}

// Function to handle the click event
function handleButtonClick(event) {
    // Remove 'active' class from all buttons
    removeActiveClass();

    // Add 'active' class to the clicked button
    event.target.classList.add('active');

    // Get the filter from the button's onclick attribute
    let filter = event.target.getAttribute('onclick');
    filter = filter.replace("filterSelection('", "").replace("')", "");

    // Select all products
    let products = document.querySelectorAll(".product");

    // Hide all products
    products.forEach((product) => {
        product.style.display = 'none';
    });

    // If filter is 'all', show all products
    if (filter === 'all') {
        products.forEach((product) => {
            product.style.display = 'block';
        });
    }
    // Otherwise, show only the products that have the class corresponding to the filter
    else {
        let filteredProducts = document.querySelectorAll(`.product.${filter}`);
        filteredProducts.forEach((product) => {
            product.style.display = 'block';
        });
    }
}

// Assign the click event to each button
buttons.forEach((btn) => {
    btn.addEventListener('click', handleButtonClick);
});


// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("filterButtons");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

(function () {
  const cartInfo = document.getElementById("cart-info");
  const cart = document.getElementById("cart");
  const closeCartBtn = document.querySelector(".btn-close-cart");

  cartInfo.addEventListener("click", function () {
    cart.classList.toggle("show-cart");
  });

  closeCartBtn.addEventListener("click", function () {
    cart.classList.remove("show-cart");
  });
})();

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var addToCartButtons = document.getElementsByClassName("ADD_TO_CART");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  alert("Thank you for your purchase");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
  updateItemsTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
  updateItemsTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
  updateItemsTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var product = button.parentElement.parentElement;
  var title = product.getElementsByClassName("product-title")[0].innerText;
  var price = product
    .getElementsByClassName("product__price")[0]
    .innerText.replace("€", "");
  var imageSrc = product.getElementsByClassName("product__image")[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
  updateItemsTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemTitles = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemTitles.length; i++) {
    if (cartItemTitles[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">€${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("€", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "€" + total.toFixed(2);
}

function updateItemsTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var quantity = quantityElement.value;
    total = total + parseInt(quantity);
  }
  document.getElementById("item-count").innerText = total;
}
