import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const PORT = 8081;
const manager = new ProductManager('./Productos.json');

app.use(express.urlencoded({ extended: true }));

app.get('/productos', async (req, res) => {
    const { limit } = req.query;

    const products = await manager.mostrarProductos();

    if (limit) {
        const limitProduct = products.slice(0, limit);
        return res.json(limitProduct);
    }

    res.json(products);
});

app.get('/', (req, res) => {
    res.send('Bienvenido reyyy!');
});

app.get('/producto', async (req, res) => {
    const { id } = req.query;

    if (id) {
        const producto = await manager.mostrarProductos();
        const productFilter = producto.find((prod) => prod.id === Number(id));

        if (productFilter) {
            return res.json(productFilter);
        } else {
            return res.json({ error: 'Product not found' });
        }
    }

    res.json({ error: 'El id del producto no existe' });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));