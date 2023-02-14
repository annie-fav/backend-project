import express from 'express'
import routerProduct from './routes/products_routes'
import routerCart from './routes/carts_routes'
import { __dirname } from "./path.js"
import multer from "multer"


const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb (null, 'src/public/img')
    },
    filename: (req,file,cb) => {
        cb (null, `${file.originalname}`)
    }
})

const upload = multer ({storage: storage})

const app = express();
const PORT = 8080;

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extende: true}))

//Routes
app.use('/static', express.static(__dirname + '/public'))
app.use('/api/products', routerProduct)
app.use('/api/carts', routerCart)
app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.file)
    res.send('Uploaded image')
})

