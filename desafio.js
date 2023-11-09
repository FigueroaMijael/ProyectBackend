const fs = require("fs")

class ProductManager {

    constructor(path) {
        this.path = path;
        if(fs.existsSync(path)){
            try{
                const productos = fs.readFileSync(path, "utf-8");
                this.products = JSON.parse(productos)
            } catch ( error ) {
                this.products = []
            }
        }else {
            this.products = []
        }
    }

    async saveFile() {
        try {
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.products, null, "\t")
            );
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    mostrarProductos() {
        return this.path; 
    }

    async addProduct(product){
        let maxId = 0;
        for (const prod of this.products) {
            if (prod.id > maxId) {
                maxId = prod.id;
            }
        }
        product.id = maxId + 1;

        const productos = this.products.find((prod) => prod.code === product.code);

    if (productos) {
        return console.log("[ERROR] Team code already exist");
    }

    this.products.push(product);

        const respuesta = await this.saveFile();

        if (respuesta) {
            console.log("Producto creado");
        } else {
            console.log("Hubo un error al crear el producto");
        }

    }

    getProductById(id){
        const product = this.products.find(product => product.id === id);
        if(product) {
            return product;
        }else {
            console.log('produtc not found')
        }

        this.products.push(id)
    }


   async updateProduct(id,productData){
    const productIndex = this.products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
        console.log("El producto no existe");
        return;
    }

    // Actualiza el producto con los nuevos datos
    this.products[productIndex] = { ...this.products[productIndex], ...productData };

    const success = await this.saveFile();

    if (success) {
        console.log("El producto se ha actualizado con éxito");
    } else {
        console.log("Hubo un error al actualizar el producto");
    }
    };


    async deleteProduct(id) {

        const productIndex = this.products.findIndex((prod) => prod.id === id);

        if (productIndex === -1) {
            console.log("El producto no existe");
            return;
        }

        this.products.splice(productIndex, 1);

        const success = await this.saveFile();

        if (success) {
            console.log("Producto eliminado con éxito");
        } else {
            console.log("Hubo un error al eliminar el producto");
        }
    }
}

class Productos {
    constructor( title, description, price, thumbnail, stock, code) {
        this.title = title ,
        this.description = description,
        this.price = price ,
        this.thumbnail = thumbnail ,
        this.stock = stock ,
        this.code = code
    }
}

const cargarProduct = async () => {

    const manejadorDeProductos = new ProductManager("./Productos.json")

    await manejadorDeProductos.addProduct(new Productos('p3c', 'pcxht100', 2060, 'im356gurl', 95, 'AAB1'))
    await manejadorDeProductos.addProduct(new Productos('p556c', 'pcx731400', 260, 'imgu7356r3l', 55, 'AAB3'))

    manejadorDeProductos.mostrarProductos()


    await manejadorDeProductos.addProduct(new Productos('p7c', 'pcx105630', 2600, 'im65gurl', 96, 'AAB14'))
    await manejadorDeProductos.addProduct(new Productos('p566c', 'pc756x14050', 220, 'imgur53756l', 67, 'AAB2'))

    manejadorDeProductos.mostrarProductos()
    
    await manejadorDeProductos.addProduct(new Productos('p234c', 'pc6756x100', 2300, 'imgur56l', 79, 'AAB1544'))
    await manejadorDeProductos.addProduct(new Productos('p52456245626c', 'pcx140652465650', 2520, 'img56ur53l', 76, 'AAB23'))
    
    // Actualiza un producto existente por su ID
    await manejadorDeProductos.updateProduct(4, {
        title: 'Nuevo Título',
        description: 'Nueva Descripción',
        price: 300,
        thumbnail: 'nueva_imagen.jpg',
        stock: 50,
        code: 'NUEVOCODIGO'
    });

    manejadorDeProductos.mostrarProductos()

    await manejadorDeProductos.deleteProduct(3)
    await manejadorDeProductos.deleteProduct(2)

    manejadorDeProductos.mostrarProductos()
}

cargarProduct()