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
         res.json(limitProduct);
    }

});

app.get('/', (req, res) => {
    res.send(
        '📎 📎 📎Bienvenido!📎 📎 📎  🔷 Ver listado de productos ➡️ <a href="http://localhost:8081/productos"> Productos </a>🔷  🔷Ver lista de 3 productos ➡️ <a href="http://localhost:8081/productos/?limit=3"> Ver </a>🔷   🔷Ver lista de 7 productos ➡️ <a href="http://localhost:8081/productos/?limit=7"> Ver </a>🔷   🔷Ver solo el productos con id 6 ➡️ <a href="http://localhost:8081/producto/?id=6"> Ver </a>🔷    🔷Ver solo el productos con id 1 ➡️ <a href="http://localhost:8081/producto/?id=1"> Ver </a>🔷');
});

app.get('/productos', async (req, res) => {
    const { id } = req.params;
    const producto = await manager.mostrarProductos();

    if (id) {
        const productFilter = producto.find((prod) => prod.id === Number(id));

        if (productFilter) {
             res.json(productFilter);
        } else {
            return res.json({ error: 'Product not found' });
        }
    }else {
        res.json({ error: 'El id del producto no existe' });
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));