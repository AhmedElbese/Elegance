// قراءة بيانات المنتج من localStorage
const product = JSON.parse(localStorage.getItem("cartItem"));

// عنصر عرض المنتجات
const cartItemsContainer = document.getElementById("cart-items");

// العناصر المالية
const itemCount = document.getElementById("item-count");
const productAmount = document.getElementById("product-amount");
const totalAmount = document.getElementById("total-amount");
const shippingCharge = 50; // ثابت

if (product) {
  // عدد العناصر
  itemCount.textContent = product.quantity;

  // إجمالي السعر بدون شحن
  const subtotal = product.price * product.quantity;
  productAmount.textContent = subtotal.toFixed(2);

  // المجموع مع الشحن
  const total = subtotal + shippingCharge;
  totalAmount.textContent = total.toFixed(2);

  // عرض المنتج داخل الكارت
  cartItemsContainer.innerHTML = `
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${product.image}" class="img-fluid rounded-start" alt="${product.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Price: EGP ${product.price}</p>
            <p class="card-text">Quantity: ${product.quantity}</p>
            <p class="card-text"><strong>Total: EGP ${(product.price * product.quantity).toFixed(2)}</strong></p>
          </div>
        </div>
      </div>
    </div>
  `;
} else {
  cartItemsContainer.innerHTML = `<p>Your cart is empty.</p>`;
  itemCount.textContent = 0;
  productAmount.textContent = "0";
  totalAmount.textContent = "0";
}
