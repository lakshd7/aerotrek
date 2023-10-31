// Loading cart
cart = JSON.parse(localStorage.getItem('cart')) || [];

const clearCartBtn = document.querySelector('.clear-cart-btn');
clearCartBtn.addEventListener('click', clearCart);

// Rendering cart
function renderCart() {
  const cartEl = document.querySelector('.cart-container');
  cartEl.innerHTML = '';

  if (cart.length === 0) {
    document.querySelector('.cart-empty').style.opacity = '1';
    clearCartBtn.style.opacity = '0';
    clearCartBtn.style.pointerEvents = 'none';
    renderCheckout();
    return;
  }

  document.querySelector('.cart-wrapper').style.marginTop = '50px';

  clearCartBtn.style.opacity = '1';
  clearCartBtn.style.pointerEvents = 'all';

  cart.forEach((item, i) => {
    const itemImage = item.itemImage;
    const itemName = item.itemName;
    const itemCount = item.itemCount;
    const itemSize = item.itemSize;
    const itemTotal = item.itemPrice * itemCount;

    const html =
      `
        <div class="row" data-index="${i}">
          <i class="fa-regular fa-circle-xmark remove-item-btn"></i>
          <img src="${itemImage}">
          <div class="cart-item-name">${itemName}</div>
          <div class="cart-item-size">${itemSize}</div>
          <div class="cart-item-count">${itemCount}</div>
          <div class="cart-item-subtotal">$${itemTotal}</div>
        </div>
      `;

    cartEl.insertAdjacentHTML('beforeend', html);

  });
  renderCheckout();
  removeItemAddEvent();
}
renderCart();

// Clear cart
function clearCart() {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Remove item button
function removeItemAddEvent() {
  const removeItemBtns = document.querySelectorAll('.cart-container .row .remove-item-btn');
  removeItemBtns.forEach(btn => btn.addEventListener('click', removeItem));
}

function removeItem(e) {
  const index = e.target.closest('.row').dataset.index;
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Rendering checkout
function renderCheckout() {
  if (cart.length === 0) {
    document.querySelector('.checkout').style.opacity = '0';
    document.querySelector('.checkout').style.pointerEvents = 'none';
  };

  const subtotalEl = document.querySelector('.checkout .subtotal');
  const shippingEl = document.querySelector('.checkout .shipping');
  const taxEl = document.querySelector('.checkout .tax');
  const totalEl = document.querySelector('.checkout .total');

  let subtotal = 0, shipping = 0, tax = 0, total = 0;
  cart.forEach(item => {
    subtotal += item.itemPrice * item.itemCount;
  });

  shipping = subtotal >= 60 ? 0 : 10;
  tax = Math.round((0.13 * subtotal) * 10) / 10;
  total = subtotal + shipping + tax;

  subtotalEl.textContent = `$${subtotal}`;
  shippingEl.textContent = shipping === 0 ? 'Free' : `$${shipping}`;
  taxEl.textContent = `$${tax}`;
  totalEl.textContent = `$${total}`;
}
renderCheckout();