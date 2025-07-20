import Product from "../models/product.js";
import { makeNetworkCall } from "./api-client.js"

const productOperations = {
    products: [],
    async loadProducts(){
        const pizzas = await makeNetworkCall();
        const pizzaArr = pizzas.map(pizza => {
            const currentPizza = new Product(pizza.id, pizza.title, pizza.description, pizza.price, pizza.imageUrl);
            return currentPizza
        })
        this.products = pizzaArr;
        return pizzaArr;
    },
    search(pizzaId){
        const product =  this.products.find(product => (product.id == pizzaId));
        product.inCart = true;
        console.log(this.products);
    },
    cartProducts(){
        return this.products.filter(product => product.inCart);
    }
}

export default productOperations;