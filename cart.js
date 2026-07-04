const currentProduct = {
  id: "xx99-mkii",
  name: "XX99 MK II",
  price: 2999,
  img: "/assets/XX99 MARK 2.png",
};

let cart = [];

const mainQtyNumber = document.querySelector(".qty-number");
const mainMinusBtn = document.querySelectorAll(".qty-btn")[0];
const mainPlusBtn = document.querySelectorAll(".qty-btn")[1];
const addToCartBtn = document.querySelector(".add-to-cart");
const cartIcon = document.querySelector(".cart-icon");
const cartModal = document.getElementById("cartModal");
const cartItemsList = document.getElementById("cartItemsList");
const cartTotalAmount = document.getElementById("cartTotalAmount");
const cartCountTitle = document.getElementById("cartCountTitle");
const clearCartBtn = document.getElementById("clear-cart-btn");

let currentCount = 1;

mainPlusBtn.addEventListener("click", () => {
  currentCount++;
  mainQtyNumber.textContent = currentCount;
});

mainMinusBtn.addEventListener("click", () => {
  if (currentCount > 1) {
    currentCount--;
    mainQtyNumber.textContent = currentCount;
  }
});

cartIcon.addEventListener("click", () => {
  cartModal.style.display = "flex";
  renderCart();
});

cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = "none";
  }
});

addToCartBtn.addEventListener("click", () => {
  const existingItem = cart.find((item) => item.id === currentProduct.id);

  if (existingItem) {
    existingItem.quantity += currentCount;
  } else {
    cart.push({ ...currentProduct, quantity: currentCount });
  }

  currentCount = 1;
  mainQtyNumber.textContent = currentCount;

  cartModal.style.display = "flex";
  renderCart();
});

function renderCart() {
  cartItemsList.innerHTML = "";
  let total = 0;
  let totalItems = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    totalItems += item.quantity;

    const itemHTML = `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-img">
                        <img src="${item.img}" alt="${item.name}">
                    </div>
                    <div class="cart-item-meta">
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">$ ${item.price.toLocaleString()}</span>
                    </div>
                </div>
                <div class="quantity-picker">
                    <button class="qty-btn" onclick="changeCartQty(${index}, -1)">-</button>
                    <span class="qty-number">${item.quantity}</span>
                    <button class="qty-btn" onclick="changeCartQty(${index}, 1)">+</button>
                </div>
            </div>
        `;
    cartItemsList.insertAdjacentHTML("beforeend", itemHTML);
  });

  cartTotalAmount.textContent = `$ ${total.toLocaleString()}`;
  cartCountTitle.textContent = totalItems;
}

window.changeCartQty = function (index, change) {
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
};

clearCartBtn.addEventListener("click", () => {
  cart = [];
  renderCart();
});
