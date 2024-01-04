// import {logeer as log, foo, add} from "./helpers.js/helpers"
// // import { logeer, foo } from "./helpers.js/helpers";

// function logeer() {
//     console.log("Ich schaffe das!");
// }
// logeer();
// foo();
// log()

// console.log(add(1, 2));


// import * as esm from "./helpers.js/helpers"

// esm.logeer();
// esm.foo();

// console.log(esm.add(1, 2));



/**
  |============================
  | localStorage
  |============================
*/

// const LS_key = "Array of names";
// const names = ['Alice', 'Kate', 'Saske'];





// збереження в LS


// localStorage.setItem(LS_key, JSON.stringify(names));


// читання з LS

// const value = localStorage.getItem(LS_key);
// console.log(value);
// console.log(JSON.parse(value));



// видалення з LS

// localStorage.removeItem(LS_key);




// очищення в LS

// localStorage.setItem("Olld", "Panas");
// localStorage.setItem("asd", "Duma");

// localStorage.clear();



// чому варто завжди використовувати JSON.stringify

// const LS_key = "Array of names";
// const names = ['Alice', 'Kate', 'Saske'];

// localStorage.setItem(LS_key, names);
// const value = localStorage.getItem(LS_key);
// console.log(value);
// console.log(JSON.parse(value));


// LS не може зберігати функції в жодних його інтепретацій

// const LS_key = "my function";

// function add(a, b) {
//     return a + b;
// }

// localStorage.setItem(LS_key, add);
// console.log(localStorage.getItem(LS_key ));

// const calc = {
//     a: 2,
//     b: 5,
//     add() {
//         return a + b
//     }
// }

// localStorage.setItem(LS_key, JSON.stringify(calc));
// console.log(JSON.parse(localStorage.getItem(LS_key)));








// *************Практика*************** \\
// Для практичного завдання використаємо збірку Parcel та ES6 модулі
// Застосувати готові стилі з файлу style.css
// Потрібно створити інтернет-магазин в якому буде 2 сторінки.

// Сторінка Home має:
// 1 Містити картки товарів (їх можна знайти в файлі products.json)
// (приклад однієї картки https://prnt.sc/klV2uzLIcG8w)
// 2 На списку товарів реалізовано делегування подій на додавання
// товару в кошик
// 3 Для додавання товару в кошик використовуй LS
// 4 Під час додавання контролюй кількість доданих товарів,
// для цього створи в об'єкті доданого товару новий ключ quantity

// Сторінка Checkout має:
// 1 Список карток доданих товарів, кожна картка має містити
// кількість куплених товарів та загальна вартість за даний товар.
// (приклад однієї картки https://prnt.sc/ssZA4rzw1x9L)
// 2 Повідомлення про загальну вартість покупки, якщо кошик порожній,
// то повідомлення "Your basket is empty"
// 3 Кнопку для очищення кошика, після натискання на неї всі
// товари видаляються, а користувача перенаправляємо на сторінку Home


import { createMarkup } from "./template/template";
import instruments from "./product.json";

const container = document.querySelector(".js-list");
const Product_LS_KEY = 'checkout';

container.insertAdjacentHTML("beforeend", createMarkup(instruments));
container.addEventListener("click", handleAdd);

function handleAdd(event) {
    if (!event.target.classList.contains("js-btn")) {
        return;
    }
    
    const product = event.target.closest(".js-product");
    const productId = +product.dataset.id;
    const currentProduct = instruments.find(({ id }) => id === productId);
    const products = JSON.parse(localStorage.getItem(Product_LS_KEY)) ?? [];
    const index = products.findIndex(({ id }) => id === productId);

    if (index !== -1) {
        products[index].quantity += 1;
    } else {
        currentProduct.quantity = 1;
        products.push(currentProduct);
    }
    
    localStorage.setItem(Product_LS_KEY, JSON.stringify(products))

}