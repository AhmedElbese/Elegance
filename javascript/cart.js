
const cartItemsContainer = document.getElementById('cart-items');
const itemCount = document.getElementById('item-count');
const productAmount = document.getElementById('product-amount');
const shippingCharge = document.getElementById('shipping-charge');
const totalAmount = document.getElementById('total-amount');
const discountInput = document.getElementById('discount-code');
const discountMsg = document.getElementById('discount-msg');

let products = [
  {
    id: 1,
    name: "Blue Zara Shirt",
    color: "Blue",
    size: "M",
    price: 45,
    quantity: 3,
    image: "../images/img/WhatsApp Image 2025-04-27 at 23.43.04_bab880cb.jpg" 
  },
  {
    id: 2,
    name: "Green Zara Shirt",
    color: "Green",
    size: "M",
    price: 30,
    quantity: 2,
    image: "../images/img/WhatsApp Image 2025-04-27 at 23.43.05_2bf7acd0.jpg" 
  }
];

const shippingCost = 50;
let discountApplied = false;

function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  let count = 0;

  products.forEach(product => {
    const div = document.createElement('div');
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="cart-item-details">
        <h5>${product.name}</h5>
        <p>SHIRT - ${product.color}</p>
        <p>COLOR: ${product.color}</p>
        <p>SIZE: ${product.size}</p>
        <div class="quantity-control">
          <button onclick="decreaseQuantity(${product.id})">-</button>
          <span>${product.quantity}</span>
          <button onclick="increaseQuantity(${product.id})">+</button>
        </div>
      </div>
      <div class="cart-item-actions">
        <p>$${product.price * product.quantity}</p>
        <button class="btn btn-link text-danger" onclick="removeItem(${product.id})">
          <i class="fas fa-trash"></i> Remove Item
        </button>
        <button class="btn btn-link text-primary">Move to Wish List</button>
      </div>
    `;

    cartItemsContainer.appendChild(div);
    total += product.price * product.quantity;
    count += product.quantity;
  });

  itemCount.textContent = count;
  productAmount.textContent = total.toFixed(2);

  let finalTotal = total + shippingCost;
  if (discountApplied) {
    finalTotal *= 0.9; // خصم 10%
  }
  totalAmount.textContent = finalTotal.toFixed(2);
}

function increaseQuantity(id) {
  const product = products.find(p => p.id === id);
  product.quantity++;
  renderCart();
}

function decreaseQuantity(id) {
  const product = products.find(p => p.id === id);
  if (product.quantity > 1) {
    product.quantity--;
    renderCart();
  }
}

function removeItem(id) {
  products = products.filter(p => p.id !== id);
  renderCart();
}

document.getElementById('apply-discount').addEventListener('click', () => {
  const code = discountInput.value.trim();
  if (code.toLowerCase() === "thapa") {
    discountApplied = true;
    discountMsg.textContent = "Hurray! code is Valid";
    renderCart();
  } else {
    discountMsg.textContent = "Invalid code.";
    discountMsg.classList.remove('text-success');
    discountMsg.classList.add('text-danger');
  }
});

document.getElementById('checkout-btn').addEventListener('click', () => {
  alert('Thank you for shopping with us!');
});

renderCart();
