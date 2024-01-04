import { createMarkup } from "../template/templateCheckout";

// const container = document.querySelector(".js-list");
// const totalPrice = document.querySelector(".js-total-price");
// const clear = document.querySelector(".js-btn");

const selectors = {
    container: document.querySelector(".js-list"),
    totalPrice: document.querySelector(".js-total-price"),
    clear: document.querySelector(".js-btn")
}

const Product_LS_KEY = 'checkout';
const products = JSON.parse(localStorage.getItem(Product_LS_KEY)) || [];
let totalPrice;

if (products.length) {
    selectors.clear.hidden = false;
    totalPrice = products.reduce((acc, { quantity, price }) => acc +=  quantity * price, 0);
}


selectors.totalPrice.textContent = totalPrice ? `Total price: ${totalPrice}` : 'Your basket is empty';
selectors.container.insertAdjacentHTML("beforeend", createMarkup(products));
selectors.clear.addEventListener("click", handleClick);

function handleClick() {
    localStorage.removeItem(Product_LS_KEY);
    window.location.href = "../index.html"
}