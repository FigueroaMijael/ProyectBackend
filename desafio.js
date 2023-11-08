const fs = require("fs")

class ProductManager {

    constructor(path) {
        this.path = path;
        this.id = 0;
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
        console.log(this.path)
        return this.path; 
    }

    async addProduct(product){

        const productos = this.products.find((prod) => prod.code === product.code);

    if (productos) {
      console.log("[ERROR] Team code already exist");
    } else {
      const newProduct = { ...product, id: this.products.length + 1 };
      this.products.push(newProduct);

        } 

        const respuesta = await this.saveFile(this.products);

        if(respuesta){
            console.log("Producto creado")
            
        } else{
            console.log("Hubo un error al crear el producto")
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

   async updateProduct(id,title,description,price,thumbnail,stock,code){
        const productEdit = this.products.find((edit) => edit.id === id);

    if (!productEdit) {
      return "El evento no existe";
    }

    const newProduct = {
      ...Productos,
      title : title ,
        description : description,
        price : price ,
        thumbnail : thumbnail ,
        stock : stock ,
        code : code,
        id: this.products[this.products.length - 1].id + 1,
    };

    this.saveFile(newProduct);
    }

    async deleteProduct(id) {

        const getId = this.products.findIndex((getId) => {
            return getId.id === id})

        if(getId) {
            this.products.splice(getId, 1)

         await this.saveFile()
        } else {
            console.log("no esta el id")
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

    await manejadorDeProductos.addProduct(new Productos('pc', 'pcx100', 200, 'imgurl', 9, 'AAB1'))
    await manejadorDeProductos.addProduct(new Productos('p5c', 'pcx1400', 20, 'imgur3l', 5, 'AAB3'))

    manejadorDeProductos.mostrarProductos()


    await manejadorDeProductos.addProduct(new Productos('pc', 'pcx100', 200, 'imgurl', 9, 'AAB14'))
    await manejadorDeProductos.addProduct(new Productos('p56c', 'pcx14050', 220, 'imgur53l', 6, 'AAB2'))

    manejadorDeProductos.mostrarProductos()
    
    await manejadorDeProductos.addProduct(new Productos('pc', 'pcx100', 200, 'imgurl', 9, 'AAB1544'))
    await manejadorDeProductos.addProduct(new Productos('p56c', 'pcx14050', 220, 'imgur53l', 6, 'AAB23'))
    
    await manejadorDeProductos.updateProduct( 6,'p56c4', 'pc3x14050', 2520, 'im3g4ur53l', 65, 'AA534B23' )

    manejadorDeProductos.mostrarProductos()

    await manejadorDeProductos.deleteProduct(3)
    await manejadorDeProductos.deleteProduct(2)

    manejadorDeProductos.mostrarProductos()
}

cargarProduct()