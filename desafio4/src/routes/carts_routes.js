import { Router } from "express";
import { CartManager } from "../controllers/CartManager.js";
import { ProductManager } from "../controllers/ProductManager.js"

const routerCart = Router()
const cartManager = new CartManager('src/models/cart.txt')
const prodManager = new ProductManager('src/models/products.txt')

routerCart.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(parseInt(req.params.cid))
    res.send(cart)
})

routerCart.post('/', async(req, res) => {
    const cart_ = await cartManager.addCart()
    res.send(cart_)
})

routerCart.post('/:cid/product/:pid', async (req, res) => {
    const quantity = 1;
    const productData = await prodManager.getProductById(parseInt(req.params.pid))
    if (productData) {
        const data = await cartManager.addProductToCart(parseInt(req.params.cid), parseInt(req.params.pid), quantity)
        data ? res.send(`Produc ${producData.id} add to the cart`) : res.send(`There was an error`)
    } else {
        res.send(`The product ${req.params.pid} was not found`)
    }
})

routerCart.delete('/:id', async(req, res) => {
    let message = await cartManager.deleteProduct(req.param.id)
    res.send(message)
})

export default routerCart
