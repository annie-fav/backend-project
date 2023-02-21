import { Router } from "express";
import { ProductManager } from "../controllers/ProductManager.js"

const routerProduct = Router()
const productManager = new ProductManager('src/models/products.txt')

routerProduct.get('/', async (req, res) => {
    const { limit } = req.query;
    console.log(limit)
    const products = await productManager.getproducts()
    console.log(products)
    res.send(JSON.stringify(products))
})

routerProduct.get('/:id', async (req, res) => {
    const product = await productManager.getProductById(req.params.id)
    console.log(product)
    res.send(JSON.stringify(product))
})

routerProduct.post('/', async (req, res) => {
    let message = await productManager.addProduct(req.body)
    res.send(message)
})

routerProduct.delete('/:id', async (req, res) => {
     let message = await productManager.deleteProduct(req.params.id)
     res.send(message)
})

routerProduct.put('/:id', async (req, res) => {
    let message = await productManager.updateProduct(req.params.id, req.body)
    res.send(message)
})

export default routerProduct

