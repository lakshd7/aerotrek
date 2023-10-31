// Rendering items
const itemsContainer = document.querySelector('.items-container');
function renderItems(arr) {
  let htmlArr = [];
  arr.forEach((item, i) => {
    const itemImage = item.itemImage;
    const itemName = item.itemName;
    const itemPrice = item.itemPrice;

    const html =
      `<div class="item-wrapper">
        <div class="item" data-index="${i}">
          <img src="${itemImage}">
          <h1 class="item-name">${itemName}</h1>
          <h2 class="price">$${itemPrice}</h2>
          <button class="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    `;

    htmlArr.push(html);
  });

  htmlArr.forEach(html => {
    itemsContainer?.insertAdjacentHTML('beforeend', html);
  });
};
renderItems(items);

// Rendering Item Page 
const itemContainer = document.querySelectorAll('.item');
itemContainer.forEach(el => el.addEventListener('click', renderItemPage));
const itemPageContainer = document.querySelector('.item-page-wrapper');
function renderItemPage(e) {
  const item = e.target.closest('.item');
  const index = item.dataset.index;
  const itemImage = items[index].itemImage;
  const itemName = items[index].itemName;
  const itemPrice = items[index].itemPrice;
  const itemDetails = items[index].itemDetails;

  itemPageContainer.innerHTML = '';

  const html =
    `
    <div class="item-page" data-index=${index}>
      <div class="close"><i class="fa-solid fa-xmark"></i></div>
      <img src="${itemImage}" style="${items[index].margin ? 'margin-inline:30px;' : ''}">
      <div class="content">
        <h1 class="item-name">${itemName}</h1>
        <h1 class="item-price">$${itemPrice}</h1>
        <select name="size" class="item-size">
          <option value="">Select Size</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
        <button class="add-to-cart-btn">Add to Cart</button>
        <div class="item-details">
          <h1>Product Details</h1>
          <p class="details">${itemDetails}</p>
        </div>
      </div>
    </div>
    `;

  itemPageContainer.insertAdjacentHTML('afterbegin', html);

  document.querySelector('.item-page .add-to-cart-btn').addEventListener('click', addToCart);

  overlay.style.opacity = '1';
  overlay.style.pointerEvents = 'all';
  itemPageContainer.style.opacity = '1';
  document.querySelector('.item-page').style.opacity = '1';
  document.querySelector('.item-page').style.pointerEvents = 'all';

  closeItemPageBtn = document.querySelector('.item-page .close');
  closeItemPageBtn.addEventListener('click', closeItemPage);
}

let closeItemPageBtn;;
const overlay = document.querySelector('.overlay');
overlay?.addEventListener('click', closeItemPage);
function closeItemPage() {
  overlay.style.opacity = '0';
  overlay.style.pointerEvents = 'none';
  itemPageContainer.style.opacity = '0';
  document.querySelector('.item-page').style.opacity = '0';
  document.querySelector('.item-page').style.pointerEvents = 'none';
  itemPageContainer.innerHTML = '';
}

// Adding to cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
Array.from(addToCartBtns).forEach(btn => {
  btn.addEventListener('click', addToCart);
});
function addToCart(e) {
  const target = e.target.closest('.item-page');
  if (!target) return;
  const index = target.dataset.index;
  const itemImage = items[index].itemImage;
  const itemName = items[index].itemName;
  const itemPrice = items[index].itemPrice;
  const itemSize = document.querySelector('.item-page .item-size').value;

  if (!itemSize) {
    clearTimeout(alertTimeout);
    alert('No size selected!');
    return;
  }

  const obj = {
    itemImage: itemImage,
    itemName: itemName,
    itemPrice: itemPrice,
    itemSize: itemSize,
    itemCount: 1,
  }

  const itemCount = cart.filter(item => item.itemName === obj.itemName && item.itemSize === obj.itemSize).length;

  if (itemCount > 0) {
    const index = cart.findIndex(item => item.itemName === obj.itemName && item.itemSize === obj.itemSize)
    cart[index].itemCount++;
  } else {
    cart.push(obj);
  }

  clearTimeout(alertTimeout);
  closeItemPage();
  alert('Added to cart!');
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log(cart);
}
let alertTimeout;
function alert(text) {
  const alertEl = document.querySelector('.alert .alert-container');
  alertEl.querySelector('.alert-text').textContent = text;
  alertEl.style.opacity = 1;
  alertTimeout = setTimeout(() => {
    alertEl.style.opacity = 0;
    alertEl.style.pointerEvents = 'none';
  }, 2000);
}