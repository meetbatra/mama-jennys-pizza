import productOperations from "../services/product-operations.js";

window.addEventListener('load', () => {
    loadPizzas();
    bindEvents();
});

async function loadPizzas(){
    const pizzas = await productOperations.loadProducts()
    console.log(pizzas);
    pizzas.forEach(pizza => {
        createPizzaCard(pizza);
    });
}

function bindEvents(){
    document.querySelector('#cartBtn').addEventListener('click', toggleCart);
}

function createPizzaCard(pizza){
    const output = document.querySelector('#output');
    const colDiv = document.createElement('div');
    colDiv.className = 'col mb-4'
    const card = document.createElement('div');
    card.className = 'card h-100 d-flex flex-column';
    colDiv.appendChild(card);
    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = pizza.url;
    const body = document.createElement('div');
    body.className = 'card-body d-flex flex-column';
    card.appendChild(img);
    card.appendChild(body);
    const title = document.createElement('h5');
    title.className = 'card-title';
    title.innerText = pizza.name;
    const text = document.createElement('p');
    text.className = 'card-text';
    text.innerText = pizza.desc;
    const price = document.createElement('p');
    price.innerText = `INR${pizza.price}`;
    price.className = 'card-text'
    const button = document.createElement('button');
    button.className = 'btn btn-primary float-end mt-auto';
    button.innerText = 'Add to cart';
    button.setAttribute('product-id', pizza.id);
    button.addEventListener('click', addToCart);
    body.appendChild(title);
    body.appendChild(text);
    body.appendChild(price)
    body.appendChild(button);
    output.appendChild(colDiv);
}

function addToCart(){
    productOperations.search(this.getAttribute('product-id'));
    printCart();
}

function toggleCart(){
    const cart = document.querySelector('.cart');
    cart.style.display = cart.style.display === 'none' || window.getComputedStyle(cart).display === 'none' ? 'flex' : 'none';
}

function printCart(){
    const cartProducts = productOperations.cartProducts();
    const cartPizzas = document.querySelector('.cart-pizzas');
    cartPizzas.innerHTML = '';
    let total = 0;
    cartProducts.forEach(product => {
        const pizza = document.createElement('div');
        pizza.className = 'pizza'
        const img = document.createElement('img');
        img.src = product.url;
        img.className = 'pizza-img'
        const pizzaInfo = document.createElement('div');
        pizzaInfo.className = 'pizza-info';
        const name = document.createElement('p');
        name.innerText = product.name;
        const price = document.createElement('p');
        price.innerText = `INR${product.price}`;

        pizzaInfo.appendChild(name);
        pizzaInfo.appendChild(price);
        pizza.appendChild(img);
        pizza.appendChild(pizzaInfo)
        cartPizzas.appendChild(pizza);
        total += product.price;
    })

    const totalTag = document.querySelector('.total');
    totalTag.innerText = total;
}