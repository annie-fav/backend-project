import { promises as fs } from 'fs'


class ProductManager {
    constructor(path) {
        this.products = []
        this.lastId = 0
        this.path = path
    }

    async addProduct(product) {
        const _exists = this.products.find(element => element.code === product.code);

        if (_exists) {
            console.log(`The product ${product.code} already exists`)
            return
        }

        product.id = this.lastId
        this.products.push(product)
        this.lastId += 1


        try {
            const content = JSON.stringify(this.products);
            await fs.writeFile(this.path, content)
        } catch (err) {
            console.log(err)
        }
    }


    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            const res = JSON.parse(data)
            return res
        } catch (err) {
            console.log(err)
        }
    }


    async getProductById(id) {

        if (!id) {
            console.log('Not found id')
        }

        try {
            const data = await fs.readFile(this.path, 'utf-8');
            const productArray = JSON.parse(data)
            const select_product = productArray.find(element => element.id == id)
            return select_product
        } catch (err) {
            console.log(err)
        }
    }

   
    async updateProduct(id, newProduct) {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            const productArray = JSON.parse(data)

            const selected_index = productArray.findIndex(element => element.id == id)
            if (!selected_index) {
                return console.log("Error")
            }

            productArray[selected_index] = newProduct
            productArray[selected_index].id = id

            const content = JSON.stringify(productArray);
            await fs.writeFile(this.path, content)

            return newProduct
        } catch (err) {
            console.log(err)
        }
    }


    async deleteProduct(id) {
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            const productArray = JSON.parse(data)
            const selected_index = productArray.findIndex(element =>element.id == id)
            if (!selected_index) {
                return console.log("Error")
            }

            const updateProducts = productArray.splice(selected_index, 1)

            const content = JSON.stringify(updateProducts);
            await fs.writeFile(this.path, content);
            return id

        } catch (err) {
            console.log(err)
        }
    }
}


export class Product {
    constructor(title, description, price, thumbnail, code, stock, status, category) {

        if (!title ||
            !description ||
            !price ||
            !thumbnail ||
            !code ||
            !stock) {
            console.log('no tenemos todos los campos')
            return
        }

        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock;
        this.status = status;
        this.category = category;


    }
}

const myProductManager = new ProductManager('/Users/annie/Desktop/Project Backend/desafio4/src/models/products.txt')

const product1 = new Product("T-shirt Woman", "Excellent T-shirt", 5, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUz2udYJSW8es9xZztGlbA6tO9xjviF-tSmv9BxfET0Bf9b_nKAulzEWEBFomNJC-5u6k&usqp=CAU", 1, 10)
const product2 = new Product("Jeans", "Excellent Jeans", 15, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH83MdZlqlxbkvnL-QWVbw20MsVwDauYNHwnIJyEfcrnmtiTvJnLDT0eI3_Yz9HlI5M4A&usqp=CAU", 2, 10)
const product3 = new Product("T-shirt Man", "Excellent T-shirt", 24, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs1NA51PxaIl7JijtKRgS4dCerNIcrRlqxfrr0GmEl-VClfRRXE1x-LQGq8WvFEQh--Jg&usqp=CAU", 3, 10)
const product4 = new Product("Fit", "Excellent Fit", 14, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdyIY-GAFu9-2Bq8njs2JlNnqXH4eoEdJpQLoB_kqoWu6zaGCn3XZBZvZjw_iRBFa-Sc8&usqp=CAU", 4, 10)
const product5 = new Product("Dress Shoes Woman", "Dress Shoes Woman", 22, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiL3Q5LM-HYkD4_Gl5Hoi0RQn3yqLP1I7lH4LQhbXPoLtedadtSWpylRXTiKu79Sv_aFk&usqp=CAU", 5, 10)
const product6 = new Product("Dress Shoes Man", "Dress Shoes Man", 26, "https://i.insider.com/613fbae6261771001825ec35?width=700", 6, 10)
const product7 = new Product("Shoes Woman", "Excellent Shoes Woman", 17, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdiY_j8yPbRxyaJhdpJ0L8a5Gwpf6lCNnEOw&usqp=CAU", 7, 10)
const product8 = new Product("Shoes Man", "Excellent Shoes Man", 18, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR17Qseg_R1WxwToS9xhP8pGffwGTGNoSzLjA&usqp=CAU", 8, 10)
const product9 = new Product("Socks Woman", "Excellent Socks Woman", 5, "https://pyxis.nymag.com/v1/imgs/3db/6ca/5687b337910c415811616b09700e174c67-darnersocks.2x.rdeep-vertical.w245.jpg", 9, 10)
const product10 = new Product("Socks Man", "Socks Man", 5, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPmPN6bj6Nja8Fy91tSH3WDclJU9Nvq-nmLw&usqp=CAU", 10, 10)

await myProductManager.addProduct(product1);
await myProductManager.addProduct(product2);
await myProductManager.addProduct(product3);
await myProductManager.addProduct(product4);
await myProductManager.addProduct(product5);
await myProductManager.addProduct(product6);
await myProductManager.addProduct(product7);
await myProductManager.addProduct(product8);
await myProductManager.addProduct(product9);
await myProductManager.addProduct(product10);

export default ProductManager

const fullFile = await myProductManager.getProducts();
console.log(fullFile);

const productRes = await myProductManager.getProductById(4)
console.log('Product id 4 search result: ', productRes)

const updatedProduct = await myProductManager.updateProduct(6, new Product("Socks for Aliens", "Excellent Socks for Aliens and Monsters", 5, "https://pyxis.nymag.com/v1/imgs/3db/6ca/5687b337910c415811616b09700e174c67-darnersocks.2x.rdeep-vertical.w245.jpg", 9, 10))
console.log('Update product: ', updatedProduct)

const deleteProduct = await myProductManager.deleteProduct(9)
console.log('Delete product: ', deleteProduct);