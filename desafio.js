/* class TicketManager {

    #precioBaseDeGanancia = 0.15

    constructor () {
        this.eventos = []
    }

    getEventos () {
        return this.eventos
    }

    agregarEvento(evento) {
        evento.precio += evento.precio * this.#precioBaseDeGanancia

        if(this.eventos.length === 0){
            evento.id = 1
        } else {
            evento.id = this.eventos[this.eventos.length - 1].id + 1 
        }

        this.eventos.push(evento)
    }

    agregarUsuario(idEvento, idUser) {
        const evento = this.eventos.find((evento) => evento.id === idEvento )

        if(!evento){
            return "No existe el evento"
        }

        if(evento.participantes.includes(idUser)){
            return "El usuario ya existe"
        } else {
            evento.participantes.push(idUser)
        }
    }

    PonerEventiEnGira(idEvento, nuevaLocalidad, nuevaFecha){
        const evento = this.eventos.find(evento => evento.id === idEvento)

        if(!evento) {
            return "El evento no existe"
        }

        const newEvento = {
            ...evento,
            lugar: nuevaLocalidad,
            fecha: nuevaFecha,
            id: this.eventos[this.eventos.length - 1].id + 1,
            participantes: []
        }

        this.eventos.push(newEvento)
    }
}
 
class Evento {
    constructor(nombre, lugar, precio, capacidad = 50, fecha = new Date().toLocaleDateString()) {
        this.nombre = nombre;
        this.lugar = lugar;
        this.precio = precio;
        this.capacidad = capacidad;
        this.fecha = fecha;
        this.participantes = [] 
    }
} */

/* const manejadorDeEventos = new TicketManager()

console.log('agregando Evento coder 1 para Argentina, precio: 200, para 60 participantes')
manejadorDeEventos.agregarEvento(new Evento('Evento coder 1', 'Argentina' , 200, 60))

console.log('agregando al Evento con id 1 la participacion del usuario con id 2')
manejadorDeEventos.agregarUsuario(1, 2,3)

console.log('creado una copia vacia del evento 1 pero en mexico y para el 2024')
manejadorDeEventos.PonerEventiEnGira(1 , 'Mexico', '30/11/2024')

console.log(manejadorDeEventos.getEventos())

 */

class ProductManager {

    constructor() {
         this.products = []
    }

    getProducts(){
        return this.products;
    }

    addProduct(product){

       
        

        if(this.products.length === 0){
            product.id = 1
            product.code = 'C' + 1
        } else {
            product.id = this.products[this.products.length - 1].id + 1
            product.code = 'C' + (this.products[this.products.length - 1].id + 1 )
        }

        this.products.push(product)
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
}

class Productos {
    constructor( title, description, price, thumbnail, stock) {
        this.title = title || 'campo obligatorio',
        this.description = description|| 'campo obligatorio',
        this.price = price || 'campo obligatorio',
        this.thumbnail = thumbnail || 'campo obligatorio',
        this.stock = stock || 'campo obligatorio'
    }
}

const manejadorDeEventos = new ProductManager()

console.log('Productos...')
manejadorDeEventos.addProduct(new Productos('pc', 'pcx100', 200, 'imgurl', 9))
manejadorDeEventos.addProduct(new Productos('p5c', 'pcx1400', 20, 'imgur3l', 5))
manejadorDeEventos.addProduct(new Productos('p56c', 'pcx14050', 220, 'imgur53l', 6))

console.log(manejadorDeEventos.getProducts())

console.log('producto seleccionado', manejadorDeEventos.getProductById(3))




