import { existsSync, promises as fs, writeFile } from 'fs'

class Cart {
    constructor(id, products) {
        this.id = id;
        this.products = products;
    }
}

export class CartManager {
    constructor(path = './default_cart.json') {
        this.path = path
        this.cart = []
        this.counter_id = 0
    }

    checkArchivo = () => {
        return fs.existsSync(this.path)
    }

    createFile = async () => {
        return fs.writeFile(this.path, [])
    }
    static incrementId() {
        if (this.counter_id) {
            this.counter_id++
        } else {
            this.counter_id = 1
        }
        return this.counter_id
    }

    addCart = async () => {
        this.checkArchivo()
        try {
            const read = await fs.readFile(this.path, 'utf-8')
            let content = JSON.parse(read)
            let newId
            content.length > 0 ? newId = content[content.length - 1].id + 1 : newId = 1;
            const newCart = new Cart(newId, [])
            content.push(newCart);
            await fs.writeFile(this.path, JSON.stringify(content))
            console.log(`Cart with id : ${newCart.id} created!`)
            return newId
        } catch {
            return ("There was an error")
        }
    }

    async getCartById(id) {
        const _id = parseInt(id)
        const content = await fs.readFile(this.path, 'utf-8')
        const carts = JSON.parse(content)
        const cart = carts.find(_cart => _cart.id === _id)

        if (cart) return cart

        throw new Error(`Cart with ${_id} not found`)
    }

   
    addProductToCart = async (idCart, idProduct, quantity) => {
        this.checkArchivo()
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))

        if (carts.some(cart => cart.id === parseInt(idCart))) {
            const cartIndex = carts.findIndex(cart => cart.id === parseInt(idCart))
            const objectCart = new Cart (idCart, content[cartIndex].products)
            const prodIndex = objectCart.products.finIndex(obj => obj.product === parseInt(idProduct))
            if (prodIndex === -1) {
                objectCart.products.push({product: idProduct, quantity: quantity})
                carts[cartIndex] = objectCart;
            } else {
                carts[cartIndex].products[prodIndex].quantity += quantity;
            }

            await fs.writeFile(this.path, JSON.stringify(carts), 'utf-8')
            return "The product was added"
        } else {
            return "The product could not be added"
        }
    }


    deleteCart = async (id) => {
        const carts = JSON.parse(await fs.writeFile(this.path, 'utf-8'))
        if (carts.some(cart => cart.id === parseInt(id))) {
            const cartFilter = carts.filter(cart => cart.id !== parseInt(id))
            await fs.writeFile(this.path, JSON.stringify(cartFilter))
            return "Cart eliminated"
        } else {
            return "Cart not found"
        }
    }

}

const myCart = new CartManager('../models/cart.txt')



