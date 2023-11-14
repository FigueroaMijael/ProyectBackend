import ProductManager from './ProductManager.js';
import express from 'express'
const app = express()
const PORT = 8081

const manager = new ProductManager('./Productos.json')

app.use(express.urlencoded({extended: true}))

app.get('/productos', async (req, res) => {

    const products = await manager.products;

    console.log(products)

    if(products) {
        res.json(products)
    }

    res.json({error : "Product not found"})
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))